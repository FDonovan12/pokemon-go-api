import { GameMasterKey } from './gameMasterType.js';

export interface MoveSettings {
    power?: number;
    energyDelta?: number;
    movementId: string;
    animationId: number;
    pokemonType: string;
    obMoveSettingsNumber18?: number[];
    accuracyChance: number;
    staminaLossScalar: number;
    trainerLevelMin: number;
    trainerLevelMax: number;
    vfxName: string;
    durationMs: number;
    damageWindowStartMs: number;
    damageWindowEndMs: number;
}

export const keysResult: GameMasterKey[] = ['moveSettings'];
export interface SpecializedDataTypeMap {
    moveSettings: MoveSettings;
    pokemonSettings: PokemonSettings;
}

export interface PokemonSettings {
    pokemonId: string;
    modelScale?: number;
    type: Type;
    type2?: Type;
    camera: DataCamera;
    encounter: Encounter;
    stats: Stats;
    quickMoves?: string[];
    cinematicMoves?: string[];
    animationTime?: number[];
    evolutionIds?: string[];
    evolutionPips?: number;
    pokedexHeightM: number;
    pokedexWeightKg: number;
    heightStdDev: number;
    weightStdDev: number;
    familyId: string;
    candyToEvolve?: number;
    kmBuddyDistance: number;
    modelHeight?: number;
    evolutionBranch?: EvolutionBranch[];
    modelScaleV2?: number;
    buddyOffsetMale?: number[];
    buddyOffsetFemale?: number[];
    buddyScale?: number;
    thirdMove: ThirdMove;
    isTransferable?: boolean;
    isDeployable?: boolean;
    isTradable?: boolean;
    shadow?: Shadow;
    buddyGroupNumber?: number;
    buddyWalkedMegaEnergyAward?: number;
    raidBossDistanceOffset?: number;
    allowNoevolveEvolution?: string[];
    ibfc: Ibfc;
    breadTierGroup?: BreadTierGroup;
    form?: string;
    disableTransferToPokemonHome?: boolean;
    parentPokemonId?: string;
    buddySize?: BuddySize;
    combatShoulderCameraAngle?: number[];
    combatDefaultCameraAngle?: number[];
    combatPlayerFocusCameraAngle?: number[];
    eliteCinematicMove?: string[];
    tempEvoOverrides?: TempEvoOverride[];
    eliteQuickMove?: string[];
    useIrisFlyingPlacement?: boolean;
    irisPhotoEmote1?: IrisPhotoEmote1;
    buddyPortraitOffset?: number[];
    irisFlyingHeightLimitMeters?: number;
    combatPlayerPokemonPositionOffset?: number[];
    pokemonClass?: PokemonClass;
    irisPhotoEmote2?: string;
    buddyWalkedMegaEnergyAwards?: BuddyWalkedMegaEnergyAward[];
    combatOpponentFocusCameraAngle?: number[];
    buddyPortraitRotation?: number[];
    nonTmCinematicMoves?: string[];
    exclusiveKeyItem?: ExclusiveKeyItem;
    formChange?: FormChange[];
    sizeSettings?: SizeSettings;
    irisPhotoHueOrder?: number;
    irisPhotoShinyHueOrder?: number;
}

export enum BreadTierGroup {
    Group1 = 'GROUP_1',
    Group2 = 'GROUP_2',
    Group3 = 'GROUP_3',
    Group4 = 'GROUP_4',
    Group8 = 'GROUP_8',
    GroupZ = 'GROUP_Z',
}

export enum BuddySize {
    BuddyBaby = 'BUDDY_BABY',
    BuddyBig = 'BUDDY_BIG',
    BuddyFlying = 'BUDDY_FLYING',
    BuddyShoulder = 'BUDDY_SHOULDER',
}

export interface BuddyWalkedMegaEnergyAward {
    megaPokemonId: MegaPokemonID;
    megaEnergyAwardAmount: number;
    genderRequirement?: GenderRequirement;
}

export enum GenderRequirement {
    Female = 'FEMALE',
    Male = 'MALE',
}

export enum MegaPokemonID {
    Gallade = 'GALLADE',
    Gardevoir = 'GARDEVOIR',
}

export interface DataCamera {
    diskRadiusM?: number;
    cylinderRadiusM?: number;
    cylinderHeightM?: number;
    shoulderModeScale?: number;
    cylinderGroundM?: number;
}

