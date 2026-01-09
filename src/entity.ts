// ===== INTERFACES MÉTIER SPÉCIALISÉES =====
// Base commune pour toutes les données
export interface Setting {
    [key: string]: unknown;
}

// Ajouter vos interfaces spécialisées ici au fur et à mesure
export interface MoveSettingsData extends Setting {
    energy: number;
    damage: number;
}

// ===== MAPPING CLÉS -> TYPES SPÉCIALISÉS =====
// Étendre cette interface avec vos nouvelles clés métier
export interface GameMasterSpecializedDataTypes {
    moveSettings: MoveSettingsData;
}
