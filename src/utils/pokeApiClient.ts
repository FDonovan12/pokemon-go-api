import { httpRetryClient } from './httpRetryClient.js';

class PokeApiClient {
    private createCachedFetcher<T, K extends string | number>(
        urlBuilder: (key: K) => string,
    ): (key: K) => Promise<T | null> {
        const cache = new Map<string, Promise<T | null>>();

        return (key: K): Promise<T | null> => {
            const cacheKey = `${key}`;
            const cached = cache.get(cacheKey);
            if (cached) {
                return cached;
            }

            const request = httpRetryClient.fetchJson<T>(urlBuilder(key));
            cache.set(cacheKey, request);
            return request;
        };
    }

    fetchPokemonSpecies = this.createCachedFetcher<PokeApiPokemonSpecies, number>(
        (dexNumber) => `https://pokeapi.co/api/v2/pokemon-species/${dexNumber}`,
    );

    fetchPokemonForm = this.createCachedFetcher<PokeApiPokemonForm, string>(
        (formName) => `https://pokeapi.co/api/v2/pokemon-form/${formName}`,
    );

    fetchPokemon = this.createCachedFetcher<PokeApiPokemon, string>(
        (formName) => `https://pokeapi.co/api/v2/pokemon/${formName}`,
    );

    fetchMove = this.createCachedFetcher<PokeApiMove, string>(
        (moveName) => `https://pokeapi.co/api/v2/move/${moveName}`,
    );
}
interface PokeApiMove {
    names: { language: { name: string }; name: string }[];
}

export interface PokeApiPokemon {
    id: number;
}

export interface PokeApiPokemonForm {
    names: { name: string; language: { name: string } }[];
}

export interface PokeApiPokemonSpecies {
    names: { name: string; language: { name: string } }[];
    varieties: {
        pokemon: {
            name: string;
            url: string;
        };
    }[];
    generation: {
        name: string;
        url: string;
    };
}
export const pokeApiClient = new PokeApiClient();