export interface Encounter {
    collisionRadiusM?: number;
    collisionHeightM?: number;
    collisionHeadRadiusM?: number;
    movementType?: MovementType;
    movementTimerS?: number;
    jumpTimeS?: number;
    attackTimerS?: number;
    attackProbability?: number;
    dodgeProbability?: number;
    dodgeDurationS?: number;
    dodgeDistance?: number;
    cameraDistance?: number;
    minPokemonActionFrequencyS?: number;
    maxPokemonActionFrequencyS?: number;
    shadowBaseCaptureRate?: number;
    shadowAttackProbability?: number;
    shadowDodgeProbability?: number;
    bonusCandyCaptureReward?: number;
    bonusStardustCaptureReward?: number;
    bonusXlCandyCaptureReward?: number;
}

export enum MovementType {
    MovementElectric = 'MOVEMENT_ELECTRIC',
    MovementFlying = 'MOVEMENT_FLYING',
    MovementHovering = 'MOVEMENT_HOVERING',
    MovementJump = 'MOVEMENT_JUMP',
    MovementPsychic = 'MOVEMENT_PSYCHIC',
}

export interface EvolutionBranch {
    evolution?: string;
    candyCost?: number;
    form?: string;
    candyCostPurified?: number;
    temporaryEvolution?: Temp;
    temporaryEvolutionEnergyCost?: number;
    temporaryEvolutionEnergyCostSubsequent?: number;
    evolutionItemRequirement?: string;
    priority?: number;
    questDisplay?: QuestDisplay[];
    noCandyCostViaTrade?: boolean;
    lureItemRequirement?: string;
    kmBuddyDistanceRequirement?: number;
    mustBeBuddy?: boolean;
    onlyDaytime?: boolean;
    onlyNighttime?: boolean;
    evolutionLikelihoodWeight?: number;
    onlyFullMoon?: boolean;
    genderRequirement?: GenderRequirement;
    evolutionMoveRequirement?: string;
    onlyUpsideDown?: boolean;
    evolutionItemRequirementCost?: number;
    onlyDuskPeriod?: boolean;
}

export interface QuestDisplay {
    questRequirementTemplateId: string;
}

export enum Temp {
    TempEvolutionMega = 'TEMP_EVOLUTION_MEGA',
    TempEvolutionMegaX = 'TEMP_EVOLUTION_MEGA_X',
    TempEvolutionMegaY = 'TEMP_EVOLUTION_MEGA_Y',
    TempEvolutionPrimal = 'TEMP_EVOLUTION_PRIMAL',
}

export interface ExclusiveKeyItem {
    item: string;
    count: number;
}

export interface FormChange {
    availableForm: string[];
    candyCost?: number;
    stardustCost?: number;
    item?: string;
    itemCostCount?: number;
    componentPokemonSettings?: ComponentPokemonSettings;
    moveReassignment?: MoveReassignment;
    requiredCinematicMoves?: RequiredCinematicMove[];
    formChangeBonusAttributes?: FormChangeBonusAttribute[];
    locationCardSettings?: FormChangeLocationCardSetting[];
    requiredBreadMoves?: RequiredBreadMove[];
    priority?: number;
}

export interface ComponentPokemonSettings {
    pokedexId: string;
    componentCandyCost?: number;
    formChangeType: FormChangeType;
    locationCardSettings?: ComponentPokemonSettingsLocationCardSetting[];
    familyId: FamilyID;
}

export enum FamilyID {
    FamilyCosmog = 'FAMILY_COSMOG',
    FamilyReshiram = 'FAMILY_RESHIRAM',
    FamilyZekrom = 'FAMILY_ZEKROM',
}

export enum FormChangeType {
    Fuse = 'FUSE',
    Unfuse = 'UNFUSE',
}

export interface ComponentPokemonSettingsLocationCardSetting {
    basePokemonLocationCard: string;
    componentPokemonLocationCard: string;
    fusionPokemonLocationCard: string;
}

export interface FormChangeBonusAttribute {
    targetForm: string;
    breadMode?: string;
    maxMoves?: MaxMove[];
    clearBreadMode?: boolean;
}

export interface MaxMove {
    moveType: string;
    moveLevel: string;
}

export interface FormChangeLocationCardSetting {
    existingLocationCard: string;
    replacementLocationCard: string;
}

export interface MoveReassignment {
    cinematicMoves: CinematicMove[];
}

export interface CinematicMove {
    existingMoves?: string[];
    replacementMoves: string[];
}

