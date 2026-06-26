import { getCpMultipliers } from '../services/cpMultiplier.service.js';
import { getPokemonSetting } from '../services/pokemonSetting.service.js';
import { FileGenerator } from '../type/fileGenerator.js';

const CP_CAP = { great: 1500, ultra: 2500 };

export default class PokemonSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'rank-1-pvp.json';
    }

    async getFileContent(): Promise<string> {
        const rawPokemon = await getPokemonSetting();
        const rawCpMultiplier = await getCpMultipliers();

        const finalPokemon = rawPokemon
            .map((form: any) => [form.base, ...form.different.map((d: any) => d.base)])
            .flat();

        const result: Record<number, { great: any; ultra: any }> = {};

        for (const pokemon of finalPokemon) {
            result[pokemon.slug] = {
                great: getRank1(pokemon, rawCpMultiplier, CP_CAP.great),
                ultra: getRank1(pokemon, rawCpMultiplier, CP_CAP.ultra),
            };
        }

        return JSON.stringify(result, null, 2);
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
        .sortDesc();
    for (const level of levels) {
        const cp = calcCP(baseAtk, baseDef, baseSta, ivAtk, ivDef, ivSta, cpms[level]);
        if (cp <= cap) return level;
    }
    return null;
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

function getRank1(
    pokemon: any,
    cpms: Record<string, number>,
    cap: number,
): { atk: number; def: number; sta: number; level: number } {
    const { baseAttack, baseDefense, baseStamina } = pokemon.stats;
    let best = { atk: 0, def: 0, sta: 0, statProduct: -1, level: -1 };

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
                if (!level) continue;

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

                if (statProduct > best.statProduct) {
                    best = { atk: ivAtk, def: ivDef, sta: ivSta, statProduct, level: +level };
                }
            }
        }
    }

    return { atk: best.atk, def: best.def, sta: best.sta, level: +best.level };
}
