import { IntermediateData } from '@generated/intermediate.index.js';
import { FileGenerator } from '../type/fileGenerator.js';

export default class DynamaxMoveSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'raidMove/dynamax-move.json';
    }
    async getFileContent(): Promise<any> {
        const raw = await IntermediateData.getRaidMove();
        return raw.dynamaxMove;
    }
}