export interface RequiredBreadMove {
    moveTypes: string[];
    moveLevel: string;
}

export interface RequiredCinematicMove {
    requiredMoves: string[];
}

export interface Ibfc {
    combatEnable?: boolean;
    defaultForm?: string;
    alternateForm?: string;
    defaultToAlternateIbfcSettings?: IbfcSettings;
    alternateToDefaultIbfcSettings?: IbfcSettings;
}

export interface IbfcSettings {
    animationDurationTurns: number;
    animationPlayPoint: string;
    ibfcVfxKey: string;
    currentMove?: string;
    replacementMove?: string;
}

export enum IrisPhotoEmote1 {
    Eat = 'Eat',
    PhysicalAttack = 'PhysicalAttack',
}

export enum PokemonClass {
    PokemonClassLegendary = 'POKEMON_CLASS_LEGENDARY',
    PokemonClassMythic = 'POKEMON_CLASS_MYTHIC',
    PokemonClassUltraBeast = 'POKEMON_CLASS_ULTRA_BEAST',
}

export interface Shadow {
    purificationStardustNeeded: number;
    purificationCandyNeeded: number;
    purifiedChargeMove: PurifiedChargeMove;
    shadowChargeMove: ShadowChargeMove;
}

export enum PurifiedChargeMove {
    AeroblastPlusPlus = 'AEROBLAST_PLUS_PLUS',
    Return = 'RETURN',
    SacredFirePlusPlus = 'SACRED_FIRE_PLUS_PLUS',
}

export enum ShadowChargeMove {
    AeroblastPlus = 'AEROBLAST_PLUS',
    Frustration = 'FRUSTRATION',
    SacredFirePlus = 'SACRED_FIRE_PLUS',
}

export interface SizeSettings {
    xxsLowerBound: number;
    xsLowerBound: number;
    mLowerBound: number;
    mUpperBound: number;
    xlUpperBound: number;
    xxlUpperBound: number;
    xxsScaleMultiplier: number;
    xsScaleMultiplier: number;
    xlScaleMultiplier: number;
    xxlScaleMultiplier: number;
    disablePokedexRecordDisplayForForms: boolean;
}

export interface Stats {
    baseStamina: number;
    baseAttack: number;
    baseDefense: number;
}

export interface TempEvoOverride {
    tempEvoId?: Temp;
    stats?: Stats;
    averageHeightM?: number;
    averageWeightKg?: number;
    typeOverride1?: Type;
    typeOverride2?: Type;
    camera?: TempEvoOverrideCamera;
    modelScaleV2?: number;
    modelHeight?: number;
    buddyOffsetMale?: number[];
    buddyOffsetFemale?: number[];
    buddyPortraitOffset?: number[];
    raidBossDistanceOffset?: number;
    buddyPortraitRotation?: number[];
}

export interface TempEvoOverrideCamera {
    cylinderRadiusM?: number;
    cylinderHeightM?: number;
    cylinderGroundM?: number;
}

export enum Type {
    PokemonTypeBug = 'POKEMON_TYPE_BUG',
    PokemonTypeDark = 'POKEMON_TYPE_DARK',
    PokemonTypeDragon = 'POKEMON_TYPE_DRAGON',
    PokemonTypeElectric = 'POKEMON_TYPE_ELECTRIC',
    PokemonTypeFairy = 'POKEMON_TYPE_FAIRY',
    PokemonTypeFighting = 'POKEMON_TYPE_FIGHTING',
    PokemonTypeFire = 'POKEMON_TYPE_FIRE',
    PokemonTypeFlying = 'POKEMON_TYPE_FLYING',
    PokemonTypeGhost = 'POKEMON_TYPE_GHOST',
    PokemonTypeGrass = 'POKEMON_TYPE_GRASS',
    PokemonTypeGround = 'POKEMON_TYPE_GROUND',
    PokemonTypeIce = 'POKEMON_TYPE_ICE',
    PokemonTypeNormal = 'POKEMON_TYPE_NORMAL',
    PokemonTypePoison = 'POKEMON_TYPE_POISON',
    PokemonTypePsychic = 'POKEMON_TYPE_PSYCHIC',
    PokemonTypeRock = 'POKEMON_TYPE_ROCK',
    PokemonTypeSteel = 'POKEMON_TYPE_STEEL',
    PokemonTypeWater = 'POKEMON_TYPE_WATER',
}

export interface ThirdMove {
    stardustToUnlock?: number;
    candyToUnlock: number;
}
