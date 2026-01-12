import { groupGameMaster, } from './gameMasterType.js';
import { saveRawAndGenerateTypes } from './saveRawData.js';
export function parseGameMaster(_gameMaster) {
    const gameMasterByKey = groupGameMaster(_gameMaster);
    saveRawAndGenerateTypes(gameMasterByKey, 'data/raw/');
    const extractedData = partitionAndExtract(gameMasterByKey, rulesByKey);
    return {
        ...extractedData,
        notParsedData: {},
    };
}
function partitionAndExtract(source, rules) {
    const result = {};
    for (const key in rules) {
        const currentKey = key;
        const items = source[currentKey];
        const keyRules = rules[currentKey];
        if (!items || !keyRules)
            continue;
        const remaining = [];
        for (const item of items) {
            let matchedAtLeastOnce = false;
            const entries = Object.entries(keyRules);
            for (const [resKey, rule] of entries) {
                const predicate = rule.test;
                if (predicate(item)) {
                    matchedAtLeastOnce = true;
                    const transform = rule.transform;
                    const configOutput = rule.output ?? { format: 'list' };
                    const dataToPush = transform ? transform(item) : item;
                    if (configOutput.format === 'map' && configOutput.keyBy) {
                        if (!result[resKey])
                            result[resKey] = {};
                        const id = dataToPush[configOutput.keyBy];
                        if (id !== undefined) {
                            result[resKey][id] = dataToPush;
                        }
                    }
                    else {
                        if (!result[resKey])
                            result[resKey] = [];
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
const rulesByKey = {
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
            test: (move) => move.templateId.split('_').last() !== move.data.pokemonId,
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
                    stardustCaptureReward: (move.data.encounter.bonusStardustCaptureReward ?? 0) + 100,
                },
            }),
        },
    },
};
