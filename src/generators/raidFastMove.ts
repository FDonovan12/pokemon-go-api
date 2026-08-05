import { IntermediateData } from '#generated/intermediate.index.js';
import { FileGenerator } from '../type/fileGenerator.js';

export default class RaidFastSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'raidMove/fast-move.json';
    }
    async getFileContent(): Promise<any> {
        const raw = await IntermediateData.getRaidMove();
        return raw.fastMove;
    }
}
