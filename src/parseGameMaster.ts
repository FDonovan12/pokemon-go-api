import { GameMaster, GameMasterByKey, groupGameMaster } from './gameMasterType.js';

export function parseGameMaster(_gameMaster: GameMaster): any {
    const result: GameMasterByKey = groupGameMaster(_gameMaster);

    return result;
}
