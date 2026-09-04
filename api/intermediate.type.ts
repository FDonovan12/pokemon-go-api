export interface PokemonSetting {
    base:      BaseElement;
    same:      BaseElement[];
    different: Different[];
}

export interface BaseElement {
    id:                  string;
    pokemonId:           string;
    dexNumber:           number;
    name:                string;
    generation:          number;
    slug:                string;
    imageId:             number;
    image:               string;
    imageShiny:          string;
    types:               Type[];
    stats:               Stats;
    quickMoves:          string[];
    cinematicMoves:      string[];
    eliteQuickMove:      string[];
    eliteCinematicMove:  string[];
    nonTmCinematicMoves: string[];
    hasMega:             boolean;
    evolutionIds:        EvolutionId[];
    family:              string;
    isLegendary:         boolean;
    isMythical:          boolean;
    isUltraBeast:        boolean;
    form:                string;
    encounter:           Encounter;
    parentPokemonId?:    string;
    tempEvoOverrides?:   SameTempEvoOverride[];
}

export interface Encounter {
    stardustCaptureReward: number;
}

export interface EvolutionId {
    pokemonId: string;
    form:      string;
}

export interface Stats {
    baseStamina: number;
    baseAttack:  number;
    baseDefense: number;
}

export interface SameTempEvoOverride {
    tempEvoId?:              TempEvoId;
    stats?:                  Stats;
    averageHeightM?:         number;
    averageWeightKg?:        number;
    typeOverride1?:          string;
    typeOverride2?:          string;
    camera?:                 Camera;
    modelScaleV2?:           number;
    modelHeight?:            number;
    buddyOffsetMale?:        number[];
    buddyOffsetFemale?:      number[];
    buddyPortraitOffset?:    number[];
    raidBossDistanceOffset?: number;
    buddyPortraitRotation?:  number[];
}

export interface Camera {
    cylinderRadiusM?: number;
    cylinderHeightM?: number;
    cylinderGroundM?: number;
}

export enum TempEvoId {
    TempEvolutionMega = "TEMP_EVOLUTION_MEGA",
    TempEvolutionMegaX = "TEMP_EVOLUTION_MEGA_X",
    TempEvolutionMegaY = "TEMP_EVOLUTION_MEGA_Y",
    TempEvolutionPrimal = "TEMP_EVOLUTION_PRIMAL",
}

export enum Type {
    Acier = "Acier",
    Combat = "Combat",
    Dragon = "Dragon",
    Eau = "Eau",
    Feu = "Feu",
    Fée = "Fée",
    Glace = "Glace",
    Insecte = "Insecte",
    Normal = "Normal",
    Plante = "Plante",
    Poison = "Poison",
    Psy = "Psy",
    Roche = "Roche",
    Sol = "Sol",
    Spectre = "Spectre",
    Ténèbres = "Ténèbres",
    Vol = "Vol",
    Électrik = "Électrik",
}

export interface Different {
    base: PurpleBase;
    same: BaseElement[];
}

export interface PurpleBase {
    id:                  string;
    pokemonId:           string;
    dexNumber:           number;
    name:                string;
    generation:          number;
    slug:                string;
    imageId:             number;
    image:               string;
    imageShiny:          string;
    types:               Type[];
    stats:               Stats;
    quickMoves:          string[];
    cinematicMoves:      string[];
    eliteQuickMove:      string[];
    eliteCinematicMove:  string[];
    nonTmCinematicMoves: string[];
    hasMega:             boolean;
    evolutionIds:        EvolutionId[];
    family:              string;
    isLegendary:         boolean;
    isMythical:          boolean;
    isUltraBeast:        boolean;
    form:                string;
    encounter:           Encounter;
    parentPokemonId?:    string;
    tempEvoOverrides?:   PurpleTempEvoOverride[];
}

export interface PurpleTempEvoOverride {
    raidBossDistanceOffset: number;
}

export interface RaidMove {
    fastMove:    { [key: string]: Move };
    chargedMove: { [key: string]: Move };
    dynamaxMove: { [key: string]: DynamaxMove };
}

export interface Move {
    id:          string;
    movementId:  string;
    pokemonType: Type;
    power:       number;
    durationMs:  number;
    energyDelta: number;
    vfxName:     string;
}

export interface DynamaxMove {
    id:          string;
    movementId:  string;
    pokemonType: Type;
    powerLevels: number[];
    vfxName:     string;
}
