export function pokemonTypeToFrench(type: string): string | undefined {
    return POKEMON_TYPE_TO_FRENCH[type];
}

export const POKEMON_TYPE_TO_FRENCH: Record<string, string | undefined> = {
    POKEMON_TYPE_BUG: 'Insecte',
    POKEMON_TYPE_DARK: 'Ténèbres',
    POKEMON_TYPE_DRAGON: 'Dragon',
    POKEMON_TYPE_ELECTRIC: 'Électrik',
    POKEMON_TYPE_FAIRY: 'Fée',
    POKEMON_TYPE_FIGHTING: 'Combat',
    POKEMON_TYPE_FIRE: 'Feu',
    POKEMON_TYPE_FLYING: 'Vol',
    POKEMON_TYPE_GHOST: 'Spectre',
    POKEMON_TYPE_GRASS: 'Plante',
    POKEMON_TYPE_GROUND: 'Sol',
    POKEMON_TYPE_ICE: 'Glace',
    POKEMON_TYPE_NORMAL: 'Normal',
    POKEMON_TYPE_POISON: 'Poison',
    POKEMON_TYPE_PSYCHIC: 'Psy',
    POKEMON_TYPE_ROCK: 'Roche',
    POKEMON_TYPE_STEEL: 'Acier',
    POKEMON_TYPE_WATER: 'Eau',
};
