import { RawGameMaster } from '../../generated/index.js';
import { FileGenerator } from '../type/fileGenerator.js';

export default class DynamaxMoveSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'raidMove/dynamax-move.json';
    }
    async getFileContent(): Promise<string> {
        const raw = await RawGameMaster.getMoveSettings();
        const pokemons = raw
            .filter((move) => 'obMoveSettingsNumber18' in move.data)
            .map((move) => ({
                id: move.templateId,
                movementId: move.data.movementId,
                pokemonType: move.data.pokemonType,
                powerLevels: move.data.obMoveSettingsNumber18,
                vfxName: move.data.vfxName,
            }));
        return JSON.stringify(pokemons, null, 2);
    }
}
