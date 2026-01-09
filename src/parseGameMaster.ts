import {
    GameMaster,
    GameMasterByKey,
    GameMasterItemByKey,
    GameMasterKey,
    groupGameMaster,
} from './gameMasterType.js';

export function parseGameMaster(_gameMaster: GameMaster): Record<string, unknown> {
    const gameMasterByKey: GameMasterByKey = groupGameMaster(_gameMaster);

    const extractedData = partitionAndExtract(gameMasterByKey, rulesByKey);

    return {
        ...extractedData,
        notParsedData: {},
    };
}
export type RuleDefinition<K extends GameMasterKey> = {
    test: (item: GameMasterItemByKey<K>) => boolean;
    transform?: (item: GameMasterItemByKey<K>) => any;
};

export type ExtractionRules = {
    [K in GameMasterKey]?: {
        [resultKey: string]: RuleDefinition<K> | ((item: GameMasterItemByKey<K>) => boolean);
    };
};

function partitionAndExtract(
    source: GameMasterByKey,
    rules: ExtractionRules
): Record<string, any[]> {
    const result: Record<string, any[]> = {};

    for (const key in rules) {
        const currentKey = key as GameMasterKey;
        const items = source[currentKey];
        const keyRules = rules[currentKey];

        if (!items || !keyRules) continue;

        const remaining: GameMasterItemByKey<any>[] = [];

        for (const item of items) {
            let matched = false;

            for (const [resKey, rule] of Object.entries(keyRules)) {
                const predicate = typeof rule === 'function' ? rule : rule.test;
                const transform = typeof rule === 'object' ? rule.transform : undefined;

                if ((predicate as (i: any) => boolean)(item)) {
                    if (!result[resKey]) result[resKey] = [];

                    const dataToPush = transform ? transform(item) : item;

                    result[resKey].push(dataToPush);
                    matched = true;
                    break;
                }
            }

            if (!matched) {
                remaining.push(item);
            }
        }
        source[currentKey] = remaining;
    }

    return result;
}

export type ExtractionResult = Record<string, GameMasterItemByKey<any>[]>;

const rulesByKey: ExtractionRules = {
    moveSettings: {
        'raidMove/fastMove': {
            test: (move) => move.templateId.includes('FAST'),
            transform: (move) => ({
                id: move.templateId,
                movementId: move.data.movementId,
                pokemonType: move.data.pokemonType,
                power: move.data.power,
                durationMs: move.data.durationMs,
                energyDelta: move.data.energyDelta,
                vfxName: move.data.vfxName,
            }),
        },
        'raidMove/dynamaxMove': {
            test: (move) => 'obMoveSettingsNumber18' in move.data,
            transform: (move) => ({
                id: move.templateId,
                movementId: move.data.movementId,
                pokemonType: move.data.pokemonType,
                powerLevels: move.data.obMoveSettingsNumber18,
                vfxName: move.data.vfxName,
            }),
        },
        'raidMove/chargedMove': {
            test: (move) => true,
            transform: (move) => ({
                id: move.templateId,
                movementId: move.data.movementId,
                pokemonType: move.data.pokemonType,
                power: move.data.power,
                durationMs: move.data.durationMs,
                energyDelta: move.data.energyDelta,
                vfxName: move.data.vfxName,
            }),
        },
    },
    pokemonSettings: {
        pokemon: {
            test: (move) => move.templateId.split('_').last()! !== move.data.pokemonId,
            transform: (move) => ({
                id: move.templateId,
                pokemonId: move.data.pokemonId,
                type: move.data.type,
                type2: move.data.type2,
                stats: move.data.stats,
                quickMoves: move.data.quickMoves,
                cinematicMoves: move.data.cinematicMoves,
                evolutionIds: move.data.evolutionIds,
                familyId: move.data.familyId,
            }),
        },
    },
};
