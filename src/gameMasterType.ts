import { GameMasterSpecializedDataTypes, Setting } from './entity.js';
import { GAME_MASTER_KEYS } from './gameMasterKeys.js';

// ===== TYPES DE BASE =====

export type GameMasterKey = (typeof GAME_MASTER_KEYS)[number];

// ===== INTERFACES MÉTIER SPÉCIALISÉES =====
// Base commune pour toutes les données

type GameMasterDataTypes = {
    [K in GameMasterKey]: K extends keyof GameMasterSpecializedDataTypes
        ? GameMasterSpecializedDataTypes[K]
        : Setting;
};

// ===== TYPES DE TRANSFORMATION =====

/** Élément groupé par clé avec type de data spécialisé */
export type GameMasterItemByKey<K extends GameMasterKey = GameMasterKey> = {
    templateId: string;
    data: GameMasterDataTypes[K];
};

/** Résultat final: objet mappant chaque clé à une liste d'items */
export type GameMasterByKey = {
    [K in GameMasterKey]?: GameMasterItemByKey<K>[];
};

// ===== TYPES SOURCE =====

/** Structure brute d'un item du GameMaster */
export interface GameMasterItem {
    templateId: string;
    data: {
        templateId: string;
        [key: string]: unknown; // Une seule clé métier parmi les 192 possibles
    };
}

/** Liste brute d'items */
export type GameMaster = GameMasterItem[];

// ===== FONCTION DE TRANSFORMATION =====

/**
 * Transforme une liste plate d'items en un objet groupé par clé métier
 *
 * @param gameMaster - Liste des items bruts
 * @returns Objet avec les 192 clés, chacune contenant un tableau d'items transformés
 */
export function groupGameMaster(gameMaster: GameMaster): GameMasterByKey {
    const result: GameMasterByKey = {};

    for (const item of gameMaster) {
        // Extraire la clé métier (unique autre que templateId)
        const key = Object.keys(item.data).find((k) => k !== 'templateId') as
            | GameMasterKey
            | undefined;

        if (!key) continue;

        // Initialiser le tableau pour cette clé si nécessaire
        if (!result[key]) {
            result[key] = [];
        }

        // Transformer l'item: mettre le contenu de data[key] comme nouvelle data
        const newItem = {
            templateId: item.templateId,
            data: item.data[key],
        };

        (result[key] as GameMasterItemByKey[]).push(newItem as GameMasterItemByKey);
    }

    return result;
}
