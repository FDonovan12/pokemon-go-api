import { RawGameMaster } from '@generated/raw.index.js';
import { FileGenerator } from '../type/fileGenerator.js';

export default class ChargedMoveSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'raidMove/charged-move.json';
    }
    async getFileContent(): Promise<string> {
        const raw = await RawGameMaster.getMoveSettings();
        const moves = raw
            .filter(
                (move) =>
                    !('obMoveSettingsNumber18' in move.data) && !move.templateId.includes('FAST'),
            )
            .map((move) => ({
                id: move.templateId,
                movementId: move.data.movementId,
                pokemonType: move.data.pokemonType,
                power: move.data.power,
                durationMs: move.data.durationMs,
                energyDelta: move.data.energyDelta,
                vfxName: move.data.vfxName,
            }))
            .toMap((move) => move.movementId);
        return JSON.stringify(Object.fromEntries(moves), null, 2);
    }
}
