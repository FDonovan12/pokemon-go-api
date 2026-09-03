import { IntermediateData } from '#generated/intermediate.index.js';
import { FileGenerator } from '../type/fileGenerator.js';

export default class ChargedMoveSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'raidMove/charged-move.json';
    }
    async getFileContent(): Promise<any> {
        const raw = await IntermediateData.getRaidMove();
        const result = Object.entries(raw.chargedMove)
            .map(([key, attack]) => [
                key,
                {
                    pokemonType: attack.pokemonType,
                    power: attack.power,
                    durationMs: attack.durationMs,
                    energyDelta: attack.energyDelta,
                    realName: attack.vfxName,
                },
            ])
            .toObject();
        return raw.chargedMove;
    }
}
