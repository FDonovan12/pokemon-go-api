import { IntermediateData } from '@generated/intermediate.index.js';
import { FileGenerator, GeneratorSpeed } from '../type/fileGenerator.js';
export default class PokemonSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'pokemon-setting.json';
    }

    getSpeed(): GeneratorSpeed {
        return GeneratorSpeed.MEDIUM;
    }

    async getFileContent(): Promise<any> {
        const content = await IntermediateData.getPokemonSetting();
        return content;
    }
}
