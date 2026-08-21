import { Base, PokemonSetting } from '#generated/data/api/intermediate.type.js';
import { IntermediateData } from '#generated/intermediate.index.js';
import { getCpMultipliers } from '../services/cpMultiplier.service.js';
import { FileGenerator, GeneratorSpeed } from '../type/fileGenerator.js';

const CP_CAP = { super: 1500, hyper: 2500 };

export default class PokemonSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'rank-1-pvp.json';
    }

    getSpeed(): GeneratorSpeed {
        return GeneratorSpeed.MEDIUM;
    }

    async getFileContent(): Promise<any> {
        const rawPokemon: PokemonSetting[] = await IntermediateData.getPokemonSetting();
        const rawCpMultiplier = await getCpMultipliers();

        const finalPokemon: Base[] = rawPokemon
            .map((form: PokemonSetting) => [form.base, ...form.different.map((d: any) => d.base)])
            .flat();

        const result: Record<string, { super: any; hyper: any }> = {};

        for (const pokemon of finalPokemon) {
            console.log('rank 1 : ', pokemon.dexNumber, pokemon.slug);
            result[pokemon.slug] = {
                super: getRank1(pokemon, rawCpMultiplier, CP_CAP.super),
                hyper: getRank1(pokemon, rawCpMultiplier, CP_CAP.hyper),
            };
        }

        return result;
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
type BestIvEntry = {
    attack: number;
    defense: number;
    stamina: number;
    level: number;
};

function getRank1(pokemon: Base, cpms: Record<string, number>, cap: number): BestIvEntry[] {
    const { baseAttack, baseDefense, baseStamina } = pokemon.stats;

    let bestStatProduct = -1;
    let bestEntries: BestIvEntry[] = [];

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
                const newStat = {
                    attack: ivAtk,
                    defense: ivDef,
                    stamina: ivSta,
                    level: +level,
                };
                if (statProduct > bestStatProduct) {
                    bestStatProduct = statProduct;
                    bestEntries = [newStat];
                } else if (statProduct === bestStatProduct) {
                    bestEntries.push(newStat);
                }
            }
        }
    }

    return bestEntries;
}
