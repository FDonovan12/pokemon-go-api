export interface GameMasterItem {
    templateId: string;
    data: Record<string, any>; // On accepte tout ici, c'est Quicktype qui triera
}

export type GameMaster = GameMasterItem[];

// On garde juste les clés pour le groupement
export type GameMasterByKey = Record<string, { templateId: string; data: any }[]>;

export function groupGameMaster(gameMaster: GameMaster): GameMasterByKey {
    const result: GameMasterByKey = {};

    for (const item of gameMaster) {
        // On récupère la clé qui n'est pas templateId (ex: 'pokemonSettings', 'moveSettings')
        const key = Object.keys(item.data).find((k) => k !== 'templateId');

        if (!key) continue;

        if (!result[key]) {
            result[key] = [];
        }

        result[key].push({
            templateId: item.templateId,
            data: item.data[key],
        });
    }

    return result;
}
