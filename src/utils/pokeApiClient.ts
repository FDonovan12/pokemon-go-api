import { httpRetryClient } from './httpRetryClient.js';

class PokeApiClient {
    private readonly speciesCache = new Map<number, Promise<any>>();

    fetchPokemonSpecies(dexNumber: number): Promise<any> {
        const cached = this.speciesCache.get(dexNumber);

        if (cached) {
            return cached;
        }

        const request = httpRetryClient.fetchJson(
            `https://pokeapi.co/api/v2/pokemon-species/${dexNumber}`,
        );

        this.speciesCache.set(dexNumber, request);

        return request;
    }
}

export const pokeApiClient = new PokeApiClient();
