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
    evolutionIds:        SameEvolutionId[];
    family:              string;
    isLegendary:         boolean;
    isMythical:          boolean;
    isUltraBeast:        boolean;
    form:                string;
    encounter:           Encounter;
    mega?:               Mega[];
    parentPokemonId?:    string;
    tempEvoOverrides?:   SameTempEvoOverride[];
}

export interface Encounter {
    stardustCaptureReward: number;
}

export interface SameEvolutionId {
    pokemonId: string;
    form:      Form;
}

export type Form = number | string;

export interface Mega {
    name:        string;
    slug:        string;
    stats:       Stats;
    image:       string;
    types:       Type[];
    hasLevel4:   boolean;
    megaAttack?: ChargedMove;
}

export interface ChargedMove {
    id:          string;
    movementId:  string;
    pokemonType: Type;
    power:       number;
    durationMs:  number;
    energyDelta: number;
    vfxName:     string;
    names:       Names;
}

export interface Names {
    fr: string;
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
    specialMove?:            string;
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
    evolutionIds:        PurpleEvolutionId[];
    family:              string;
    isLegendary:         boolean;
    isMythical:          boolean;
    isUltraBeast:        boolean;
    form:                string;
    encounter:           Encounter;
    parentPokemonId?:    string;
    tempEvoOverrides?:   PurpleTempEvoOverride[];
}

export interface PurpleEvolutionId {
    pokemonId: string;
    form:      string;
}

export interface PurpleTempEvoOverride {
    raidBossDistanceOffset: number;
}

export interface RaidMove {
    fastMove:    { [key: string]: ChargedMove };
    chargedMove: { [key: string]: ChargedMove };
    dynamaxMove: { [key: string]: DynamaxMove };
}

export interface DynamaxMove {
    id:          string;
    movementId:  string;
    pokemonType: Type;
    powerLevels: number[];
    vfxName:     string;
    names:       Names;
}
