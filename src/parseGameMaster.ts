import {
    GameMaster,
    GameMasterByKey,
    GameMasterItemByKey,
    GameMasterKey,
    groupGameMaster,
} from './gameMasterType.js';
import { saveRawAndGenerateTypes } from './saveRawData.js';

export function parseGameMaster(_gameMaster: GameMaster): Record<string, unknown> {
    const gameMasterByKey: GameMasterByKey = groupGameMaster(_gameMaster);
    saveRawAndGenerateTypes(gameMasterByKey, 'data/raw/');
    const extractedData = partitionAndExtract(gameMasterByKey, rulesByKey);

    return {
        ...extractedData,
        notParsedData: {},
    };
}
export type RuleDefinition<K extends GameMasterKey> = {
    test: (item: GameMasterItemByKey<K>) => boolean;
    transform?: (item: GameMasterItemByKey<K>) => any;
    output?: {
        format: 'map' | 'list';
        keyBy?: string;
    };
};

export type ExtractionRules = {
    [K in GameMasterKey]?: {
        [resultKey: string]: RuleDefinition<K>;
    };
};

function partitionAndExtract(
    source: GameMasterByKey,
    rules: ExtractionRules
): Record<string, any[]> {
    const result: Record<string, any> = {};

    for (const key in rules) {
        const currentKey = key as GameMasterKey;
        const items = source[currentKey];
        const keyRules = rules[currentKey];

        if (!items || !keyRules) continue;

        const remaining: GameMasterItemByKey<any>[] = [];

        for (const item of items) {
            let matchedAtLeastOnce = false;
            const entries = Object.entries(keyRules) as [
                string,
                RuleDefinition<typeof currentKey>
            ][];

            for (const [resKey, rule] of entries) {
                const predicate = rule.test;

                if ((predicate as (i: any) => boolean)(item)) {
                    matchedAtLeastOnce = true;

                    const transform = rule.transform;
                    const configOutput = rule.output ?? { format: 'list' };

                    const dataToPush = transform ? transform(item) : item;

                    if (configOutput.format === 'map' && configOutput.keyBy) {
                        if (!result[resKey]) result[resKey] = {};

                        const id = dataToPush[configOutput.keyBy];
                        if (id !== undefined) {
                            result[resKey][id] = dataToPush;
                        }
                    } else {
                        if (!result[resKey]) result[resKey] = [];
                        result[resKey].push(dataToPush);
                    }

                    matchedAtLeastOnce = true;
                    break; // Remove when one objet can be use in multiple files
                }
            }

            if (!matchedAtLeastOnce) {
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
                quickMoves: move.data.quickMoves ?? [],
                cinematicMoves: move.data.cinematicMoves,
                eliteQuickMove: move.data.eliteQuickMove,
                eliteCinematicMove: move.data.eliteCinematicMove,
                evolutionIds: move.data.evolutionIds,
                familyId: move.data.familyId,
                pokemonClass: move.data.pokemonClass,
                nonTmCinematicMoves: move.data.nonTmCinematicMoves,
                encounter: {
                    stardustCaptureReward:
                        (move.data.encounter.bonusStardustCaptureReward ?? 0) + 100,
                },
            }),
        },
    },
};
