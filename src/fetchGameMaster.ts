import { sourceConfig } from './config.js';
import { GameMaster } from './type/gameMasterType.js';

export async function fetchTimestamp(): Promise<string> {
    const res = await fetch(sourceConfig.timestamp_url);
    if (!res.ok) {
        throw new Error('Impossible de récupérer le timestamp');
    }

    const data = await res.json();
    return data.uploadTime;
}

export async function fetchGameMaster(): Promise<GameMaster> {
    const res = await fetch(sourceConfig.game_master_url);
    if (!res.ok) {
        throw new Error('Impossible de récupérer le Game Master');
    }

    return res.json();
}
