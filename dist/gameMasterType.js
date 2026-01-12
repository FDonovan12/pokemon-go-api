export function groupGameMaster(gameMaster) {
    const result = {};
    for (const item of gameMaster) {
        const key = Object.keys(item.data).find((k) => k !== 'templateId');
        if (!key)
            continue;
        if (!result[key]) {
            result[key] = [];
        }
        const newItem = {
            templateId: item.templateId,
            data: item.data[key],
        };
        result[key].push(newItem);
    }
    return result;
}
export var PokemonType;
(function (PokemonType) {
    PokemonType["PokemonTypeBug"] = "POKEMON_TYPE_BUG";
    PokemonType["PokemonTypeDark"] = "POKEMON_TYPE_DARK";
    PokemonType["PokemonTypeDragon"] = "POKEMON_TYPE_DRAGON";
    PokemonType["PokemonTypeElectric"] = "POKEMON_TYPE_ELECTRIC";
    PokemonType["PokemonTypeFairy"] = "POKEMON_TYPE_FAIRY";
    PokemonType["PokemonTypeFighting"] = "POKEMON_TYPE_FIGHTING";
    PokemonType["PokemonTypeFire"] = "POKEMON_TYPE_FIRE";
    PokemonType["PokemonTypeFlying"] = "POKEMON_TYPE_FLYING";
    PokemonType["PokemonTypeGhost"] = "POKEMON_TYPE_GHOST";
    PokemonType["PokemonTypeGrass"] = "POKEMON_TYPE_GRASS";
    PokemonType["PokemonTypeGround"] = "POKEMON_TYPE_GROUND";
    PokemonType["PokemonTypeIce"] = "POKEMON_TYPE_ICE";
    PokemonType["PokemonTypeNormal"] = "POKEMON_TYPE_NORMAL";
    PokemonType["PokemonTypePoison"] = "POKEMON_TYPE_POISON";
    PokemonType["PokemonTypePsychic"] = "POKEMON_TYPE_PSYCHIC";
    PokemonType["PokemonTypeRock"] = "POKEMON_TYPE_ROCK";
    PokemonType["PokemonTypeSteel"] = "POKEMON_TYPE_STEEL";
    PokemonType["PokemonTypeWater"] = "POKEMON_TYPE_WATER";
})(PokemonType || (PokemonType = {}));
