import { getCpMultipliers } from '../services/cpMultiplier.service.js';
import { FileGenerator } from '../type/fileGenerator.js';

export default class CpMultiplierGenerator extends FileGenerator {
    getFileName(): string {
        return 'pokemon/cp-multiplier.json';
    }

    async getFileContent(): Promise<any> {
        return await getCpMultipliers();
    }
}
