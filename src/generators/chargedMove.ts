import { FileGenerator } from '../type/fileGenerator.js';

export default class ChargedMoveSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'raidMove/charged-move.json';
    }
    async getFileContent(): Promise<any> {
        // const raw = await IntermediateData.getRaidMove();
        return 'raw.chargedMove';
    }
}
