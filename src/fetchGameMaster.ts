import { sourceConfig } from './config.js';
import { GameMaster } from './type/gameMasterType.js';

export async function fetchGameMaster(): Promise<GameMaster> {
    const res = await fetch(sourceConfig.game_master_url);
    if (!res.ok) {
        throw new Error('Impossible de récupérer le Game Master');
    }

    return res.json();
}
