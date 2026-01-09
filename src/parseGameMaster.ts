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
        notParsedData: gameMasterByKey,
    };
}

export type ExtractionRules = {
    [K in GameMasterKey]?: {
        [resultKey: string]: (item: GameMasterItemByKey<K>) => boolean;
    };
};

function partitionAndExtract(source: GameMasterByKey, rules: ExtractionRules): ExtractionResult {
    const result: ExtractionResult = {};

    // On itère sur les clés définies dans nos règles
    for (const key in rules) {
        const currentKey = key as GameMasterKey;
        const items = source[currentKey];
        const keyRules = rules[currentKey];

        if (!items || !keyRules) continue;

        const remaining: GameMasterItemByKey<any>[] = [];

        for (const item of items) {
            let matched = false;

            // On teste chaque prédicat défini pour cette clé
            for (const [resKey, predicate] of Object.entries(keyRules)) {
                // Le cast 'as any' est ici nécessaire car TS ne peut pas prouver
                // dynamiquement la correspondance exacte dans la boucle
                if ((predicate as (i: any) => boolean)(item)) {
                    if (!result[resKey]) result[resKey] = [];
                    result[resKey].push(item);
                    matched = true;
                    break;
                }
            }

            if (!matched) {
                remaining.push(item);
            }
        }

        // On met à jour la source avec ce qui n'a pas été extrait
        // @ts-ignore : On sait que le type correspond
        source[currentKey] = remaining;
    }

    return result;
}

// Le résultat sera un dictionnaire de tableaux d'items génériques
// car les noms des clés (fastMove, etc.) sont dynamiques.
export type ExtractionResult = Record<string, GameMasterItemByKey<any>[]>;

const rulesByKey: ExtractionRules = {
    moveSettings: {
        fastMove: (move) => move.templateId.includes('FAST'),
        dynamaxMove: (move) => 'obMoveSettingsNumber18' in move.data,
        chargedMove: (move) =>
            !('obMoveSettingsNumber18' in move.data) && !move.templateId.includes('FAST'),
    },
};
