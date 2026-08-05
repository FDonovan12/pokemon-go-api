import fs from 'fs';
import path from 'path';
import { getCpMultipliers } from '../services/cpMultiplier.service.js';
import { getPokemonSetting } from '../services/pokemonSetting.service.js';
import { FileGenerator, GeneratorSpeed } from '../type/fileGenerator.js';

const CP_CAP = { super: 1500, hyper: 2500 };

type RankEntry = {
    attack: number;
    defense: number;
    stamina: number;
    level: number;
    statProduct: number;
};

export default class PokemonSettingGenerator extends FileGenerator {
    getFileName(): string {
        // plus vraiment utilisé directement, mais requis par la classe abstraite
        return 'rank-pvp';
    }

    async getFileContent(): Promise<any> {
        // non utilisé : on override generate() ci-dessous
        return '';
    }
    getSpeed(): GeneratorSpeed {
        return GeneratorSpeed.VERY_SLOW;
    }

    async generate(): Promise<string> {
        const start = performance.now();
        const rawPokemon = await getPokemonSetting();
        const rawCpMultiplier = await getCpMultipliers();

        const finalPokemon = rawPokemon
            .map((form: any) => [form.base, ...form.different.map((d: any) => d.base)])
            .flat();

        const dir = 'generated/data/rank-pvp';
        fs.mkdirSync(path.dirname(dir + '/x'), { recursive: true });

        let sample = '{}';
        for (const pokemon of finalPokemon) {
            const content = {
                super: getAllRanks(pokemon, rawCpMultiplier, CP_CAP.super),
                hyper: getAllRanks(pokemon, rawCpMultiplier, CP_CAP.hyper),
            };
            const stringified = JSON.stringify(content, null, 2);

            const filePath = path.join(dir, `${pokemon.slug}.json`);
            fs.writeFileSync(filePath, stringified);
            console.log(`Fichier généré : ${filePath}`);

            if (!sample) sample = stringified;
        }

        const elapsedMs = Math.round(performance.now() - start);
        console.log(`Fichiers générés : ${finalPokemon.length} dans ${dir} (${elapsedMs}ms)`);
        return sample;
    }
}

function calcCP(
    baseAtk: number,
    baseDef: number,
    baseSta: number,
    ivAtk: number,
    ivDef: number,
    ivSta: number,
    cpm: number,
): number {
    return Math.floor(
        ((baseAtk + ivAtk) * Math.sqrt(baseDef + ivDef) * Math.sqrt(baseSta + ivSta) * cpm ** 2) /
            10,
    );
}

function getMaxLevel(
    baseAtk: number,
    baseDef: number,
    baseSta: number,
    ivAtk: number,
    ivDef: number,
    ivSta: number,
    cpms: Record<string, number>,
    cap: number,
): number | null {
    const levels = Object.keys(cpms)
        .map(Number)
        .filter((level) => level <= 50)
        .sortAsc(); // ordre croissant, requis pour la dichotomie

    let low = 0;
    let high = levels.length - 1;
    let result: number | null = null;

    while (low <= high) {
        const mid = (low + high) >> 1;
        const level = levels[mid];
        const cp = calcCP(baseAtk, baseDef, baseSta, ivAtk, ivDef, ivSta, cpms[level]);

        if (cp <= cap) {
            result = level; // ce niveau marche, on tente plus haut
            low = mid + 1;
        } else {
            high = mid - 1; // trop de CP, on redescend
        }
    }

    return result;
}

function calcStatProduct(
    baseAtk: number,
    baseDef: number,
    baseSta: number,
    ivAtk: number,
    ivDef: number,
    ivSta: number,
    cpm: number,
): number {
    const atk = (baseAtk + ivAtk) * cpm;
    const def = (baseDef + ivDef) * cpm;
    const hp = Math.floor((baseSta + ivSta) * cpm); // floor obligatoire
    return atk * def * hp;
}

function getAllRanks(pokemon: any, cpms: Record<string, number>, cap: number): RankEntry[] {
    const { baseAttack, baseDefense, baseStamina } = pokemon.stats;
    const entries: Omit<RankEntry, 'rank'>[] = [];

    for (let ivAtk = 0; ivAtk <= 15; ivAtk++) {
        for (let ivDef = 0; ivDef <= 15; ivDef++) {
            for (let ivSta = 0; ivSta <= 15; ivSta++) {
                const level = getMaxLevel(
                    baseAttack,
                    baseDefense,
                    baseStamina,
                    ivAtk,
                    ivDef,
                    ivSta,
                    cpms,
                    cap,
                );
                if (level === null) continue;

                const cpm = cpms[level];
                const statProduct = calcStatProduct(
                    baseAttack,
                    baseDefense,
                    baseStamina,
                    ivAtk,
                    ivDef,
                    ivSta,
                    cpm,
                );
                const cp = calcCP(baseAttack, baseDefense, baseStamina, ivAtk, ivDef, ivSta, cpm);

                entries.push({ attack: ivAtk, defense: ivDef, stamina: ivSta, level, statProduct });
            }
        }
    }

    entries.sort((a, b) => b.statProduct - a.statProduct);

    const best = entries[0]?.statProduct ?? 0;

    return entries.map((entry) => ({
        ...entry,
        statProduct: best > 0 ? Math.round((entry.statProduct / best) * 10000) / 100 : 0,
    }));
}
