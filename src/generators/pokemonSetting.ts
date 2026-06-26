import { getPokemonSetting } from '../services/pokemonSetting.service.js';
import { FileGenerator } from '../type/fileGenerator.js';
export default class PokemonSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'pokemon-setting.json';
    }

    async getFileContent(): Promise<string> {
        return JSON.stringify(await getPokemonSetting(), null, 2);
    }
}
