import { httpRetryClient } from './httpRetryClient.js';

class PokeApiClient {
    private readonly speciesCache = new Map<number, Promise<any>>();

    fetchPokemonSpecies(dexNumber: number): Promise<any | null> {
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

    private readonly formCache = new Map<string, Promise<any>>();

    fetchPokemonForm(formName: string): Promise<any | null> {
        const cached = this.formCache.get(formName);

        if (cached) {
            return cached;
        }

        const request = httpRetryClient.fetchJson(
            `https://pokeapi.co/api/v2/pokemon-form/${formName}`,
        );

        this.formCache.set(formName, request);

        return request;
    }

    private readonly cache = new Map<string, Promise<any>>();

    fetchPokemon(formName: string): Promise<any | null> {
        const cached = this.cache.get(formName);

        if (cached) {
            return cached;
        }

        const request = httpRetryClient.fetchJson(`https://pokeapi.co/api/v2/pokemon/${formName}`);

        this.cache.set(formName, request);

        return request;
    }
}

export const pokeApiClient = new PokeApiClient();
