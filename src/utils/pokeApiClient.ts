import { httpRetryClient } from './httpRetryClient.js';

class PokeApiClient {
    private readonly speciesCache = new Map<number, any>();

    async fetchPokemonSpecies(dexNumber: number): Promise<any> {
        if (this.speciesCache.has(dexNumber)) return this.speciesCache.get(dexNumber);

        const data = await httpRetryClient.fetchJson(
            `https://pokeapi.co/api/v2/pokemon-species/${dexNumber}`,
        );
        this.speciesCache.set(dexNumber, data);
        return data;
    }
}

export const pokeApiClient = new PokeApiClient();
