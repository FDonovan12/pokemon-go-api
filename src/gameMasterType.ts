import { SpecializedDataTypeMap } from './entity.js';
import { GAME_MASTER_KEYS } from './gameMasterKeys.js';

export interface GameMasterItem {
    templateId: string;
    data: {
        templateId: string;
        [key: string]: unknown;
    };
}

export type GameMaster = GameMasterItem[];

export type GameMasterKey = (typeof GAME_MASTER_KEYS)[number];

export type DataTypeByKey = {
    [K in GameMasterKey]: K extends keyof SpecializedDataTypeMap
        ? SpecializedDataTypeMap[K]
        : Record<string, unknown>;
};

export type GameMasterItemByKey<K extends GameMasterKey = GameMasterKey> = {
    templateId: string;
    data: DataTypeByKey[K];
};

export type GameMasterByKey = {
    [K in GameMasterKey]?: GameMasterItemByKey<K>[];
};

export function groupGameMaster(gameMaster: GameMaster): GameMasterByKey {
    const result: GameMasterByKey = {};

    for (const item of gameMaster) {
        const key = Object.keys(item.data).find((k) => k !== 'templateId') as
            | GameMasterKey
            | undefined;

        if (!key) continue;

        if (!result[key]) {
            result[key] = [];
        }

        const newItem = {
            templateId: item.templateId,
            data: item.data[key],
        };

        (result[key] as GameMasterItemByKey[]).push(newItem as GameMasterItemByKey);
    }

    return result;
}

export enum PokemonType {
    PokemonTypeBug = 'POKEMON_TYPE_BUG',
    PokemonTypeDark = 'POKEMON_TYPE_DARK',
    PokemonTypeDragon = 'POKEMON_TYPE_DRAGON',
    PokemonTypeElectric = 'POKEMON_TYPE_ELECTRIC',
    PokemonTypeFairy = 'POKEMON_TYPE_FAIRY',
    PokemonTypeFighting = 'POKEMON_TYPE_FIGHTING',
    PokemonTypeFire = 'POKEMON_TYPE_FIRE',
    PokemonTypeFlying = 'POKEMON_TYPE_FLYING',
    PokemonTypeGhost = 'POKEMON_TYPE_GHOST',
    PokemonTypeGrass = 'POKEMON_TYPE_GRASS',
    PokemonTypeGround = 'POKEMON_TYPE_GROUND',
    PokemonTypeIce = 'POKEMON_TYPE_ICE',
    PokemonTypeNormal = 'POKEMON_TYPE_NORMAL',
    PokemonTypePoison = 'POKEMON_TYPE_POISON',
    PokemonTypePsychic = 'POKEMON_TYPE_PSYCHIC',
    PokemonTypeRock = 'POKEMON_TYPE_ROCK',
    PokemonTypeSteel = 'POKEMON_TYPE_STEEL',
    PokemonTypeWater = 'POKEMON_TYPE_WATER',
}
