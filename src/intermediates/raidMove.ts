// src/intermediates/pokemonSetting.intermediate.ts
import { IntermediateGenerator } from '../type/intermediateGenerator.js';
import { getRaidMove } from '../services/raidMove.service.js';

export default class PokemonSettingIntermediate extends IntermediateGenerator {
    getName(): string {
        return 'raid-move';
    }

    async compute(): Promise<any> {
        return getRaidMove();
    }
}
