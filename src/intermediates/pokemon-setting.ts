// src/intermediates/pokemonSetting.intermediate.ts
import { getPokemonSetting } from '../services/pokemonSetting.service.js';
import { IntermediateGenerator } from '../type/intermediateGenerator.js';

export default class PokemonSettingIntermediate extends IntermediateGenerator {
    getName(): string {
        return 'pokemon-setting';
    }

    async compute(): Promise<any> {
        return getPokemonSetting();
    }
}
