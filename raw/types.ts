export interface AccessibilitySettings {
    templateId: string;
    data:       AccessibilitySettingData;
}

export interface AccessibilitySettingData {
    enabled:       boolean;
    pluginEnabled: boolean;
}

export interface AdditiveSceneSettings {
    templateId: string;
    data:       AdditiveSceneSettingData;
}

export interface AdditiveSceneSettingData {
    enabled: boolean;
}

export interface AddressablePokemonSettings {
    templateId: string;
    data:       AddressablePokemonSettingData;
}

export interface AddressablePokemonSettingData {
    addressablePokemonIds: string[];
}

export interface AddressBookImportSettings {
    templateId: string;
    data:       AddressBookImportSettingData;
}

export interface AddressBookImportSettingData {
    isEnabled:               boolean;
    onboardingScreenLevel:   number;
    showOptOutCheckbox:      boolean;
    repromptOnboardingForV1: boolean;
}

export interface FeatureGate {
    templateId: string;
    data:       FeatureGateData;
}

export interface FeatureGateData {
    status:            number;
    rolloutPercentage: number;
}

export interface AdvancedSettings {
    templateId: string;
    data:       AdvancedSettingData;
}

export interface AdvancedSettingData {
    downloadAllAssetsEnabled: boolean;
}

export interface RollBack {
    templateId: string;
    data:       RollBackData;
}

export interface RollBackData {
    rollbackPercentage: number;
}

export interface EvolutionQuestTemplate {
    templateId: string;
    data:       EvolutionQuestTemplateData;
}

export interface EvolutionQuestTemplateData {
    questTemplateId: string;
    questType:       string;
    goals:           GoalElement[];
    context:         Context;
    display:         Display;
}

export enum Context {
    EvolutionQuest = "EVOLUTION_QUEST",
}

export interface Display {
    description: string;
    title:       string;
}

export interface GoalElement {
    condition?: PurpleCondition[];
    target:     number;
}

export interface PurpleCondition {
    type:                             string;
    withPokemonType?:                 WithPokemonType;
    withOpponentPokemonBattleStatus?: WithOpponentPokemonBattleStatus;
    withCombatType?:                  WithCombatType;
    withThrowType?:                   WithThrowType;
}

export interface WithCombatType {
    combatType: string[];
}

export interface WithOpponentPokemonBattleStatus {
    requireDefeat:       boolean;
    opponentPokemonType: TemplateIdElement[];
}

export enum TemplateIdElement {
    PokemonTypeBug = "POKEMON_TYPE_BUG",
    PokemonTypeDark = "POKEMON_TYPE_DARK",
    PokemonTypeDragon = "POKEMON_TYPE_DRAGON",
    PokemonTypeElectric = "POKEMON_TYPE_ELECTRIC",
    PokemonTypeFairy = "POKEMON_TYPE_FAIRY",
    PokemonTypeFighting = "POKEMON_TYPE_FIGHTING",
    PokemonTypeFire = "POKEMON_TYPE_FIRE",
    PokemonTypeFlying = "POKEMON_TYPE_FLYING",
    PokemonTypeGhost = "POKEMON_TYPE_GHOST",
    PokemonTypeGrass = "POKEMON_TYPE_GRASS",
    PokemonTypeGround = "POKEMON_TYPE_GROUND",
    PokemonTypeIce = "POKEMON_TYPE_ICE",
    PokemonTypeNormal = "POKEMON_TYPE_NORMAL",
    PokemonTypePoison = "POKEMON_TYPE_POISON",
    PokemonTypePsychic = "POKEMON_TYPE_PSYCHIC",
    PokemonTypeRock = "POKEMON_TYPE_ROCK",
    PokemonTypeSteel = "POKEMON_TYPE_STEEL",
    PokemonTypeWater = "POKEMON_TYPE_WATER",
}

export interface WithPokemonType {
    pokemonType: TemplateIdElement[];
}

export interface WithThrowType {
    throwType: string;
}

export interface ArPhotoFeatureFlags {
    templateId: string;
    data:       ArPhotoFeatureFlagData;
}

export interface ArPhotoFeatureFlagData {
    excludedPokemonIds:        string[];
    pokemonWithExcludedForms:  PokemonWithExcludedForm[];
    mainMenuEntryEnabled:      number;
    shareFunctionalityEnabled: number;
    preLoginRollOutRatio:      number;
    preLoginDeviceAllowList:   string[];
    lapsedDaysCutoff:          number;
    newDaysCutoff:             number;
    rollOutCountryCodes:       string[];
    errorReportingSettings:    ErrorReportingSettings;
}

export interface ErrorReportingSettings {
    isEnabled:                    boolean;
    percentChancePlayerSends:     number;
    maxEventsPerSlidingWindow:    number;
    slidingWindowLengthS:         number;
    maxTotalEventsBeforeShutdown: string;
}

export interface PokemonWithExcludedForm {
    pokemonId:     string;
    excludedForms: string[];
}

export interface ArTelemetrySettings {
    templateId: string;
    data:       ArTelemetrySettingData;
}

export interface ArTelemetrySettingData {
    measureBattery:              boolean;
    batterySamplingIntervalMs:   number;
    measureFramerate:            boolean;
    framerateSamplingIntervalMs: number;
    percentageSessionsToSample:  number;
    enableArdkTelemetry:         boolean;
}

export interface AssetRefreshProto {
    templateId: string;
    data:       AssetRefreshProtoData;
}

export interface AssetRefreshProtoData {
    stringRefreshSeconds: number;
}

export interface AvatarFeatureFlags {
    templateId: string;
    data:       AvatarFeatureFlagData;
}

export interface AvatarFeatureFlagData {
    corndogEnabled: boolean;
}

export interface AvatarGroupOrderSettings {
    templateId: string;
    data:       AvatarGroupOrderSettingData;
}

export interface AvatarGroupOrderSettingData {
    group: GroupElement[];
}

export interface GroupElement {
    name:           Name;
    order:          number;
    newTagEnabled?: boolean;
}

export enum Name {
    GroupBackpack = "group_backpack",
    GroupBelt = "group_belt",
    GroupEyes = "group_eyes",
    GroupFace = "group_face",
    GroupGlasses = "group_glasses",
    GroupGloves = "group_gloves",
    GroupHair = "group_hair",
    GroupHalloween = "group_halloween",
    GroupHat = "group_hat",
    GroupNecklace = "group_necklace",
    GroupOutfits = "group_outfits",
    GroupPants = "group_pants",
    GroupPoses = "group_poses",
    GroupSeasonal = "group_seasonal",
    GroupShirt = "group_shirt",
    GroupShoes = "group_shoes",
    GroupSkin = "group_skin",
    GroupSocks = "group_socks",
    GroupSponsor = "group_sponsor",
    GroupUniqlo = "group_uniqlo",
}

export interface AvatarCustomization {
    templateId: string;
    data:       AvatarCustomizationData;
}

export interface AvatarCustomizationData {
    enabled?:           boolean;
    avatarType?:        AvatarType;
    slot:               Slot[];
    bundleName?:        string;
    assetName:          string;
    groupName:          Name;
    sortOrder:          number;
    unlockType:         UnlockType;
    iapSku?:            string;
    iconName?:          string;
    setNames?:          string[];
    unlockBadgeType?:   string;
    unlockBadgeLevel?:  number;
    unlockPlayerLevel?: number;
    setPrimeItem?:      boolean;
}

export enum AvatarType {
    PlayerAvatarFemale = "PLAYER_AVATAR_FEMALE",
}

export enum Slot {
    Backpack = "BACKPACK",
    Belt = "BELT",
    Eyes = "EYES",
    Face = "FACE",
    Glasses = "GLASSES",
    Gloves = "GLOVES",
    Hair = "HAIR",
    Hat = "HAT",
    Necklace = "NECKLACE",
    Pants = "PANTS",
    Pose = "POSE",
    Shirt = "SHIRT",
    Shoes = "SHOES",
    Skin = "SKIN",
    Socks = "SOCKS",
}

export enum UnlockType {
    Default = "DEFAULT",
    IapClothing = "IAP_CLOTHING",
    LevelReward = "LEVEL_REWARD",
    MedalReward = "MEDAL_REWARD",
}

export interface LevelUpRewards {
    templateId: string;
    data:       LevelUpRewardData;
}

export interface LevelUpRewardData {
    level:                       number;
    items:                       string[];
    itemsCount:                  number[];
    featuresUnlocked?:           string[];
    clientOverrideDisplayOrder?: boolean;
    itemsUnlocked?:              string[];
    neutralAvatarItemTemplates?: NeutralAvatarItemTemplate;
    obLevelUpRewardsNumber9?:    number;
    isBackfill?:                 boolean;
}

export interface NeutralAvatarItemTemplate {
    itemTemplateId?:   string;
    displayTemplateId: string;
}

export interface BackgroundModeSettings {
    templateId: string;
    data:       BackgroundModeSettingData;
}

export interface BackgroundModeSettingData {
    weeklyFitnessGoalLevel1DistanceKm: number;
    weeklyFitnessGoalLevel2DistanceKm: number;
    weeklyFitnessGoalLevel3DistanceKm: number;
    weeklyFitnessGoalLevel4DistanceKm: number;
    weeklyFitnessGoalReminderKm:       number;
}

export interface BadgeSettings {
    templateId: string;
    data:       BadgeSettingData;
}

export interface BadgeSettingData {
    badgeType:           string;
    badgeRank:           number;
    targets:             number[];
    eventBadge?:         boolean;
    eventBadgeSettings?: EventBadgeSettings;
    captureReward?:      CaptureReward[];
}

export interface CaptureReward {
    rewardTypes?: DailyDefenderBonusCurrency[];
}

export enum DailyDefenderBonusCurrency {
    AvatarClothing = "AVATAR_CLOTHING",
    Candy = "CANDY",
    Experience = "EXPERIENCE",
    Item = "ITEM",
    PlayerAttribute = "PLAYER_ATTRIBUTE",
    Pokecoin = "POKECOIN",
    PokemonEncounter = "POKEMON_ENCOUNTER",
    Stardust = "STARDUST",
    XlCandy = "XL_CANDY",
}

export interface EventBadgeSettings {
    obEventBadgeSettingsNumber6: number;
}

export interface CodeGateProto {
    templateId: string;
    data:       CodeGateProtoData;
}

export interface CodeGateProtoData {
    isEnabled:        boolean;
    subCodeGateList?: SubCodeGateList;
}

export interface SubCodeGateList {
    name:       string;
    isEnabled?: boolean;
}

export interface BattleHubBadgeSettings {
    templateId: string;
    data:       BattleHubBadgeSettingData;
}

export interface BattleHubBadgeSettingData {
    combatHubDisplayedBadges: string[];
}

export interface BattleHubOrderSettings {
    templateId: string;
    data:       BattleHubOrderSettingData;
}

export interface BattleHubOrderSettingData {
    section:      Section[];
    sectionGroup: SectionGroup[];
}

export interface Section {
    mainSection: string;
    subsection:  string[];
}

export interface SectionGroup {
    section: string[];
}

export interface BattlePartySettings {
    templateId: string;
    data:       BattlePartySettingData;
}

export interface BattlePartySettingData {
    enableBattlePartySaving: boolean;
    maxBattleParties:        number;
    overallPartiesCap:       number;
}

export interface BattleSettings {
    templateId: string;
    data:       { [key: string]: number };
}

export interface BattleVisualSettings {
    templateId: string;
    data:       BattleVisualSettingData;
}

export interface BattleVisualSettingData {
    enhancementsEnabled: boolean;
    crowdTextureAsset:   string;
    bannerTextureAsset:  string;
}

export interface BelugaPokemonWhitelist {
    templateId: string;
    data:       BelugaPokemonWhitelistData;
}

export interface BelugaPokemonWhitelistData {
    maxAllowedPokemonPokedexNumber: number;
    additionalPokemonAllowed:       string[];
    costumesAllowed:                string[];
}

export interface BestFriendsPlusSettings {
    templateId: string;
    data:       BestFriendsPlusSettingData;
}

export interface BestFriendsPlusSettingData {
    enabled:            boolean;
    tutorialTimeCutoff: string;
}

export interface BreadBattleClientSettings {
    templateId: string;
    data:       BreadBattleClientSettingData;
}

export interface BreadBattleClientSettingData {
    remoteBreadBattleEnabled:                      boolean;
    breadBattleMinPlayerLevel:                     number;
    remoteBreadBattleMinPlayerLevel:               number;
    maxNumFriendInvites:                           number;
    friendInviteCutoffTimeSec:                     number;
    canInviteFriendsInPerson:                      boolean;
    canInviteFriendsRemotely:                      boolean;
    maxPlayersPerBreadLobby:                       number;
    maxRemotePlayersPerBreadLobby:                 number;
    inviteCooldownDurationMillis:                  string;
    maxNumFriendInvitesPerAction:                  number;
    prepareBreadLobbyEnabled:                      boolean;
    minPlayersToPrepareBreadLobby:                 number;
    prepareBreadLobbyCutoffMs:                     number;
    prepareBreadLobbySoloMs:                       number;
    rvnVersion:                                    number;
    maxPlayersPerBreadDoughLobby:                  number;
    maxRemotePlayersPerBreadDoughLobby:            number;
    maxRemoteBreadBattlePassesAllowed:             number;
    maxNumFriendInvitesToBreadDoughLobbyPerAction: number;
    fetchProfileFromSocialEnabled:                 boolean;
    maxPlayersToPrepareBreadDoughLobby:            number;
}

export interface BreadFeatureFlags {
    templateId: string;
    data:       BreadFeatureFlagData;
}

export interface BreadFeatureFlagData {
    enabled:                        boolean;
    discoveryEnabled:               boolean;
    mpEnabled:                      boolean;
    stationDiscoveryMode:           string;
    battleSpawnMode:                string;
    battleEnabled:                  boolean;
    nearbyLobbyCounterEnabled:      boolean;
    minimumPlayerLevel:             number;
    breadPostBattleRecoveryEnabled: boolean;
    powerSpotEditsEnabled:          boolean;
    canUseMasterBallPostBattle:     boolean;
    boostItemEnabled:               boolean;
    debugRpcEnabled:                boolean;
}

export interface BreadLobbyCounterSettings {
    templateId: string;
    data:       BreadLobbyCounterSettingData;
}

export interface BreadLobbyCounterSettingData {
    showCounterRadiusMeters:         number;
    subscribeS2Level:                number;
    subscriptionNamespace:           string;
    publishCutoffTimeMs:             string;
    breadDoughLobbyMaxCountToUpdate: number;
}

export interface BreadLobbyUpdateSettings {
    templateId: string;
    data:       BreadLobbyUpdateSettingData;
}

export interface BreadLobbyUpdateSettingData {
    joinPublishCutoffTimeMs:          string;
    serverPublishRateLimitIntervalMs: string;
}

export interface BreadMoveLevelSettings {
    templateId: string;
    data:       BreadMoveLevelSettingData;
}

export interface BreadMoveLevelSettingData {
    group:     GroupUnion;
    aSettings: Setting[];
    bSettings: Setting[];
    cSettings: Setting[];
}

export interface Setting {
    mpCost?:       number;
    candyCost?:    number;
    xpRewards?:    number;
    xlCandyCost?:  number;
    stardustCost?: number;
}

export type GroupUnion = BreadTierGroupEnum | number;

export enum BreadTierGroupEnum {
    Group1 = "GROUP_1",
    Group2 = "GROUP_2",
    Group3 = "GROUP_3",
    Group4 = "GROUP_4",
    Group8 = "GROUP_8",
    GroupZ = "GROUP_Z",
}

export interface BreadMoveMappings {
    templateId: string;
    data:       BreadMoveMappingData;
}

export interface BreadMoveMappingData {
    mappings: PurpleMapping[];
}

export interface PurpleMapping {
    type: TemplateIdElement;
    move: string;
}

export interface BreadPokemonScalingSettings {
    templateId: string;
    data:       BreadPokemonScalingSettingData;
}

export interface BreadPokemonScalingSettingData {
    visualSettings: VisualSetting[];
}

export interface VisualSetting {
    pokemonId:       string;
    pokemonFormData: PokemonFormDatum[];
}

export interface PokemonFormDatum {
    pokemonForm?: string;
    visualData:   VisualDatum[];
}

export interface VisualDatum {
    breadMode:                     BreadModeUnion;
    breadEncounterVisiualData?:    BreadEncounterVisiualData;
    breadBattleVisualData?:        MaxBattleVisualSettings;
    breadBattleTrainerVisualData?: MaxBattleTrainerVisualSettings;
    breadStationVisualData?:       MaxStationVisualSettings;
    breadBattleBossVisualData?:    MaxBattleVisualSettings;
}

export interface MaxBattleVisualSettings {
    scale?:   number;
    xOffset?: number;
    yOffset?: number;
}

export interface MaxBattleTrainerVisualSettings {
    xOffset:  number;
    yOffset?: number;
}

export interface BreadEncounterVisiualData {
    scale:           number;
    cameraDistance:  number;
    maxReticleSize?: number;
}

export type BreadModeUnion = BreadMode | number;

export enum BreadMode {
    BreadDoughMode = "BREAD_DOUGH_MODE",
    BreadDoughMode2 = "BREAD_DOUGH_MODE_2",
    BreadMode = "BREAD_MODE",
}

export interface MaxStationVisualSettings {
    scale?:   number;
    xOffset?: number;
}

export interface BreadSettings {
    templateId: string;
    data:       BreadSettingData;
}

export interface BreadSettingData {
    startOfDayOffsetDurationMs:          string;
    allowedSourdoughPokemon:             AllowedSourdoughPokemon[];
    maxStationedPokemon:                 number;
    numStationedPokemonToReturn:         number;
    maxStationedPokemonDisplayCount:     number;
    maxRangeForNearbyStateMeters:        number;
    showTimerWhenFar:                    boolean;
    breadBattleAvailability:             BreadBattleAvailability;
    minMsToReceiveReleaseStationRewards: string;
    maxStationedPokemonPerPlayer:        number;
    tutorialMaxBoostItemDurationS:       number;
}

export interface AllowedSourdoughPokemon {
    pokemonId: string;
    form:      string[];
    breadMode: BreadMode;
}

export interface BreadBattleAvailability {
    breadBattleAvailabilityStartMinute: number;
    breadBattleAvailabilityEndMinute:   number;
}

export interface BuddyActivityCategorySettings {
    templateId: string;
    data:       BuddyActivityCategorySettingData;
}

export interface BuddyActivityCategorySettingData {
    activityCategory: string;
    maxPointsPerDay:  number;
}

export interface BuddyEmotionLevelSettings {
    templateId: string;
    data:       BuddyEmotionLevelSettingData;
}

export interface BuddyEmotionLevelSettingData {
    emotionLevel:              string;
    emotionAnimation:          string;
    minEmotionPointsRequired?: number;
}

export interface BuddyEncounterCameoSettings {
    templateId: string;
    data:       BuddyEncounterCameoSettingData;
}

export interface BuddyEncounterCameoSettingData {
    buddyWildEncounterCameoChancePercent:     number;
    buddyQuestEncounterCameoChancePercent:    number;
    buddyRaidEncounterCameoChancePercent:     number;
    buddyInvasionEncounterCameoChancePercent: number;
}

export interface BuddyHungerSettings {
    templateId: string;
    data:       BuddyHungerSettingData;
}

export interface BuddyHungerSettingData {
    numHungerPointsRequiredForFull: number;
    decayPointsPerBucket:           number;
    millisecondsPerBucket:          string;
    cooldownDurationMs:             string;
    decayDurationAfterFullMs:       string;
}

export interface BuddyInteractionSettings {
    templateId: string;
    data:       BuddyInteractionSettingData;
}

export interface BuddyInteractionSettingData {
    feedItemWhitelist: string[];
}

export interface BuddyLevelSettings {
    templateId: string;
    data:       BuddyLevelSettingData;
}

export interface BuddyLevelSettingData {
    level:                           string;
    minNonCumulativePointsRequired?: number;
    unlockedTraits?:                 string[];
}

export interface BuddySwapSettings {
    templateId: string;
    data:       BuddySwapSettingData;
}

export interface BuddySwapSettingData {
    maxSwapsPerDay:          number;
    enableSwapFreeEvolution: boolean;
    enableQuickSwap:         boolean;
}

export interface BuddyWalkSettings {
    templateId: string;
    data:       BuddyWalkSettingData;
}

export interface BuddyWalkSettingData {
    kmRequiredPerAffectionPoint: number;
}

export interface BulkHealingSettings {
    templateId: string;
    data:       BulkHealingSettingData;
}

export interface BulkHealingSettingData {
    enabled:            boolean;
    maxPokemonsPerHeal: number;
}

export interface ButterflyCollectorSettings {
    templateId: string;
    data:       ButterflyCollectorSettingData;
}

export interface ButterflyCollectorSettingData {
    enabled:                    boolean;
    version:                    number;
    region:                     string[];
    dailyProgressFromInventory: number;
}

export interface CampfireSettings {
    templateId: string;
    data:       CampfireSettingData;
}

export interface CampfireSettingData {
    campfireEnabled:                 boolean;
    mapButtonsEnabled:               boolean;
    catchCardEnabled:                boolean;
    arCatchCardEnabled:              boolean;
    catchCardAvailableSeconds:       number;
    catchCardShareCampfireEnabled:   boolean;
    arCatchCardShareCampfireEnabled: boolean;
    meetupQueryTimerMs:              string;
    passwordlessLoginEnabled:        boolean;
}

export interface CatchRadiusMultiplierSettings {
    templateId: string;
    data:       CatchRadiusMultiplierSettingData;
}

export interface CatchRadiusMultiplierSettingData {
    catchRadiusMultiplierSettingsEnabled: boolean;
}

export interface InvasionNpcDisplaySettings {
    templateId: string;
    data:       InvasionNpcDisplaySettingData;
}

export interface InvasionNpcDisplaySettingData {
    trainerName:           string;
    avatar:                PurpleAvatar;
    trainerTitle:          string;
    trainerQuote:          string;
    iconUrl:               string;
    backdropImageBundle?:  BackdropImageBundle;
    modelName:             string;
    tutorialOnLossString?: string;
    tipsType?:             TemplateIdElement;
    isMale?:               boolean;
    customIncidentMusic?:  CustomIncidentMusic;
    customCombatMusic?:    CustomCombatMusic;
}

export interface PurpleAvatar {
    avatar?:         number;
    skin?:           number;
    avatarHair?:     string;
    avatarShirt?:    string;
    avatarPants?:    string;
    avatarHat?:      string;
    avatarShoes?:    string;
    avatarEyes?:     AvatarEyes;
    avatarBackpack?: string;
    avatarGloves?:   string;
    avatarSocks?:    string;
    avatarBelt?:     string;
    avatarGlasses?:  string;
    avatarNecklace?: string;
    avatarPose?:     string;
    avatarFace?:     AvatarFace;
}

export enum AvatarEyes {
    AvatarFEyes1 = "AVATAR_f_eyes_1",
    AvatarFEyes3 = "AVATAR_f_eyes_3",
    AvatarMEyes3 = "AVATAR_m_eyes_3",
}

export enum AvatarFace {
    AvatarFFaceEmpty = "AVATAR_f_face_empty",
    AvatarMFaceEmpty = "AVATAR_m_face_empty",
}

export enum BackdropImageBundle {
    CombatBlancheBackdrop = "combat_blanche_backdrop",
    CombatCandelaBackdrop = "combat_candela_backdrop",
    CombatSparkBackdrop = "combat_spark_backdrop",
}

export enum CustomCombatMusic {
    CombatMusic = "CombatMusic",
    GoTour2022Music02 = "GoTour2022Music02",
}

export enum CustomIncidentMusic {
    CombatLeaguePickerMusic = "CombatLeaguePickerMusic",
    QuestMusic = "QuestMusic",
}

export interface VnextBattleConfig {
    templateId: string;
    data:       VnextBattleConfigData;
}

export interface VnextBattleConfigData {
    raidsBattleConfig: BattleConfig;
    maxBattleConfig:   BattleConfig;
    pvpBattleConfig?:  BattleConfig;
}

export interface BattleConfig {
    battleEndTimeoutThresholdMs?:                  string;
    badNetworkWarningThresholdTurns?:              string;
    deadNetworkDisconnectThresholdTurns:           string;
    noOpponentConnectionDisconnectThresholdTurns?: string;
}

export interface CombatCompetitiveSeasonSettings {
    templateId: string;
    data:       CombatCompetitiveSeasonSettingData;
}

export interface CombatCompetitiveSeasonSettingData {
    seasonEndTimeTimestamp:      string[];
    ratingAdjustmentPercentage:  number;
    rankingAdjustmentPercentage: number;
}

export interface CombatLeague {
    templateId: string;
    data:       CombatLeagueData;
}

export interface CombatLeagueData {
    title:                              string;
    enabled:                            boolean;
    pokemonCondition:                   PokemonCondition[];
    iconUrl:                            string;
    pokemonCount:                       number;
    bannedPokemon?:                     string[];
    badgeType:                          BadgeType;
    leagueType:                         LeagueType;
    allowTempEvos?:                     boolean;
    unlockCondition?:                   UnlockCondition[];
    battlePartyCombatLeagueTemplateId?: CombatLeagueTemplateId;
}

export enum BadgeType {
    BadgeGreatLeague = "BADGE_GREAT_LEAGUE",
    BadgeMasterLeague = "BADGE_MASTER_LEAGUE",
    BadgeUltraLeague = "BADGE_ULTRA_LEAGUE",
}

export enum CombatLeagueTemplateId {
    CombatLeagueDefaultGreat = "COMBAT_LEAGUE_DEFAULT_GREAT",
    CombatLeagueDefaultMaster = "COMBAT_LEAGUE_DEFAULT_MASTER",
    CombatLeagueDefaultUltra = "COMBAT_LEAGUE_DEFAULT_ULTRA",
    CombatLeagueVsSeekerGreat = "COMBAT_LEAGUE_VS_SEEKER_GREAT",
}

export enum LeagueType {
    Premier = "PREMIER",
    Standard = "STANDARD",
}

export interface PokemonCondition {
    type:                    PokemonConditionType;
    withPokemonCpLimit?:     PokemonConditionWithPokemonCpLimit;
    pokemonCaughtTimestamp?: PokemonCaughtTimestamp;
    pokemonWhiteList?:       PokemonWhiteList;
    withPokemonType?:        WithPokemonType;
    pokemonLevelRange?:      PokemonLevelRange;
    pokemonBanList?:         PokemonBanList;
}

export interface PokemonBanList {
    pokemon: PokemonBanListPokemon[];
}

export interface PokemonBanListPokemon {
    id:     string;
    forms?: string[];
}

export interface PokemonCaughtTimestamp {
    afterTimestamp:  string;
    beforeTimestamp: string;
}

export interface PokemonLevelRange {
    maxLevel: number;
}

export interface PokemonWhiteList {
    pokemon: PokemonWhiteListPokemon[];
}

export interface PokemonWhiteListPokemon {
    id:     string;
    forms?: string[];
    form?:  string;
}

export enum PokemonConditionType {
    PokemonBanlist = "POKEMON_BANLIST",
    PokemonCaughtTimestamp = "POKEMON_CAUGHT_TIMESTAMP",
    PokemonLevelRange = "POKEMON_LEVEL_RANGE",
    PokemonWhitelist = "POKEMON_WHITELIST",
    WithPokemonCpLimit = "WITH_POKEMON_CP_LIMIT",
    WithPokemonType = "WITH_POKEMON_TYPE",
    WithUniquePokemon = "WITH_UNIQUE_POKEMON",
}

export interface PokemonConditionWithPokemonCpLimit {
    maxCp: number;
}

export interface UnlockCondition {
    type:                PokemonConditionType;
    minPokemonCount:     number;
    withPokemonCpLimit?: UnlockConditionWithPokemonCpLimit;
}

export interface UnlockConditionWithPokemonCpLimit {
    minCp: number;
    maxCp: number;
}

export interface CombatLeagueSettings {
    templateId: string;
    data:       CombatLeagueSettingData;
}

export interface CombatLeagueSettingData {
    combatLeagueTemplateId: CombatLeagueTemplateId[];
}

export interface CombatType {
    templateId: string;
    data:       CombatTypeData;
}

export interface CombatTypeData {
    type:                    TemplateIdElement;
    niceLevelThreshold:      number;
    greatLevelThreshold:     number;
    excellentLevelThreshold: number;
}

export interface CombatRankingProtoSettings {
    templateId: string;
    data:       CombatRankingProtoSettingData;
}

export interface CombatRankingProtoSettingData {
    rankLevel:              RankLevel[];
    requiredForRewards:     RequiredForRewards;
    minRankToDisplayRating: number;
    minRatingRequired?:     number;
}

export interface RankLevel {
    rankLevel:                       number;
    additionalTotalBattlesRequired?: number;
    additionalWinsRequired?:         number;
    minRatingRequired?:              number;
}

export interface RequiredForRewards {
    rankLevel:                      number;
    additionalTotalBattlesRequired: number;
}

export interface CombatSettings {
    templateId: string;
    data:       CombatSettingData;
}

export interface CombatSettingData {
    roundDurationSeconds:                    number;
    turnDurationSeconds:                     number;
    minigameDurationSeconds:                 number;
    sameTypeAttackBonusMultiplier:           number;
    fastAttackBonusMultiplier:               number;
    chargeAttackBonusMultiplier:             number;
    defenseBonusMultiplier:                  number;
    minigameBonusBaseMultiplier:             number;
    minigameBonusVariableMultiplier:         number;
    maxEnergy:                               number;
    defenderMinigameMultiplier:              number;
    changePokemonDurationSeconds:            number;
    minigameSubmitScoreDurationSeconds:      number;
    quickSwapCooldownDurationSeconds:        number;
    chargeScoreBase:                         number;
    chargeScoreNice:                         number;
    chargeScoreGreat:                        number;
    chargeScoreExcellent:                    number;
    superEffectiveFlyoutDurationTurns:       number;
    notVeryEffectiveFlyoutDurationTurns:     number;
    blockedFlyoutDurationTurns:              number;
    normalEffectiveFlyoutDurationTurns:      number;
    shadowPokemonAttackBonusMultiplier:      number;
    shadowPokemonDefenseBonusMultiplier:     number;
    purifiedPokemonAttackMultiplierVsShadow: number;
    combatExperiment:                        ItemIdElement[];
    showQuickSwapButtonsDuringCountdown:     boolean;
    obCombatSettingsNotPushedBool2:          boolean;
    clockSyncSettings:                       ClockSyncSettings;
    combatFeatureFlags:                      CombatFeatureFlags;
    flyinDurationTurns:                      number;
}

export interface ClockSyncSettings {
    syncAttemptCount: number;
    enabled:          boolean;
}

export type ItemIdElement = number | string;

export interface CombatFeatureFlags {
    realDeviceTimeEnabled: boolean;
}

export interface CombatStatStageSettings {
    templateId: string;
    data:       CombatStatStageSettingData;
}

export interface CombatStatStageSettingData {
    minimumStatStage:      number;
    maximumStatStage:      number;
    attackBuffMultiplier:  number[];
    defenseBuffMultiplier: number[];
}

export interface CombatMove {
    templateId: string;
    data:       CombatMoveData;
}

export interface CombatMoveData {
    uniqueId:       string;
    type:           TemplateIdElement;
    power?:         number;
    vfxName:        string;
    energyDelta?:   number;
    buffs?:         Buffs;
    durationTurns?: number;
}

export interface Buffs {
    targetDefenseStatStageChange?:   number;
    buffActivationChance?:           number;
    attackerAttackStatStageChange?:  number;
    targetAttackStatStageChange?:    number;
    attackerDefenseStatStageChange?: number;
}

export interface ContestSettings {
    templateId: string;
    data:       ContestSettingData;
}

export interface ContestSettingData {
    isFeatureEnabled:                    boolean;
    playerContestMaxEntries:             number;
    contestLimits:                       ContestLimit[];
    defaultContestMaxEntries:            number;
    minCooldownBeforeSeasonEndMs:        string;
    contestWarmupAndCooldownDurationsMs: ContestWarmupAndCooldownDurationsM[];
    defaultCycleWarmupDurationMs:        string;
    defaultCycleCooldownDurationMs:      string;
    maxCatchPromptRange:                 number;
    catchPromptTimeoutMs:                number;
    contestScoreCoefficient:             ContestScoreCoefficient[];
    contestLengthThresholds:             ContestLengthThreshold[];
    isFriendsDisplayEnabled:             boolean;
    isV2FeatureEnabled:                  boolean;
    isAnticheatRemovalEnabled:           boolean;
    isNormalizedScoreToSpecies:          boolean;
    isV2FocusesEnabled:                  boolean;
    isContestInNearbyMenu:               boolean;
    isPokemonScalarEnabled:              boolean;
}

export interface ContestLengthThreshold {
    length:        string;
    minDurationMs: string;
    maxDurationMs: string;
}

export interface ContestLimit {
    contestMetric:        ContestMetric;
    contestOccurrence:    string;
    perContestMaxEntries: number;
}

export interface ContestMetric {
    pokemonMetric:   string;
    rankingStandard: string;
}

export interface ContestScoreCoefficient {
    pokemonSize: PokemonSize;
}

export interface PokemonSize {
    heightCoefficient:   number;
    weightCoefficient:   number;
    ivCoefficient:       number;
    xxlAdjustmentFactor: number;
}

export interface ContestWarmupAndCooldownDurationsM {
    contestOccurrence:       string;
    cycleWarmupDurationMs:   string;
    cycleCooldownDurationMs: string;
}

export interface ConversationSettings {
    templateId: string;
    data:       ConversationSettingData;
}

export interface ConversationSettingData {
    pokemonFormAppraisalOverrides: PokemonFormAppraisalOverride[];
}

export interface PokemonFormAppraisalOverride {
    id:           string;
    form:         string;
    appraisalKey: string;
    addToStart:   boolean;
}

export interface CrossGameSocialSettings {
    templateId: string;
    data:       CrossGameSocialSettingData;
}

export interface CrossGameSocialSettingData {
    onlineStatusEnabledOverrideLevel:   boolean;
    nianticProfileEnabledOverrideLevel: boolean;
}

export interface DailyAdventureIncenseSettings {
    templateId: string;
    data:       DailyAdventureIncenseSettingData;
}

export interface DailyAdventureIncenseSettingData {
    enabled:                   boolean;
    pokeballGrantThreshold:    number;
    pokeballGrant:             PokeballGrant;
    localDeliveryTime:         string;
    enablePushNotification:    boolean;
    pushNotificationHourOfDay: number;
}

export interface PokeballGrant {
    lootItem: Item[];
}

export interface Item {
    item:  string;
    count: number;
}

export interface DeepLinkingSettings {
    templateId: string;
    data:       DeepLinkingSettingData;
}

export interface DeepLinkingSettingData {
    minPlayerLevelForExternalLink:     number;
    minPlayerLevelForNotificationLink: number;
    actionsThatIgnoreMinLevel:         ItemIdElement[];
    actionsThatExecuteBeforeMapLoads:  ItemIdElement[];
    iosActionButtonEnabled:            boolean;
}

export interface BattleInputBufferSettings {
    templateId: string;
    data:       BattleInputBufferSettingData;
}

export interface BattleInputBufferSettingData {
    raidsInputBufferPriorityList:  InputBufferPriorityList;
    breadInputBufferPriorityList:  InputBufferPriorityList;
    combatInputBufferPriorityList: InputBufferPriorityList;
}

export interface InputBufferPriorityList {
    eventPriority:         string[];
    priorityEventTypeList: string[];
}

export interface EggHatchImprovementsSettings {
    templateId: string;
    data:       EggHatchImprovementsSettingData;
}

export interface EggHatchImprovementsSettingData {
    featureEnabled:      boolean;
    bootDelayMs:         number;
    raidInviteHardCapMs: number;
}

export interface EncounterSettings {
    templateId: string;
    data:       EncounterSettingData;
}

export interface EncounterSettingData {
    spinBonusThreshold:          number;
    excellentThrowThreshold:     number;
    greatThrowThreshold:         number;
    niceThrowThreshold:          number;
    milestoneThreshold:          number;
    arPlusModeEnabled:           boolean;
    arCloseProximityThreshold:   number;
    arLowAwarenessThreshold:     number;
    enableItemSelectionSliderV2: boolean;
}

export interface PokemonHomeEnergyCosts {
    templateId: string;
    data:       PokemonHomeEnergyCostData;
}

export interface PokemonHomeEnergyCostData {
    pokemonClass?: PokemonClass;
    base:          number;
    shiny:         number;
    cp1001To2000:  number;
    cp2001ToInf:   number;
}

export enum PokemonClass {
    PokemonClassLegendary = "POKEMON_CLASS_LEGENDARY",
    PokemonClassMythic = "POKEMON_CLASS_MYTHIC",
    PokemonClassUltraBeast = "POKEMON_CLASS_ULTRA_BEAST",
}

export interface EventPassSettings {
    templateId: string;
    data:       EventPassSettingData;
}

export interface EventPassSettingData {
    prefix:                    string;
    pointsItemId:              string;
    trackConditions:           TrackCondition[];
    expirationTime:            Date;
    maxTierLevel:              number;
    additionalBonusTiersLevel: number;
    eventPassDisplaySettings:  EventPassDisplaySettings;
    gracePeriodEndTime:        Date;
}

export interface EventPassDisplaySettings {
    bonusBoxes:                        EventPassDisplaySettingsBonusBox[];
    eventPassTrackUpgradeDescriptions: EventPassTrackUpgradeDescription[];
    eventPassTitleKey:                 string;
    headerIconUrl:                     string;
    premiumRewardsDescription:         string;
    todayViewSection:                  string;
}

export interface EventPassDisplaySettingsBonusBox {
    text:     string;
    iconType: string;
    quantity: number;
}

export interface EventPassTrackUpgradeDescription {
    passTrackUpgradeHeaderDescription: string;
    eventPassTrackToUpgradeTo:         Track;
    trackUnlockSkuId:                  string;
    trackUnlockPlusPointsSkuId:        string;
    eventDurationKey:                  string;
    upgradeDescriptionKey:             string;
    ranksToHighlightRewards:           number[];
    detailsLinkKey:                    string;
    trackUnlockImageUrl:               string;
    trackUnlockPlusPointsImageUrl:     string;
}

export enum Track {
    Free = "FREE",
    Premium = "PREMIUM",
}

export interface TrackCondition {
    track:         Track;
    trackTitleKey: string;
    badge?:        string;
}

export interface EventPassTierSettings {
    templateId: string;
    data:       EventPassTierSettingData;
}

export interface EventPassTierSettingData {
    rank:                        number;
    track:                       Track;
    minPointsRequired?:          number;
    rewards?:                    PurpleReward[];
    bonusSettings?:              BonusSettings;
    activeBonusDisplaySettings?: ActiveBonusDisplaySettings;
}

export interface ActiveBonusDisplaySettings {
    bonusBoxes: ActiveBonusDisplaySettingsBonusBox[];
}

export interface ActiveBonusDisplaySettingsBonusBox {
    text:     string;
    iconType: IconType;
}

export enum IconType {
    Gift = "GIFT",
    Incense = "INCENSE",
    Raid = "RAID",
}

export interface BonusSettings {
    eventName:  string;
    bonusBoxes: ActiveBonusDisplaySettingsBonusBox[];
}

export interface PurpleReward {
    type:              DailyDefenderBonusCurrency;
    pokemonEncounter?: RewardPokemonEncounter;
    pokecoin?:         number;
    stardust?:         number;
    item?:             IconRewardItem;
    candy?:            Candy;
    xlCandy?:          Candy;
    exp?:              number;
    playerAttribute?:  PlayerAttribute;
}

export interface Candy {
    pokemonId: string;
    amount:    number;
}

export interface IconRewardItem {
    item:    string;
    amount?: number;
}

export interface PlayerAttribute {
    key:          string;
    durationMins: number;
}

export interface RewardPokemonEncounter {
    pokemonId:            string;
    pokemonDisplay?:      PurplePokemonDisplay;
    statsLimitsOverride?: StatsLimitsOverride;
    isFeaturedPokemon:    boolean;
}

export interface PurplePokemonDisplay {
    form:           string;
    breadModeEnum?: BreadMode;
}

export interface StatsLimitsOverride {
    minPokemonLevel: number;
    maxPokemonLevel: number;
}

export interface IapItemDisplay {
    templateId: string;
    data:       IapItemDisplayData;
}

export interface IapItemDisplayData {
    sku:                     string;
    sortOrder?:              number;
    hidden?:                 boolean;
    title?:                  string;
    description?:            string;
    skuEnableTime?:          Date;
    skuDisableTime?:         Date;
    skuEnableTimeUtcMs?:     string;
    skuDisableTimeUtcMs?:    string;
    imageUrl?:               string;
    category?:               CategoryEnum;
    spriteId?:               string;
    sale?:                   boolean;
    showDiscountTag?:        boolean;
    showStrikethroughPrice?: boolean;
    totalValue?:             number;
    maxLevel?:               number;
    webstoreSkuId?:          string;
    webstoreSkuPriceE6?:     number;
}

export enum CategoryEnum {
    IapCategoryAvatar = "IAP_CATEGORY_AVATAR",
    IapCategoryBundle = "IAP_CATEGORY_BUNDLE",
    IapCategoryFlairBundle = "IAP_CATEGORY_FLAIR_BUNDLE",
    IapCategoryFree = "IAP_CATEGORY_FREE",
    IapCategoryGlobalEventTicket = "IAP_CATEGORY_GLOBAL_EVENT_TICKET",
    IapCategoryItems = "IAP_CATEGORY_ITEMS",
    IapCategoryNone = "IAP_CATEGORY_NONE",
    IapCategoryPokecoins = "IAP_CATEGORY_POKECOINS",
    IapCategoryRewardedSpend = "IAP_CATEGORY_REWARDED_SPEND",
    IapCategorySticker = "IAP_CATEGORY_STICKER",
    IapCategoryTeamChange = "IAP_CATEGORY_TEAM_CHANGE",
    IapCategoryTransporterEnergy = "IAP_CATEGORY_TRANSPORTER_ENERGY",
    IapCategoryUpgrades = "IAP_CATEGORY_UPGRADES",
}

export interface EventPlannerPopularNotificationSettings {
    templateId: string;
    data:       EventPlannerPopularNotificationSettingData;
}

export interface EventPlannerPopularNotificationSettingData {
    scanIntervalSeconds:         string;
    firstScanOffsetSeconds:      string;
    nearbyPoiThreshold:          number;
    urbanThreshold:              number;
    ruralThreshold:              number;
    maxNotifPerDay:              number;
    notifDelayIntervalsSeconds:  string;
    timeslotBufferWindowSeconds: string;
    battleLevels:                number[];
}

export interface PlannerSettings {
    templateId: string;
    data:       PlannerSettingData;
}

export interface PlannerSettingData {
    enabled:                           boolean;
    eventSettings:                     EventSetting[];
    maxRsvpsPerTrainer:                number;
    maxRsvpInvites:                    number;
    maxPendingRsvpInvites:             number;
    nearbyRsvpTabEnabled:              boolean;
    rsvpCountPushGatewayNamespace:     string;
    sendRsvpInviteEnabled:             boolean;
    maxRsvpDisplayDistanceM:           number;
    activeReminderTimeSeconds:         number;
    rsvpCountGeoPushGatewayNamespace:  string;
    rsvpCountUpdateTimeSeconds:        number;
    rsvpCountTopperPollingTimeSeconds: number;
}

export interface EventSetting {
    timeslotGapSeconds:          number;
    rsvpTimeslotDurationSeconds: number;
    maxRsvpsPerSlot:             number;
    maxTimeslots:                number;
    rsvpClearInventoryMinutes:   number;
    messageTiming:               MessageTiming[];
    rsvpBonusTimeWindowMinutes:  number;
    rsvpInviteEnabled:           boolean;
    eventType?:                  string;
}

export interface MessageTiming {
    messageSendTime:                string;
    messageSendBeforeEventSeconds?: number;
}

export interface EvolutionChainDisplaySettings {
    templateId: string;
    data:       EvolutionChainDisplaySettingData;
}

export interface EvolutionChainDisplaySettingData {
    pokemon:          string;
    evolutionChains?: EvolutionChain[];
}

export interface EvolutionChain {
    evolutionInfos: EvolutionInfo[];
    headerMessage?: string;
}

export interface EvolutionInfo {
    pokemon: string;
    form?:   string;
    gender?: GenderRequirementEnum;
}

export enum GenderRequirementEnum {
    Female = "FEMALE",
    Genderless = "GENDERLESS",
    Male = "MALE",
}

export interface PokemonExtendedSettings {
    templateId: string;
    data:       PokemonExtendedSettingData;
}

export interface PokemonExtendedSettingData {
    uniqueId:          string;
    sizeSettings:      DataSizeSettings;
    breadOverrides?:   BreadOverride[];
    form?:             string;
    tempEvoOverrides?: PurpleTempEvoOverride[];
}

export interface BreadOverride {
    breadMode:                         BreadModeUnion;
    maxEncounterVisualSettings?:       MaxVisualSettings;
    maxBattleVisualSettings?:          MaxBattleVisualSettings;
    maxBattleTrainerVisualSettings?:   MaxBattleTrainerVisualSettings;
    maxStationVisualSettings?:         MaxStationVisualSettings;
    averageHeightM?:                   number;
    camera?:                           BreadOverrideCamera;
    modelScaleV2?:                     number;
    modelHeight?:                      number;
    maxPowerspotTopperVisualSettings?: MaxPowerspotTopperVisualSettings;
    catchOverrideSettings?:            CatchOverrideSettings;
    averageWeightKg?:                  number;
    sizeSettings?:                     BreadOverrideSizeSettings;
    maxLobbyVisualSettings?:           MaxVisualSettings;
}

export interface BreadOverrideCamera {
    cylinderRadiusM?: number;
    cylinderHeightM?: number;
    cylinderGroundM?: number;
}

export interface CatchOverrideSettings {
    collisionRadiusM:     number;
    collisionHeightM:     number;
    collisionHeadRadiusM: number;
}

export interface MaxVisualSettings {
    scale?:          number;
    cameraDistance?: number;
    maxReticleSize?: number;
    yOffset?:        number;
    cameraFov?:      number;
    xOffset?:        number;
}

export interface MaxPowerspotTopperVisualSettings {
    scale: number;
}

export interface BreadOverrideSizeSettings {
    xxsLowerBound:  number;
    xsLowerBound:   number;
    mLowerBound:    number;
    mUpperBound:    number;
    xlUpperBound:   number;
    xxlUpperBound?: number;
}

export interface DataSizeSettings {
    xxsLowerBound:                        number;
    xsLowerBound:                         number;
    mLowerBound:                          number;
    mUpperBound:                          number;
    xlUpperBound:                         number;
    xxlUpperBound:                        number;
    disablePokedexRecordDisplayForForms?: boolean;
    xxsScaleMultiplier?:                  number;
    xsScaleMultiplier?:                   number;
    xlScaleMultiplier?:                   number;
    xxlScaleMultiplier?:                  number;
}

export interface PurpleTempEvoOverride {
    tempEvoId:    Temp;
    sizeSettings: BreadOverrideSizeSettings;
}

export enum Temp {
    TempEvolutionMega = "TEMP_EVOLUTION_MEGA",
    TempEvolutionMegaX = "TEMP_EVOLUTION_MEGA_X",
    TempEvolutionMegaY = "TEMP_EVOLUTION_MEGA_Y",
    TempEvolutionPrimal = "TEMP_EVOLUTION_PRIMAL",
}

export interface ExternalAddressableAssetsSettings {
    templateId: string;
    data:       FastAttackSettingsClass;
}

export interface FastAttackSettingsClass {
}

export interface FeatureUnlockLevelSettings {
    templateId: string;
    data:       FeatureUnlockLevelSettingData;
}

export interface FeatureUnlockLevelSettingData {
    luresUnlockLevel:               number;
    rareCandyConversionUnlockLevel: number;
}

export interface FormSettings {
    templateId: string;
    data:       FormSettingData;
}

export interface FormSettingData {
    pokemon: string;
    forms?:  Form[];
}

export interface Form {
    form:                        string;
    assetBundleSuffix?:          string;
    isCostume?:                  boolean;
    assetBundleValue?:           number;
    sillouetteObfuscationGroup?: SillouetteObfuscationGroup;
}

export interface SillouetteObfuscationGroup {
    groupNumber:         number;
    overrideDisplayForm: string;
}

export interface FortPowerUpLevelSettings {
    templateId: string;
    data:       FortPowerUpLevelSettingData;
}

export interface FortPowerUpLevelSettingData {
    level:                             string;
    minPowerUpPointsRequired?:         number;
    powerupLevelRewards?:              string[];
    additionalLevelPowerupDurationMs?: number;
}

export interface FriendshipMilestoneSettings {
    templateId: string;
    data:       FriendshipMilestoneSettingData;
}

export interface FriendshipMilestoneSettingData {
    milestoneXpReward:              number;
    attackBonusPercentage:          number;
    unlockedTrading:                string[];
    minPointsToReach?:              number;
    raidBallBonus?:                 number;
    tradingDiscount?:               number;
    unlockedLuckyFriendApplicator?: boolean;
    relativePointsToReach?:         number;
}

export interface ItemSettings {
    templateId: string;
    data:       ItemSettingData;
}

export interface ItemSettingData {
    itemId:                ItemIdElement;
    itemType:              ItemIdElement;
    category:              ItemIdElement;
    dropTrainerLevel?:     number;
    ignoreInventorySpace?: boolean;
    itemCap?:              number;
    globalEventTicket?:    GlobalEventTicket;
    food?:                 Food;
    eventPassPoint?:       EventPassPoint;
    timePeriodCounters?:   TimePeriodCounters;
    nameOverride?:         string;
    descriptionOverride?:  string;
    incidentTicket?:       IncidentTicket;
    potion?:               Potion;
    incense?:              Incense;
    eggIncubator?:         EggIncubator;
    hideItemInInventory?:  boolean;
    inventoryUpgrade?:     InventoryUpgrade;
    xpBoost?:              XpBoost;
    revive?:               Revive;
    replenishMp?:          ReplenishMp;
    statIncrease?:         StatIncrease;
    stardustBoost?:        StardustBoost;
}

export interface EggIncubator {
    incubatorType:                string;
    uses?:                        number;
    distanceMultiplier:           number;
    expiredIncubatorReplacement?: ExpiredIncubatorReplacement;
    useBonusIncubatorAttributes?: boolean;
    maxHatchSummaryEntries?:      number;
}

export interface ExpiredIncubatorReplacement {
    incubatorReplacement: string;
    usesCountOverride:    number;
}

export interface EventPassPoint {
    eventPassId: string;
}

export interface Food {
    itemEffect?:              string[];
    itemEffectPercent?:       number[];
    growthPercent?:           number;
    berryMultiplier?:         number;
    remoteBerryMultiplier?:   number;
    numBuddyAffectionPoints?: number;
    mapDurationMs?:           string;
    timeFullDurationMs?:      string;
    numBuddyHungerPoints?:    number;
}

export interface GlobalEventTicket {
    eventStartTime:            Date;
    eventEndTime:              Date;
    itemBagDescriptionKey:     string;
    eventBannerUrl?:           string;
    clientEventStartTimeUtcMs: string;
    clientEventEndTimeUtcMs:   string;
    giftable?:                 boolean;
    giftItem?:                 string;
    displayV2Enabled?:         boolean;
    backgroundImageUrl?:       string;
    eventDatetimeRangeKey?:    string;
    textRewardsKey?:           string;
    iconRewards?:              IconReward[];
    detailsLinkKey?:           string;
    ticketItem?:               string;
    titleImageUrl?:            string;
}

export interface IconReward {
    type:                       DailyDefenderBonusCurrency;
    exp?:                       number;
    stardust?:                  number;
    pokemonEncounter?:          IconRewardPokemonEncounter;
    item?:                      IconRewardItem;
    neutralAvatarItemTemplate?: NeutralAvatarItemTemplate;
    candy?:                     Candy;
    pokecoin?:                  number;
}

export interface IconRewardPokemonEncounter {
    pokemonId:       string;
    pokemonDisplay?: FluffyPokemonDisplay;
}

export interface FluffyPokemonDisplay {
    form?:    string;
    costume?: string;
    shiny?:   boolean;
}

export interface Incense {
    incenseLifetimeSeconds: number;
    spawnTableProbability?: number;
}

export interface IncidentTicket {
    ignoreFullInventory?:     boolean;
    upgradeRequirementCount?: number;
    upgradedItem?:            string;
}

export interface InventoryUpgrade {
    additionalStorage: number;
    upgradeType:       string;
}

export interface Potion {
    staAmount?:  number;
    staPercent?: number;
}

export interface ReplenishMp {
    mpAmount: number;
}

export interface Revive {
    staPercent: number;
}

export interface StardustBoost {
    stardustMultiplier: number;
    boostDurationMs:    number;
}

export interface StatIncrease {
    statsToIncreaseLimit: number;
}

export interface TimePeriodCounters {
    playerActivity: PlayerActivity;
}

export interface PlayerActivity {
    limit: number;
}

export interface XpBoost {
    xpMultiplier:    number;
    boostDurationMs: number;
}

export interface GeotargetedQuestSettings {
    templateId: string;
    data:       GeotargetedQuestSettingData;
}

export interface GeotargetedQuestSettingData {
    enableGeotargetedQuests: boolean;
}

export interface GiftingSettings {
    templateId: string;
    data:       GiftingSettingData;
}

export interface GiftingSettingData {
    enableGiftToStardust: boolean;
    stardustPerGift:      number;
    stardustMultiplier:   StardustMultiplier[];
}

export interface StardustMultiplier {
    multiplier:   number;
    randomWeight: number;
}

export interface GuiSearchSettings {
    templateId: string;
    data:       GuiSearchSettingData;
}

export interface GuiSearchSettingData {
    guiSearchEnabled:                    boolean;
    maxNumberRecentSearches:             number;
    maxNumberFavoriteSearches:           number;
    maxQueryLength:                      number;
    searchHelpUrl:                       string;
    completeStartLetterCountPerLanguage: string[];
}

export interface GymBadgeSettings {
    templateId: string;
    data:       GymBadgeSettingData;
}

export interface GymBadgeSettingData {
    target:                          number[];
    battleWinningScorePerDefenderCp: number;
    gymDefendingScorePerMinute:      number;
    berryFeedingScore:               number;
    pokemonDeployScore:              number;
    raidBattleWinningScore:          number;
    loseAllBattlesScore:             number;
}

export interface HapticsSettings {
    templateId: string;
    data:       HapticsSettingData;
}

export interface HapticsSettingData {
    advancedHapticsEnabled: boolean;
}

export interface LanguageSettings {
    templateId: string;
    data:       LanguageSettingData;
}

export interface LanguageSettingData {
    language:  string;
    isEnabled: boolean;
}

export interface IapCategoryDisplay {
    templateId: CategoryEnum;
    data:       IapCategoryDisplayData;
}

export interface IapCategoryDisplayData {
    category?:      PurpleCategory;
    sortOrder?:     number;
    imageUrl?:      string;
    description?:   string;
    bannerEnabled?: boolean;
    bannerTitle?:   string;
    hidden?:        boolean;
    name?:          string;
    displayRows?:   number;
}

export type PurpleCategory = CategoryEnum | number;

export interface IapSettings {
    templateId: string;
    data:       IapSettingData;
}

export interface IapSettingData {
    dailyDefenderBonusPerPokemon:     number[];
    dailyDefenderBonusMaxDefenders:   number;
    dailyDefenderBonusCurrency:       DailyDefenderBonusCurrency[];
    minTimeBetweenClaimsMs:           string;
    prohibitPurchaseInTestEnvirnment: boolean;
}

export interface IbfcLightweightSettings {
    templateId: string;
    data:       IbfcLightweightSettingData;
}

export interface IbfcLightweightSettingData {
    defaultDefenseMultiplier:    number;
    defaultDefenseOverride:      number;
    defaultStaminaOverride:      number;
    defaultEnergyChargeOverride: number;
}

export interface IncidentPrioritySettings {
    templateId: string;
    data:       IncidentPrioritySettingData;
}

export interface IncidentPrioritySettingData {
    incidentPriority: IncidentPriority[];
}

export interface IncidentPriority {
    priority:    number;
    displayType: string;
}

export interface IncidentVisibilitySettings {
    templateId: string;
    data:       IncidentVisibilitySettingData;
}

export interface IncidentVisibilitySettingData {
    hideIncidentForCharacter: string[];
}

export interface PokestopInvasionAvailabilitySettings {
    templateId: string;
    data:       PokestopInvasionAvailabilitySettingData;
}

export interface PokestopInvasionAvailabilitySettingData {
    availabilityStartMinute: string;
    availabilityEndMinute:   string;
}

export interface InventorySettings {
    templateId: string;
    data:       InventorySettingData;
}

export interface InventorySettingData {
    maxPokemon:                                 number;
    maxBagItems:                                number;
    basePokemon:                                number;
    baseBagItems:                               number;
    baseEggs:                                   number;
    maxTeamChanges:                             number;
    teamChangeItemResetPeriodInDays:            string;
    maxItemBoostDurationMs:                     string;
    enableEggsNotInventory:                     boolean;
    specialEggOverflowSpots:                    number;
    canRaidPassOverflowBagSpace:                boolean;
    basePostcards:                              number;
    maxPostcards:                               number;
    maxStoneACount:                             number;
    bagUpgradeBannerEnabled:                    boolean;
    bagUpgradeTimerStages:                      BagUpgradeTimerStage[];
    bagUpgradeBannerContexts:                   string[];
    easyIncubatorBuyEnabled:                    boolean;
    luckyFriendApplicatorSettingsToggleEnabled: boolean;
    baseDailyAdventureEggs:                     number;
}

export interface BagUpgradeTimerStage {
    dismissStageSecs: number;
}

export interface IrisSocialSettings {
    templateId: string;
    data:       IrisSocialSettingData;
}

export interface IrisSocialSettingData {
    maxNumPokemonPerPlayer:                 number;
    maxNumPokemonPerScene:                  number;
    pokemonExpireAfterMs:                   string;
    bannedPokedexIds:                       string[];
    minBoundaryAreaSqMeters:                number;
    maxBoundaryAreaSqMeters:                number;
    pushGatewayEnabled:                     boolean;
    useBoundaryVerticesFromDataFlow:        boolean;
    irisSocialEnabled:                      boolean;
    maxTimeBgModeBeforeExpulsionMs:         string;
    maxDistanceAllowLocalizationMeters:     string;
    maxTimeNoActivityPlayerInactiveMs:      string;
    limitedPokedexIds:                      string[];
    pokemonSpawnStaggerDurationMs:          string;
    useVpsEnabledStatus:                    boolean;
    sunThresholdCheckEnabled:               boolean;
    sunriseThresholdOffsetMs:               string;
    sunsetThresholdOffsetMs:                string;
    irisSocialPoiDeactivationCooldownMs:    string;
    combinedShadowsEnabled:                 boolean;
    ftueVersion:                            string;
    expressionUpdateBroadcastMethod:        string;
    localizationGuidancePathEnabled:        boolean;
    groundFocusGuardrailEnabled:            boolean;
    groundFocusGuardrailEnterAngle:         number;
    groundFocusGuardrailExitAngle:          number;
    localizationTimeoutDurationMs:          string;
    limitedLocalizationTimeoutDurationMs:   string;
    pokeballPingTimeDelayMs:                number;
    addPokemonModalDelayMs:                 number;
    guidancePathNearbyFinishDelayMs:        number;
    guidancePathNearbyFinishDistanceMeters: number;
    guidanceInCarThreshold:                 number;
    locationManagerJpegCompressionQuality:  number;
    gameplayReportsActive:                  boolean;
    enableSqcGuidance:                      boolean;
}

export interface IrisSocialUxFunnelSettings {
    templateId: string;
    data:       IrisSocialUxFunnelSettingData;
}

export interface IrisSocialUxFunnelSettingData {
    uxFunnelVersion: number;
    eventStep:       EventStep[];
}

export interface EventStep {
    stepNumber: number;
    event:      ItemIdElement;
}

export interface ItemExpirationSettings {
    templateId: string;
    data:       ItemExpirationSettingData;
}

export interface ItemExpirationSettingData {
    item:                     string;
    expirationTime:           Date;
    emergencyExpirationTime?: Date;
    consolationItems?:        ConsolationItems;
    itemEnablementSettings?:  ItemEnablementSettings;
}

export interface ConsolationItems {
    lootItem: LootItem[];
}

export interface LootItem {
    stardust: boolean;
    count:    number;
}

export interface ItemEnablementSettings {
    enabledTimePeriods: EnabledTimePeriod[];
}

export interface EnabledTimePeriod {
    enabledStartTime: Date;
    enabledEndTime:   Date;
}

export interface ItemInventoryUpdateSettings {
    templateId: string;
    data:       ItemInventoryUpdateSettingData;
}

export interface ItemInventoryUpdateSettingData {
    categoryProto: CategoryProto[];
}

export interface CategoryProto {
    category:     ItemIdElement[];
    categoryName: string;
    sortOrder?:   number;
}

export interface JoinRaidViaFriendListSettings {
    templateId: string;
    data:       JoinRaidViaFriendListSettingData;
}

export interface JoinRaidViaFriendListSettingData {
    enabled:                                  boolean;
    minPlayerLevel:                           number;
    minFriendshipScore:                       number;
    friendActivitiesBackgroundUpdatePeriodMs: string;
    maxBattleEnabled:                         boolean;
    maxBattleMinPlayerLevel:                  number;
    maxBattleMinFriendshipScore:              number;
}

export interface LanguageSelectorSettings {
    templateId: string;
    data:       LanguageSelectorSettingData;
}

export interface LanguageSelectorSettingData {
    languageSelectorEnabled: boolean;
}

export interface LocationCardSettings {
    templateId: string;
    data:       LocationCardSettingData;
}

export interface LocationCardSettingData {
    locationCard: ItemIdElement;
    imageUrl:     string;
    cardType?:    CardType;
    vfxAddress?:  string;
}

export enum CardType {
    LocationCard = "LOCATION_CARD",
    SpecialBackground = "SPECIAL_BACKGROUND",
}

export interface ClientQuestTemplate {
    templateId: string;
    data:       ClientQuestTemplateData;
}

export interface ClientQuestTemplateData {
    quest:        Quest;
    questDisplay: DataQuestDisplay;
}

export interface Quest {
    questType:    string;
    multiPart?:   MultiPart;
    questId:      string;
    questContext: QuestContext;
    templateId:   string;
    questRewards: QuestReward[];
    goal?:        QuestGoal;
    difficulty?:  string;
}

export interface QuestGoal {
    condition?: FluffyCondition[];
    target:     number;
}

export interface FluffyCondition {
    type:                   string;
    withBadgeType?:         WithBadgeType;
    withThrowType?:         WithThrowType;
    withPokemonLevel?:      WithPokemonLevel;
    withQuestContext?:      WithQuestContext;
    withInvasionCharacter?: WithInvasionCharacter;
    withCombatType?:        WithCombatType;
    withDistance?:          WithDistance;
}

export interface WithBadgeType {
    badgeRank:           number;
    badgeTypesToExclude: BadgeTypesToExclude[];
}

export enum BadgeTypesToExclude {
    BadgeMiniCollection = "BADGE_MINI_COLLECTION",
}

export interface WithDistance {
    distanceKm: number;
}

export interface WithInvasionCharacter {
    category: string[];
}

export interface WithPokemonLevel {
    maxLevel: boolean;
}

export interface WithQuestContext {
    context: string;
}

export interface MultiPart {
    subQuests: Sub[];
}

export interface Sub {
    questId: string;
}

export enum QuestContext {
    LevelUpQuest = "LEVEL_UP_QUEST",
    WeeklyChallengeQuest = "WEEKLY_CHALLENGE_QUEST",
}

export interface QuestReward {
    type:              QuestRewardType;
    levelCap?:         number;
    exp?:              number;
    stardust?:         number;
    friendshipPoints?: number;
    pokemonEncounter?: PokemonEncounterClass;
}

export interface PokemonEncounterClass {
    pokemonId:      string;
    pokemonDisplay: PokemonPokemonDisplay;
}

export interface PokemonPokemonDisplay {
    form: string;
}

export enum QuestRewardType {
    Experience = "EXPERIENCE",
    FriendshipPoints = "FRIENDSHIP_POINTS",
    LevelCap = "LEVEL_CAP",
    PokemonEncounter = "POKEMON_ENCOUNTER",
    Stardust = "STARDUST",
}

export interface DataQuestDisplay {
    title:             string;
    subquestDisplays?: Sub[];
    description?:      string;
}

export interface LimitedPurchaseSkuSettings {
    templateId: string;
    data:       LimitedPurchaseSkuSettingData;
}

export interface LimitedPurchaseSkuSettingData {
    purchaseLimit:  number;
    version?:       number;
    chronoUnit?:    string;
    lootTableId?:   string;
    resetInterval?: number;
}

export interface LuckyPokemonSettings {
    templateId: string;
    data:       LuckyPokemonSettingData;
}

export interface LuckyPokemonSettingData {
    powerUpStardustDiscountPercent: number;
}

export interface MainMenuChanges {
    templateId: string;
    data:       AdditiveSceneSettingData;
}

export interface MapDisplaySettings {
    templateId: string;
    data:       MapDisplaySettingData;
}

export interface MapDisplaySettingData {
    showEnhancedSky: boolean;
}

export interface MapObjectsInteractionRangeSettings {
    templateId: string;
    data:       MapObjectsInteractionRangeSettingData;
}

export interface MapObjectsInteractionRangeSettingData {
    interactionRangeMeters:       number;
    farInteractionRangeMeters:    number;
    remoteInteractionRangeMeters: number;
    whitePulseRadiusMeters:       number;
}

export interface MegaEvoLevelSettings {
    templateId: string;
    data:       MegaEvoLevelSettingData;
}

export interface MegaEvoLevelSettingData {
    progression: Progression;
    cooldown:    Cooldown;
    effects:     Effects;
    pokemonId?:  string;
    level?:      number;
}

export interface Cooldown {
    durationMs:              string;
    bypassCostInitial:       number;
    bypassCostRoundingValue: number;
}

export interface Effects {
    differentTypeAttackBoost:         number;
    sameTypeAttackBoost:              number;
    sameTypeExtraCatchCandy:          number;
    sameTypeExtraCatchXp?:            number;
    sameTypeExtraCatchCandyXlChance?: number;
}

export interface Progression {
    pointsLimitPerPeriod:   number;
    pointsPerMegaEvoAction: number;
    pointsRequired?:        number;
}

export interface MegaEvoSettings {
    templateId: string;
    data:       MegaEvoSettingData;
}

export interface MegaEvoSettingData {
    evolutionLengthMs:                 string;
    attackBoostFromMegaDifferentType:  number;
    attackBoostFromMegaSameType:       number;
    maxCandyHoardSize:                 number;
    enableBuddyWalkingMegaEnergyAward: boolean;
    activeMegaBonusCatchCandy:         number;
    enableMegaLevel:                   boolean;
    enableMegaEvolveInLobby:           boolean;
    numMegaLevels:                     number;
    clientMegaCooldownBufferMs:        number;
    enableMegaLevelLegacyAward:        boolean;
}

export interface MonodepthSettings {
    templateId: string;
    data:       MonodepthSettingData;
}

export interface MonodepthSettingData {
    enableOcclusions:           boolean;
    occlusionsToggleVisible:    boolean;
    enableGroundSuppression:    boolean;
    minGroundSuppressionThresh: number;
    suppressionChannelId:       number;
}

export interface MpSettings {
    templateId: string;
    data:       MpSettingData;
}

export interface MpSettingData {
    numMpFromWalkQuest:             number;
    numMetersGoal:                  number;
    debugAllowRemoveWalkQuest:      boolean;
    numMpFromLootStation:           number;
    numExtraMpFromFirstLootStation: number;
    mpCapacity:                     number;
    mpBaseDailyLimit:               number;
    mpClaimParticleSpeedMultiplier: number;
    battleMpCostPerTier:            BattleMpCostPerTier[];
    ftueMpCapacity:                 number;
}

export interface BattleMpCostPerTier {
    breadBattleCatchMpCost:       number;
    battleLevel:                  ItemIdElement;
    breadBattleRemoteCatchMpCost: number;
}

export interface NearbyPokemonSettings {
    templateId: string;
    data:       NearbyPokemonSettingData;
}

export interface NearbyPokemonSettingData {
    obEnabled:                    boolean;
    obNearbyPokemonSettingsBool1: boolean;
}

export interface NeutralAvatarSettings {
    templateId: string;
    data:       NeutralAvatarSettingData;
}

export interface NeutralAvatarSettingData {
    neutralAvatarSettingsEnabled:       boolean;
    neutralAvatarSettingsSentinelValue: number;
    defaultNeutralAvatar:               NeutralAvatar;
    femaleNeutralAvatar:                FemaleNeutralAvatar;
    maleNeutralAvatar:                  NeutralAvatar;
    bodySliderSettings:                 BodySliderSettings;
    neutralAvatarLegacyMappingVersion:  number;
    obMoveSettingsNumber101:            boolean;
    obMoveSettingsNumber120:            boolean;
    obMoveSettingsNumber123:            boolean;
    obMoveSettingsNumber124:            boolean;
}

export interface BodySliderSettings {
    sizeSlider:     SizeSlider;
    muscleSlider:   Slider;
    hipsSlider:     Slider;
    shoulderSlider: Slider;
    bustSlider:     Slider;
}

export interface Slider {
    maxBounds: number;
}

export interface SizeSlider {
    maxBounds: number;
    minBounds: number;
}

export interface NeutralAvatar {
    articles:       { [key: string]: Article };
    bodyBlend:      DefaultNeutralAvatarBodyBlend;
    headSelection:  Selection;
    skinGradient:   Gradient;
    hairGradient:   Gradient;
    noseSelection:  Selection;
    earSelection:   Selection;
    mouthSelection: Selection;
    facePositions:  { [key: string]: number };
    eyeGradient:    Gradient;
    eyeSelection:   Selection;
}

export interface Article {
    articleId: string;
}

export interface DefaultNeutralAvatarBodyBlend {
    size:        number;
    musculature: number;
    hips:        number;
    shoulders:   number;
}

export interface Selection {
    selection: string;
}

export interface Gradient {
    colorKeys: ColorKey[];
}

export interface ColorKey {
    keyPosition?: number;
    red?:         number;
    green?:       number;
    blue?:        number;
}

export interface FemaleNeutralAvatar {
    articles:       { [key: string]: Article };
    bodyBlend:      FemaleNeutralAvatarBodyBlend;
    headSelection:  Selection;
    skinGradient:   Gradient;
    hairGradient:   Gradient;
    noseSelection:  Selection;
    earSelection:   Selection;
    mouthSelection: Selection;
    facePositions:  { [key: string]: number };
    eyeGradient:    Gradient;
    eyeSelection:   Selection;
}

export interface FemaleNeutralAvatarBodyBlend {
    bust: number;
    hips: number;
}

export interface NonCombatMoveSettings {
    templateId: string;
    data:       NonCombatMoveSettingData;
}

export interface NonCombatMoveSettingData {
    uniqueId:            string;
    cost:                Cost;
    bonusEffect:         BonusEffect;
    durationMs:          string;
    bonusType:           string;
    enableMultiUse:      boolean;
    extraDurationMs:     string;
    enableNonCombatMove: boolean;
}

export interface BonusEffect {
    spaceBonus?:         SpaceBonus;
    timeBonus?:          TimeBonus;
    dayNightBonus?:      DayNightBonus;
    slowFreezeBonus?:    SlowFreezeBonus;
    attackDefenseBonus?: AttackDefenseBonus;
    maxMoveBonus?:       MaxMoveBonus;
}

export interface AttackDefenseBonus {
    attributes: Attribute[];
}

export interface Attribute {
    combatTypes:        string[];
    attackMultiplier?:  number;
    defenseMultiplier?: number;
}

export interface DayNightBonus {
    incenseItem: string;
}

export interface MaxMoveBonus {
    excludedPokedexIds:         string[];
    numAllMaxMoveLevelIncrease: number;
}

export interface SlowFreezeBonus {
    catchCircleTimeScaleOverride:      number;
    catchRateIncreaseMultiplier:       number;
    catchCircleSpeedChangeThreshold:   number;
    catchCircleOuterTimeScaleOverride: number;
}

export interface SpaceBonus {
    pokemonVisibleRangeMeters:           number;
    encounterRangeMeters:                number;
    serverAllowableEncounterRangeMeters: number;
}

export interface TimeBonus {
    affectedItems: string[];
}

export interface Cost {
    candyCost:    number;
    stardustCost: number;
}

export interface AvatarItemDisplay {
    templateId: string;
    data:       AvatarItemDisplayData;
}

export interface AvatarItemDisplayData {
    iconAddress:      string;
    displayStringId?: string;
}

export interface OnboardingSettings {
    templateId: string;
    data:       OnboardingSettingData;
}

export interface OnboardingSettingData {
    disableInitialArPrompt:  boolean;
    arPromptPlayerLevel:     number;
    adventureSyncPromptStep: number;
}

export interface OptimizationsProto {
    templateId: string;
    data:       OptimizationsProtoData;
}

export interface OptimizationsProtoData {
    optimizationPhysicsToggleEnabled:      boolean;
    adaptivePerformanceUpdateInterval:     number;
    adaptivePerformanceMinResolutionScale: number;
}

export interface PartyDarkLaunchSettings {
    templateId: string;
    data:       PartyDarkLaunchSettingData;
}

export interface PartyDarkLaunchSettingData {
    rolloutPlayersPerBillion:       number;
    createOrJoinWaitProbability:    CreateOrJoinWaitProbability[];
    probabilityToCreatePercent:     number;
    leavePartyProbablity:           LeavePartyProbablity[];
    updateLocationEnabled:          boolean;
    updateLocationOverridePeriodMs: number;
}

export interface CreateOrJoinWaitProbability {
    weight:     number;
    waitTimeMs: number;
}

export interface LeavePartyProbablity {
    weight:        number;
    maxDurationMs: number;
}

export interface PartyPlayGeneralSettings {
    templateId: string;
    data:       PartyPlayGeneralSettingData;
}

export interface PartyPlayGeneralSettingData {
    enabled:                             boolean;
    minPlayerLevel:                      number;
    creationToStartTimeoutMs?:           string;
    complianceZonesEnabled?:             boolean;
    enablePartyRaidInformation?:         boolean;
    friendRequestsEnabled:               boolean;
    partyExpiryDurationMs?:              string;
    partyExpiryWarningMinutes?:          number;
    enabledFriendStatusIncrease?:        boolean;
    restartPartyRejoinPromptEnabled?:    boolean;
    partyIapBoostsEnabled?:              boolean;
    partyNewQuestNotificationV2Enabled?: boolean;
    pgDeliveryMechanic?:                 string;
    partyCatchTagsEnabled?:              boolean;
    partyQuestEncounterRewardEnabled?:   boolean;
    maxStackedEncounterReward?:          number;
    fallbackPartyQuestEnabled:           boolean;
    maxPartySize?:                       number;
    partySchedulingSettings?:            PartySchedulingSettings;
    sendInviteEnabled?:                  boolean;
    inviteExpirationMs?:                 number;
    notificationMilestones?:             number[];
    matchmakingEnabled?:                 boolean;
    partyRewardGracePeriodMs?:           string;
    maxInvitesPerPlayer?:                number;
}

export interface PartySchedulingSettings {
    recurringChallengeSchedule: RecurringChallengeSchedule;
}

export interface RecurringChallengeSchedule {
    timezoneId:              string;
    dayAndTimeStartTime:     Time;
    dayAndTimeEndTime:       Time;
    startNotification:       Notification;
    nearEndNotification:     Notification;
    maxNumChallengePerCycle: number;
}

export interface Time {
    dayOfWeek: number;
    hourOfDay: number;
}

export interface Notification {
    enabled:             boolean;
    isLocal:             boolean;
    time:                Time;
    avalibleWindowHours: number;
}

export interface PartyIapBoostsSettings {
    templateId: string;
    data:       PartyIapBoostsSettingData;
}

export interface PartyIapBoostsSettingData {
    boost: Boost[];
}

export interface Boost {
    supportedItemTypes:     string;
    durationMultiplier:     number;
    dailyContributionLimit: number;
}

export interface PartyRecommendationSettings {
    templateId: string;
    data:       PartyRecommendationSettingData;
}

export interface PartyRecommendationSettingData {
    mode:                     string;
    variance:                 number;
    thirdMoveWeight:          number;
    megaEvoCombatRatingScale: number;
}

export interface PhotoSettings {
    templateId: string;
    data:       PhotoSettingData;
}

export interface PhotoSettingData {
    screenCaptureSize: number;
    isIrisEnabled:     boolean;
    irisFlags:         number;
    bannerImageUrl:    string[];
}

export interface PhotoSetsSettingsProto {
    templateId: string;
    data:       PhotoSetsSettingsProtoData;
}

export interface PhotoSetsSettingsProtoData {
    nameKey:        string;
    frameColor:     string;
    minimumPokemon: number;
    pokemon:        DataPokemon[];
    displayOrder:   number;
}

export interface DataPokemon {
    pokemonId: string;
    form?:     string;
}

export interface PlayerBonusSystemSettings {
    templateId: string;
    data:       PlayerBonusSystemSettingData;
}

export interface PlayerBonusSystemSettingData {
    maxBonusDurationMs: string;
    dayNightEvoEnabled: boolean;
}

export interface PlayerLevel {
    templateId: string;
    data:       PlayerLevelData;
}

export interface PlayerLevelData {
    rankNum:                      number[];
    requiredExperience:           number[];
    cpMultiplier:                 number[];
    maxEggPlayerLevel:            number;
    maxEncounterPlayerLevel:      number;
    maxQuestEncounterPlayerLevel: number;
    extendedPlayerLevelThreshold: number;
    levelUpScreenV3Enabled:       boolean;
    milestoneLevels:              number[];
    levelRequirementsV2Enabled:   boolean;
    xpRewardV2Enabled:            boolean;
    xpRewardV2Thresholds:         XpRewardV2Thresholds;
    smoreFtueImageUrl:            string;
}

export interface XpRewardV2Thresholds {
    source:    string;
    threshold: number;
}

export interface PokeballThrowPropertySettings {
    templateId: string;
    data:       PokeballThrowPropertySettingData;
}

export interface PokeballThrowPropertySettingData {
    throwProperties: ThrowProperty[];
}

export interface ThrowProperty {
    throwProertiesCategory:       string;
    minSpinParticleAmount:        number;
    maxAngularVelocity:           number;
    dragSnapSpeed:                number;
    overshootCorrection:          number;
    undershootCorrection:         number;
    minLaunchAngle:               number;
    maxLaunchAngle:               number;
    maxLaunchAngleHeight:         number;
    maxLaunchSpeed:               number;
    launchSpeedThreshold:         number;
    flyTimeoutDuration:           number;
    belowGroundFlyTimeoutSeconds: number;
    curveballModifier:            CurveballModifier;
    launchVelocityMultiplier:     LaunchVelocityMultiplier;
}

export interface CurveballModifier {
    x: number;
    y: number;
    z: number;
}

export interface LaunchVelocityMultiplier {
    x: number;
    y: number;
}

export interface PokecoinPurchaseDisplayGmt {
    templateId: string;
    data:       PokecoinPurchaseDisplayGmtData;
}

export interface PokecoinPurchaseDisplayGmtData {
    featureEnabled: boolean;
}

export interface Pokedexv2FeatureFlags {
    templateId: string;
    data:       Pokedexv2FeatureFlagData;
}

export interface Pokedexv2FeatureFlagData {
    isFeatureEnabled: boolean;
    navigationFlag:   number;
    detailV1Flag:     number;
    detailBattleFlag: number;
    celebV1Flag:      number;
    notificationFlag: number;
}

export interface PokedexCategoriesSettings {
    templateId: string;
    data:       PokedexCategoriesSettingData;
}

export interface PokedexCategoriesSettingData {
    featureEnabled:                 boolean;
    pokedexCategorySettingsInOrder: PokedexCategorySettingsInOrder[];
    clientShinyFormCheck:           boolean;
    searchEnabled:                  boolean;
    showDexAfterNewFormEnabled:     boolean;
    showShinyDexCelebrationEnabled: boolean;
}

export interface PokedexCategorySettingsInOrder {
    pokedexCategory: ItemIdElement;
    milestoneGoal:   number;
    visuallyHidden?: boolean;
}

export interface PokedexSizeStatsSystemSettings {
    templateId: string;
    data:       PokedexSizeStatsSystemSettingData;
}

export interface PokedexSizeStatsSystemSettingData {
    displayEnabled:                                boolean;
    pokedexDisplayPokemonTrackedThreshold:         number;
    recordDisplayPokemonTrackedThreshold:          number;
    numDaysNewBubbleTrack:                         number;
    enableRandomizedHeightAndWeightForWildPokemon: boolean;
}

export interface PokedexV2Settings {
    templateId: string;
    data:       PokedexV2SettingData;
}

export interface PokedexV2SettingData {
    maxTrackedPokemon:    number;
    pokemonAlertExcluded: string[];
}

export interface PokemonFxSettings {
    templateId: string;
    data:       PokemonFxSettingData;
}

export interface PokemonFxSettingData {
    hidingInPhoto: boolean;
}

export interface PokemonHomeSettings {
    templateId: string;
    data:       PokemonHomeSettingData;
}

export interface PokemonHomeSettingData {
    playerMinLevel:               number;
    transporterMaxEnergy:         number;
    energySkuId:                  string;
    transporterEnergyGainPerHour: number;
}

export interface PokemonScaleSettings {
    templateId: string;
    data:       PokemonScaleSettingData;
}

export interface PokemonScaleSettingData {
    pokemonScaleMode?: string;
    minHeight:         number;
    maxHeight:         number;
}

export interface PokemonTagSettings {
    templateId: string;
    data:       PokemonTagSettingData;
}

export interface PokemonTagSettingData {
    minPlayerLevelForPokemonTagging: number;
    colorBinding:                    ColorBinding[];
    maxNumTagsAllowed:               number;
}

export interface ColorBinding {
    color:   string;
    hexCode: string;
}

export interface TypeEffective {
    templateId: TemplateIdElement;
    data:       TypeEffectiveData;
}

export interface TypeEffectiveData {
    attackScalar: number[];
    attackType:   TemplateIdElement;
}

export interface PokemonUpgrades {
    templateId: string;
    data:       PokemonUpgradeData;
}

export interface PokemonUpgradeData {
    upgradesPerLevel:              number;
    allowedLevelsAbovePlayer:      number;
    candyCost:                     number[];
    stardustCost:                  number[];
    shadowStardustMultiplier:      number;
    shadowCandyMultiplier:         number;
    purifiedStardustMultiplier:    number;
    purifiedCandyMultiplier:       number;
    maxNormalUpgradeLevel:         number;
    defaultCpBoostAdditionalLevel: number;
    xlCandyMinPlayerLevel:         number;
    xlCandyCost:                   number[];
    xlCandyMinPokemonLevel:        number;
}

export interface PopupControlSettings {
    templateId: string;
    data:       PopupControlSettingData;
}

export interface PopupControlSettingData {
    hideMedalEarnedPopupUnitAfterFirstPokemon: boolean;
    hideAwareOfYourSurroundingsPopup:          boolean;
    hideWeatherWarningPopup:                   boolean;
}

export interface PostcardCollectionSettings {
    templateId: string;
    data:       AdditiveSceneSettingData;
}

export interface PowerUpPokestopsSettings {
    templateId: string;
    data:       PowerUpPokestopsSettingData;
}

export interface PowerUpPokestopsSettingData {
    powerUpPokestopsMinPlayerLevel:      number;
    validatePokestopOnFortSearchPercent: number;
}

export interface PrimalEvoSettings {
    templateId: string;
    data:       PrimalEvoSettingData;
}

export interface PrimalEvoSettingData {
    commonTempSettings: CommonTempSettings;
    maxCandyHoardSize:  number;
    typeBoosts:         TypeBoost[];
}

export interface CommonTempSettings {
    evolutionLengthMs:                    string;
    numTempEvoLevels:                     number;
    enableBuddyWalkingTempEvoEnergyAward: boolean;
}

export interface TypeBoost {
    pokemonId: string;
    boostType: TemplateIdElement[];
}

export interface PtcOauthSettings {
    templateId: string;
    data:       PtcOauthSettingData;
}

export interface PtcOauthSettingData {
    ptcAccountLinkingEnabled: boolean;
    endTimeMs:                string;
    linkingRewardItem:        string;
}

export interface QuestSettings {
    templateId: string;
    data:       QuestSettingData;
}

export interface QuestSettingData {
    questType:  string;
    dailyQuest: DailyQuest;
}

export interface DailyQuest {
    bucketsPerDay:          number;
    streakLength:           number;
    bonusMultiplier?:       number;
    streakBonusMultiplier?: number;
}

export interface QuickInviteSettings {
    templateId: string;
    data:       QuickInviteSettingData;
}

export interface QuickInviteSettingData {
    enabled:                   boolean;
    suggestedPlayersVariation: string;
}

export interface RaidSettings {
    templateId: string;
    data:       RaidSettingData;
}

export interface RaidSettingData {
    remoteRaidEnabled:                     boolean;
    maxRemoteRaidPasses:                   number;
    remoteDamageModifier:                  number;
    remoteRaidsMinPlayerLevel:             number;
    maxNumFriendInvites:                   number;
    friendInviteCutoffTimeSec:             number;
    canInviteFriendsInPerson:              boolean;
    canInviteFriendsRemotely:              boolean;
    maxPlayersPerLobby:                    number;
    maxRemotePlayersPerLobby:              number;
    inviteCooldownDurationMillis:          string;
    maxNumFriendInvitesPerAction:          number;
    unsupportedRaidLevelsForFriendInvites: string[];
    unsupportedRemoteRaidLevels:           string[];
    ablcemdnbkc:                           boolean;
    raidLevelMusicOverrides:               RaidLevelMusicOverride[];
    raidFeatureFlags:                      RaidFeatureFlags;
    bootRaidEnabled:                       boolean;
    friendRequestsEnabled:                 boolean;
    remoteRaidDistanceValidation:          boolean;
    popupTimeMs:                           number;
    failedFriendInviteInfoEnabled:         boolean;
    minPlayersToBoot:                      number;
    bootCutoffMs:                          number;
    bootSoloMs:                            number;
    obRaidClientSettingsNumber1:           number;
    obRaidClientSettingsNumber29:          number;
    pokemonMusicOverrides:                 PokemonMusicOverride[];
    fetchProfileFromSocialEnabled:         boolean;
}

export interface PokemonMusicOverride {
    pokemon:        string;
    forms?:         string[];
    battleMusicKey: string;
}

export interface RaidFeatureFlags {
    useCachedRaidBossPokemon: boolean;
}

export interface RaidLevelMusicOverride {
    raidLevel:      string;
    battleMusicKey: string;
}

export interface RaidLobbyCounterSettings {
    templateId: string;
    data:       RaidLobbyCounterSettingData;
}

export interface RaidLobbyCounterSettingData {
    pollingEnabled:          boolean;
    pollingIntervalMs:       number;
    subscribeEnabled:        boolean;
    publishEnabled:          boolean;
    mapDisplayEnabled:       boolean;
    nearbyDisplayEnabled:    boolean;
    showCounterRadiusMeters: number;
    subscribeS2Level:        number;
    maxCountToUpdate:        number;
    subscriptionNamespace:   string;
    pollingRadiusMeters:     number;
    publishCutoffTimeMs:     number;
}

export interface RecommendedSearchSettings {
    templateId: string;
    data:       RecommendedSearchSettingData;
}

export interface RecommendedSearchSettingData {
    searchLabel:         string;
    appendSearchString?: string;
    searchKey?:          string;
}

export interface ReferralSettings {
    templateId: string;
    data:       ReferralSettingData;
}

export interface ReferralSettingData {
    featureEnabled:                          boolean;
    recentFeatures:                          RecentFeature[];
    addReferrerGracePeriodMs:                string;
    minNumDaysWithoutSessionForLapsedPlayer: number;
    deepLinkUrl:                             string;
    imageShareReferralEnabled:               boolean;
}

export interface RecentFeature {
    iconType:    ItemIdElement;
    featureName: string;
    description: string;
}

export interface SquashSettings {
    templateId: string;
    data:       SquashSettingData;
}

export interface SquashSettingData {
    enabled:          boolean;
    dailySquashLimit: number;
}

export interface RemoteTradeSettings {
    templateId: string;
    data:       RemoteTradeSettingData;
}

export interface RemoteTradeSettingData {
    enabled:                     boolean;
    requestedPokemonCount:       number;
    pokemonUntradableDays:       number;
    maxRemoteTradesPerDay:       number;
    taggingUnlockPointThreshold: number;
    tradeExpiryReminderMinutes:  number;
    timeLimitMinutes:            number;
}

export interface RoutesNearbyNotifSettings {
    templateId: string;
    data:       RoutesNearbyNotifSettingData;
}

export interface RoutesNearbyNotifSettingData {
    maxNotifs:           number;
    timeBetweenNotifsMs: string;
}

export interface RoutesPartyPlayInteropSettings {
    templateId: string;
    data:       RoutesPartyPlayInteropSettingData;
}

export interface RoutesPartyPlayInteropSettingData {
    consumptionInteroperable: boolean;
}

export interface RouteBadgeSettings {
    templateId: string;
    data:       RouteBadgeSettingData;
}

export interface RouteBadgeSettingData {
    target: number[];
}

export interface RouteCreationSettings {
    templateId: string;
    data:       RouteCreationSettingData;
}

export interface RouteCreationSettingData {
    maxOpenRoutes:                     number;
    minTotalDistanceM:                 number;
    maxTotalDistanceM:                 number;
    maxNameLength:                     number;
    maxDescriptionLength:              number;
    minPlayerLevel:                    number;
    enabled:                           boolean;
    enableImmediateRouteIngestion:     boolean;
    minBreadcrumbDistanceDeltaMeters:  number;
    creationLimitWindowDays:           number;
    creationLimitPerWindow:            number;
    maxDistanceFromAnchorPotsM:        number;
    maxDistanceWarningDistanceMeters:  number;
    maxRecordingSpeedMetersPerSecond:  number;
    moderationEnabled:                 boolean;
    clientBreadcrumbSettings:          ClientBreadcrumbSettings;
    disabledTags:                      string[];
    durationDistanceToSpeedMultiplier: number;
    durationBufferS:                   number;
    interactionRangeMeters:            number;
    maxClientMapPanningDistanceM:      number;
    resumeRangeMeters:                 number;
    maxRecallCountThreshold:           number;
    allowableGpsDriftMeters:           number;
    maxPostPunishmentBanTimeMs:        string;
    maxSubmissionCountThreshold:       number;
    showSubmissionStatusHistory:       boolean;
    allowAppeals:                      boolean;
}

export interface ClientBreadcrumbSettings {
    sessionDurationM:                       number;
    updateIntervalS:                        number;
    asFallbackForegroundReportingInvervalS: number;
}

export interface RouteDiscoverySettings {
    templateId: string;
    data:       RouteDiscoverySettingData;
}

export interface RouteDiscoverySettingData {
    nearbyVisibleRadiusMeters:          number;
    popularRoutesFraction:              number;
    newRouteThreshold:                  number;
    maxRoutesViewable:                  number;
    maxClientMapPanningDistanceMeters:  number;
    enableBadgeRoutesDiscovery:         boolean;
    maxBadgeRoutesDiscoverySpannerTxns: number;
    maxFavoriteRoutes:                  number;
}

export interface RoutePinSettings {
    templateId: string;
    data:       RoutePinSettingData;
}

export interface RoutePinSettingData {
    maxPinsPerRoute:         number;
    maxDistanceFromRouteM:   number;
    pinMessage:              PinMessage[];
    creatorMax:              number;
    maxNamedStickersPerPin:  number;
    maxPinsForClientDisplay: number;
    playerMax:               number;
}

export interface PinMessage {
    key:           string;
    category:      string[];
    levelRequired: number;
}

export interface RoutePlaySettings {
    templateId: string;
    data:       RoutePlaySettingData;
}

export interface RoutePlaySettingData {
    minPlayerLevel:                     number;
    routeExpirationMinutes:             number;
    routePauseDistanceM:                number;
    bonusActiveDistanceThresholdMeters: number;
    marginPercentage:                   number;
    marginMinimumMeters:                number;
    resumeRangeMeters:                  number;
    routeEngagementStatsShardCount:     number;
    enableRouteRatingDetails:           boolean;
    obRoutePlaySettingsNumber29:        number;
    obRoutePlaySettingsNumber30:        number;
    obRoutePlaySettingsNumber33:        number;
    obRoutePlaySettingsNumber45:        number;
}

export interface RouteStampCategorySettings {
    templateId: string;
    data:       DataElement;
}

export interface DataElement {
    category:               string;
    collectionSize?:        number;
    sortOrder:              number;
    active:                 boolean;
    preferredCategoryIcon?: string;
}

export interface SettingsOverrideRule {
    templateId: string;
    data:       SettingsOverrideRuleData;
}

export interface SettingsOverrideRuleData {
    ruleType:            RuleType;
    sortOrder:           number;
    ruleValue?:          string;
    meshingEnabled:      FusedDepthEnabled;
    occlusionEnabled:    FusedDepthEnabled;
    semanticsEnabled:    FusedDepthEnabled;
    vpsEnabled:          FusedDepthEnabled;
    occlusionDefaultOn?: FusedDepthEnabled;
    fusedDepthEnabled?:  FusedDepthEnabled;
}

export enum FusedDepthEnabled {
    False = "FALSE",
    True = "TRUE",
}

export enum RuleType {
    All = "ALL",
    DeviceModel = "DEVICE_MODEL",
    DeviceModelContains = "DEVICE_MODEL_CONTAINS",
    Platform = "PLATFORM",
}

export interface SharedFusionSettings {
    templateId: string;
    data:       SharedFusionSettingData;
}

export interface SharedFusionSettingData {
    fusionEnabled: boolean;
}

export interface SharedMoveSettings {
    templateId: string;
    data:       SharedMoveSettingData;
}

export interface SharedMoveSettingData {
    shadowThirdMoveUnlockStardustMultiplier:   number;
    shadowThirdMoveUnlockCandyMultiplier:      number;
    purifiedThirdMoveUnlockStardustMultiplier: number;
    purifiedThirdMoveUnlockCandyMultiplier:    number;
    sharedMoveSettingsBool1:                   boolean;
}

export interface SourdoughMoveMappingSettings {
    templateId: string;
    data:       SourdoughMoveMappingSettingData;
}

export interface SourdoughMoveMappingSettingData {
    mappings: FluffyMapping[];
}

export interface FluffyMapping {
    pokemonId:              string;
    form?:                  string;
    move:                   string;
    optionalBMoveOverride?: OptionalMoveOverride;
    optionalCMoveOverride?: OptionalMoveOverride;
}

export interface OptionalMoveOverride {
    override: boolean;
    move:     string;
}

export interface GenderSettings {
    templateId: string;
    data:       GenderSettingData;
}

export interface GenderSettingData {
    pokemon: string;
    gender:  GenderClass;
    form?:   string;
}

export interface GenderClass {
    malePercent?:       number;
    femalePercent?:     number;
    genderlessPercent?: number;
}

export interface SpecialEggSettings {
    templateId: string;
    data:       SpecialEggSettingData;
}

export interface SpecialEggSettingData {
    enabled:        boolean;
    minLevel:       number;
    mapIconEnabled: boolean;
    xpReward:       number;
}

export interface SponsoredGeofenceGiftSettings {
    templateId: string;
    data:       SponsoredGeofenceGiftSettingData;
}

export interface SponsoredGeofenceGiftSettingData {
    giftPersistenceTimeMs:             number;
    mapPresentationTimeMs:             number;
    enableSponsoredGeofenceGift:       boolean;
    fullscreenDisableExitButtonTimeMs: number;
    balloonGiftSettings:               BalloonGiftSettings;
}

export interface BalloonGiftSettings {
    enableBalloonGift:        boolean;
    balloonAutoDismissTimeMs: number;
    getWasabiAdRpcIntervalMs: number;
    enableBalloonWebView:     boolean;
}

export interface StampCollectionSettings {
    templateId: string;
    data:       StampCollectionSettingData;
}

export interface StampCollectionSettingData {
    version:                   number;
    defaultColorPool:          string[];
    giftingMinFriendshipLevel: number;
    minPlayerLevel:            number;
}

export interface StationedPokemonTableSettings {
    templateId: string;
    data:       StationedPokemonTableSettingData;
}

export interface StationedPokemonTableSettingData {
    stationedPokemonTableEnum: string;
    tierBoosts:                TierBoost[];
}

export interface TierBoost {
    numStationed:  number;
    numBoostIcons: number;
}

export interface StickerMetadata {
    templateId: string;
    data:       StickerMetadatumData;
}

export interface StickerMetadatumData {
    stickerId:    string;
    maxCount:     number;
    pokemonId?:   string;
    category:     DataCategoryEnum[];
    releaseDate?: number;
    regionId?:    number;
    stickerUrl?:  string;
}

export enum DataCategoryEnum {
    Characters = "Characters",
    Decoration = "Decoration",
    Messages = "Messages",
    Misc = "Misc",
    Pokemon = "Pokemon",
    The24_7 = "24_7",
}

export interface StyleShopSettings {
    templateId: string;
    data:       StyleShopSettingData;
}

export interface StyleShopSettingData {
    v2Enabled:                boolean;
    setsEnabled:              boolean;
    recommendedItemIconNames: string[];
    cartDisabled:             boolean;
}

export interface InAppSurveySettings {
    templateId: string;
    data:       InAppSurveySettingData;
}

export interface InAppSurveySettingData {
    surveyPollFrequencyS: number;
}

export interface TappableSettings {
    templateId: string;
    data:       TappableSettingData;
}

export interface TappableSettingData {
    visibleRadiusMeters:             number;
    spawnAngleDegrees?:              number;
    movementRespawnThresholdMeters?: number;
    buddyFovDegress?:                number;
    avgTappablesInView?:             number;
    removeWhenTapped?:               boolean;
    type?:                           string;
    tappableAssetKey?:               string;
}

export interface TemporaryEvolutionSettings {
    templateId: string;
    data:       TemporaryEvolutionSettingData;
}

export interface TemporaryEvolutionSettingData {
    pokemonId:           string;
    temporaryEvolutions: TemporaryEvolution[];
}

export interface TemporaryEvolution {
    temporaryEvolutionId: Temp;
    assetBundleValue:     number;
}

export interface TicketGiftingSettings {
    templateId: string;
    data:       TicketGiftingSettingData;
}

export interface TicketGiftingSettingData {
    minPlayerLevel:             number;
    dailyPlayerGiftingLimit:    number;
    minRequiredFriendshipLevel: string;
}

export interface TodayViewSettings {
    templateId: string;
    data:       TodayViewSettingData;
}

export interface TodayViewSettingData {
    pinClaimableQuestEnabled:        boolean;
    notificationServerAuthoritative: boolean;
    favoriteQuestEnabled:            boolean;
}

export interface CombatNpcTrainer {
    templateId: string;
    data:       CombatNpcTrainerData;
}

export interface CombatNpcTrainerData {
    trainerName:            string;
    combatLeagueTemplateId: CombatLeagueTemplateId;
    combatPersonalityId:    string;
    avatar:                 FluffyAvatar;
    availablePokemon:       PurpleAvailablePokemon[];
    trainerTitle:           string;
    trainerQuote:           string;
    iconUrl:                string;
    backdropImageBundle:    BackdropImageBundle;
}

export interface PurpleAvailablePokemon {
    pokemonType:     string;
    pokemonDisplay?: PokemonPokemonDisplay;
}

export interface FluffyAvatar {
    avatar: number;
}

export interface CombatNpcPersonality {
    templateId: string;
    data:       CombatNpcPersonalityData;
}

export interface CombatNpcPersonalityData {
    personalityName:        string;
    superEffectiveChance:   number;
    specialChance:          number;
    offensiveMinimumScore:  number;
    offensiveMaximumScore:  number;
    defensiveMinimumScore?: number;
    defensiveMaximumScore?: number;
}

export interface TutorialSettings {
    templateId: string;
    data:       TutorialSettingData;
}

export interface TutorialSettingData {
    friendsTutorialEnabled:           boolean;
    giftsTutorialEnabled:             boolean;
    taskHelpTutorialsEnabled:         boolean;
    revivesAndPotionsTutorialEnabled: boolean;
    razzberryCatchTutorialEnabled:    boolean;
    luresTutorialEnabled:             boolean;
    tradingTutorialEnabled:           boolean;
    luckyTradeTutorialEnabled:        boolean;
    luckyFriendTutorialEnabled:       boolean;
    pokemonTaggingTutorialEnabled:    boolean;
    tutorialItemRewards:              TutorialItemReward[];
    typeEffectivenessTipsEnabled:     boolean;
}

export interface TutorialItemReward {
    tutorial: string;
    item:     ItemElement[];
}

export interface ItemElement {
    itemId: string;
    count:  number;
}

export interface PokemonFamily {
    templateId: string;
    data:       PokemonFamilyData;
}

export interface PokemonFamilyData {
    familyId:                 string;
    candyPerXlCandy:          number;
    megaEvolvablePokemonId?:  string;
    megaEvolvablePokemonIds?: MegaPokemonId[];
}

export enum MegaPokemonId {
    Gallade = "GALLADE",
    Gardevoir = "GARDEVOIR",
}

export interface PokemonSettings {
    templateId: string;
    data:       PokemonSettingData;
}

export interface PokemonSettingData {
    pokemonId:                          string;
    modelScale?:                        number;
    type:                               TemplateIdElement;
    type2?:                             TemplateIdElement;
    camera:                             DataCamera;
    encounter:                          Encounter;
    stats:                              Stats;
    quickMoves?:                        string[];
    cinematicMoves?:                    string[];
    animationTime?:                     number[];
    evolutionIds?:                      string[];
    evolutionPips?:                     number;
    pokedexHeightM:                     number;
    pokedexWeightKg:                    number;
    heightStdDev:                       number;
    weightStdDev:                       number;
    familyId:                           string;
    candyToEvolve?:                     number;
    kmBuddyDistance:                    number;
    modelHeight?:                       number;
    evolutionBranch?:                   EvolutionBranch[];
    modelScaleV2?:                      number;
    buddyOffsetMale?:                   number[];
    buddyOffsetFemale?:                 number[];
    buddyScale?:                        number;
    thirdMove:                          ThirdMove;
    isTransferable?:                    boolean;
    isDeployable?:                      boolean;
    isTradable?:                        boolean;
    shadow?:                            Shadow;
    buddyGroupNumber?:                  number;
    buddyWalkedMegaEnergyAward?:        number;
    raidBossDistanceOffset?:            number;
    allowNoevolveEvolution?:            string[];
    ibfc:                               Ibfc;
    breadTierGroup?:                    BreadTierGroupEnum;
    form?:                              string;
    disableTransferToPokemonHome?:      boolean;
    parentPokemonId?:                   string;
    buddySize?:                         BuddySize;
    combatShoulderCameraAngle?:         number[];
    combatDefaultCameraAngle?:          number[];
    combatPlayerFocusCameraAngle?:      number[];
    eliteCinematicMove?:                string[];
    tempEvoOverrides?:                  FluffyTempEvoOverride[];
    eliteQuickMove?:                    string[];
    useIrisFlyingPlacement?:            boolean;
    irisPhotoEmote1?:                   IrisPhotoEmote1;
    buddyPortraitOffset?:               number[];
    irisFlyingHeightLimitMeters?:       number;
    combatPlayerPokemonPositionOffset?: number[];
    pokemonClass?:                      PokemonClass;
    irisPhotoEmote2?:                   string;
    buddyWalkedMegaEnergyAwards?:       BuddyWalkedMegaEnergyAward[];
    combatOpponentFocusCameraAngle?:    number[];
    buddyPortraitRotation?:             number[];
    nonTmCinematicMoves?:               string[];
    exclusiveKeyItem?:                  Item;
    formChange?:                        FormChange[];
    sizeSettings?:                      DataSizeSettings;
    irisPhotoHueOrder?:                 number;
    irisPhotoShinyHueOrder?:            number;
}

export enum BuddySize {
    BuddyBaby = "BUDDY_BABY",
    BuddyBig = "BUDDY_BIG",
    BuddyFlying = "BUDDY_FLYING",
    BuddyShoulder = "BUDDY_SHOULDER",
}

export interface BuddyWalkedMegaEnergyAward {
    megaPokemonId:         MegaPokemonId;
    megaEnergyAwardAmount: number;
    genderRequirement?:    GenderRequirementEnum;
}

export interface DataCamera {
    diskRadiusM?:       number;
    cylinderRadiusM?:   number;
    cylinderHeightM?:   number;
    shoulderModeScale?: number;
    cylinderGroundM?:   number;
}

export interface Encounter {
    collisionRadiusM?:           number;
    collisionHeightM?:           number;
    collisionHeadRadiusM?:       number;
    movementType?:               MovementType;
    movementTimerS?:             number;
    jumpTimeS?:                  number;
    attackTimerS?:               number;
    attackProbability?:          number;
    dodgeProbability?:           number;
    dodgeDurationS?:             number;
    dodgeDistance?:              number;
    cameraDistance?:             number;
    minPokemonActionFrequencyS?: number;
    maxPokemonActionFrequencyS?: number;
    shadowBaseCaptureRate?:      number;
    shadowAttackProbability?:    number;
    shadowDodgeProbability?:     number;
    bonusCandyCaptureReward?:    number;
    bonusStardustCaptureReward?: number;
    bonusXlCandyCaptureReward?:  number;
}

export enum MovementType {
    MovementElectric = "MOVEMENT_ELECTRIC",
    MovementFlying = "MOVEMENT_FLYING",
    MovementHovering = "MOVEMENT_HOVERING",
    MovementJump = "MOVEMENT_JUMP",
    MovementPsychic = "MOVEMENT_PSYCHIC",
}

export interface EvolutionBranch {
    evolution?:                              string;
    candyCost?:                              number;
    form?:                                   string;
    candyCostPurified?:                      number;
    temporaryEvolution?:                     Temp;
    temporaryEvolutionEnergyCost?:           number;
    temporaryEvolutionEnergyCostSubsequent?: number;
    evolutionItemRequirement?:               string;
    priority?:                               number;
    questDisplay?:                           QuestDisplayElement[];
    noCandyCostViaTrade?:                    boolean;
    lureItemRequirement?:                    string;
    kmBuddyDistanceRequirement?:             number;
    mustBeBuddy?:                            boolean;
    onlyDaytime?:                            boolean;
    onlyNighttime?:                          boolean;
    evolutionLikelihoodWeight?:              number;
    onlyFullMoon?:                           boolean;
    genderRequirement?:                      GenderRequirementEnum;
    evolutionMoveRequirement?:               string;
    onlyUpsideDown?:                         boolean;
    evolutionItemRequirementCost?:           number;
    onlyDuskPeriod?:                         boolean;
}

export interface QuestDisplayElement {
    questRequirementTemplateId: string;
}

export interface FormChange {
    availableForm:              string[];
    candyCost?:                 number;
    stardustCost?:              number;
    item?:                      string;
    itemCostCount?:             number;
    componentPokemonSettings?:  ComponentPokemonSettings;
    moveReassignment?:          MoveReassignment;
    requiredCinematicMoves?:    RequiredCinematicMove[];
    formChangeBonusAttributes?: FormChangeBonusAttribute[];
    locationCardSettings?:      FormChangeLocationCardSetting[];
    requiredBreadMoves?:        RequiredBreadMove[];
    priority?:                  number;
}

export interface ComponentPokemonSettings {
    pokedexId:             string;
    componentCandyCost?:   number;
    formChangeType:        FormChangeType;
    locationCardSettings?: ComponentPokemonSettingsLocationCardSetting[];
    familyId:              FamilyId;
}

export enum FamilyId {
    FamilyCosmog = "FAMILY_COSMOG",
    FamilyReshiram = "FAMILY_RESHIRAM",
    FamilyZekrom = "FAMILY_ZEKROM",
}

export enum FormChangeType {
    Fuse = "FUSE",
    Unfuse = "UNFUSE",
}

export interface ComponentPokemonSettingsLocationCardSetting {
    basePokemonLocationCard:      string;
    componentPokemonLocationCard: string;
    fusionPokemonLocationCard:    string;
}

export interface FormChangeBonusAttribute {
    targetForm:      string;
    breadMode?:      string;
    maxMoves?:       MaxMove[];
    clearBreadMode?: boolean;
}

export interface MaxMove {
    moveType:  string;
    moveLevel: string;
}

export interface FormChangeLocationCardSetting {
    existingLocationCard:    string;
    replacementLocationCard: string;
}

export interface MoveReassignment {
    cinematicMoves: CinematicMove[];
}

export interface CinematicMove {
    existingMoves?:   string[];
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
    combatEnable?:                   boolean;
    defaultForm?:                    string;
    alternateForm?:                  string;
    defaultToAlternateIbfcSettings?: IbfcSettings;
    alternateToDefaultIbfcSettings?: IbfcSettings;
}

export interface IbfcSettings {
    animationDurationTurns: number;
    animationPlayPoint:     string;
    ibfcVfxKey:             string;
    currentMove?:           string;
    replacementMove?:       string;
}

export enum IrisPhotoEmote1 {
    Eat = "Eat",
    PhysicalAttack = "PhysicalAttack",
}

export interface Shadow {
    purificationStardustNeeded: number;
    purificationCandyNeeded:    number;
    purifiedChargeMove:         PurifiedChargeMove;
    shadowChargeMove:           ShadowChargeMove;
}

export enum PurifiedChargeMove {
    AeroblastPlusPlus = "AEROBLAST_PLUS_PLUS",
    Return = "RETURN",
    SacredFirePlusPlus = "SACRED_FIRE_PLUS_PLUS",
}

export enum ShadowChargeMove {
    AeroblastPlus = "AEROBLAST_PLUS",
    Frustration = "FRUSTRATION",
    SacredFirePlus = "SACRED_FIRE_PLUS",
}

export interface Stats {
    baseStamina: number;
    baseAttack:  number;
    baseDefense: number;
}

export interface FluffyTempEvoOverride {
    tempEvoId?:              Temp;
    stats?:                  Stats;
    averageHeightM?:         number;
    averageWeightKg?:        number;
    typeOverride1?:          TemplateIdElement;
    typeOverride2?:          TemplateIdElement;
    camera?:                 BreadOverrideCamera;
    modelScaleV2?:           number;
    modelHeight?:            number;
    buddyOffsetMale?:        number[];
    buddyOffsetFemale?:      number[];
    buddyPortraitOffset?:    number[];
    raidBossDistanceOffset?: number;
    buddyPortraitRotation?:  number[];
}

export interface ThirdMove {
    stardustToUnlock?: number;
    candyToUnlock:     number;
}

export interface MoveSettings {
    templateId: string;
    data:       MoveSettingData;
}

export interface MoveSettingData {
    movementId:              string;
    animationId:             number;
    pokemonType:             TemplateIdElement;
    power?:                  number;
    accuracyChance:          number;
    criticalChance?:         number;
    staminaLossScalar?:      number;
    trainerLevelMin?:        number;
    trainerLevelMax?:        number;
    vfxName:                 string;
    durationMs:              number;
    damageWindowStartMs?:    number;
    damageWindowEndMs:       number;
    energyDelta?:            number;
    healScalar?:             number;
    isLocked?:               boolean;
    obMoveSettingsNumber18?: number[];
}

export interface PokemonHomeFormReversions {
    templateId: string;
    data:       PokemonHomeFormReversionData;
}

export interface PokemonHomeFormReversionData {
    pokemonId:   string;
    formMapping: FormMapping[];
}

export interface FormMapping {
    revertedForm:       string;
    unauthorizedForms:  string[];
    revertedFormString: string;
}

export interface VerboseLogCombatSettings {
    templateId: string;
    data:       VerboseLogCombatSettingData;
}

export interface VerboseLogCombatSettingData {
    enabled:                    boolean;
    enableCoreCombat:           boolean;
    enableCombatChallengeSetup: boolean;
    enableCombatVsSeekerSetup:  boolean;
    enableWebSocket:            boolean;
    enableOnApplicationFocus:   boolean;
    enableOnApplicationPause:   boolean;
    enableOnApplicationQuit:    boolean;
    enableExceptionCaught:      boolean;
    progressTokenPriority:      number;
    enableRpcErrorData:         boolean;
    clientLogDecayTimeInHours:  number;
}

export interface VerboseLogRaidSettings {
    templateId: string;
    data:       { [key: string]: boolean };
}

export interface VistaGeneralSettings {
    templateId: string;
    data:       VistaGeneralSettingData;
}

export interface VistaGeneralSettingData {
    isFeatureEnabled:        boolean;
    isVistaBattleEnabled:    boolean;
    isVistaEncounterEnabled: boolean;
    isVistaMapEnabled:       boolean;
    isVistaSpawnsEnabled:    boolean;
}

export interface BattleAnimationSettings {
    templateId: string;
    data:       BattleAnimationSettingData;
}

export interface BattleAnimationSettingData {
    raidsAnimationConfiguration:     AnimationConfiguration;
    maxBattleAnimationConfiguration: AnimationConfiguration;
    combatAnimationConfiguration:    CombatAnimationConfiguration;
}

export interface CombatAnimationConfiguration {
    fastAttackSettings:                      FastAttackSettingsClass;
    projectedHealthAnimationDurationSeconds: number;
}

export interface AnimationConfiguration {
    fastAttackSettings: FastAttackSettings;
}

export interface FastAttackSettings {
    normalizedStartOffset:    number;
    crossFadeDurationSeconds: number;
}

export interface VsSeekerClientSettings {
    templateId: string;
    data:       VsSeekerClientSettingData;
}

export interface VsSeekerClientSettingData {
    allowedVsSeekerLeagueTemplateId: string[];
}

export interface VsSeekerLoot {
    templateId: string;
    data:       VsSeekerLootData;
}

export interface VsSeekerLootData {
    rankLevel:    number;
    reward:       FluffyReward[];
    rewardTrack?: Track;
}

export interface FluffyReward {
    item?:                      PurpleItem;
    itemRankingLootTableCount?: number;
    pokemonReward?:             boolean;
}

export interface PurpleItem {
    stardust?: boolean;
    count:     number;
    item?:     ItemEnum;
}

export enum ItemEnum {
    ItemRareCandy = "ITEM_RARE_CANDY",
}

export interface VsSeekerPokemonRewards {
    templateId: string;
    data:       VsSeekerPokemonRewardData;
}

export interface VsSeekerPokemonRewardData {
    availablePokemon: FluffyAvailablePokemon[];
    rewardTrack?:     Track;
}

export interface FluffyAvailablePokemon {
    guaranteedLimitedPokemonReward?: GuaranteedLimitedPokemonReward;
    unlockedAtRank:                  number;
    attackIvOverride:                IvOverride;
    defenseIvOverride:               IvOverride;
    staminaIvOverride:               IvOverride;
    pokemon?:                        PokemonEncounterClass;
}

export interface IvOverride {
    range: Range;
}

export interface Range {
    min: number;
    max: number;
}

export interface GuaranteedLimitedPokemonReward {
    pokemon:                             PokemonEncounterClass;
    identifier:                          string;
    perCompetitiveCombatSeasonMaxCount?: number;
    lifetimeMaxCount?:                   number;
}

export interface VsSeekerScheduleSettings {
    templateId: string;
    data:       VsSeekerScheduleSettingData;
}

export interface VsSeekerScheduleSettingData {
    enableCombatHubMain:    boolean;
    enableCombatLeagueView: boolean;
    enableTodayView:        boolean;
    seasonSchedules:        SeasonSchedule[];
}

export interface SeasonSchedule {
    seasonTitle:       string;
    descriptionKey:    string;
    vsSeekerSchedules: VsSeekerSchedule[];
    blogUrl:           string;
}

export interface VsSeekerSchedule {
    startTimeMs:              string;
    endTimeMs:                string;
    vsSeekerLeagueTempalteId: string[];
}

export interface WeatherAffinities {
    templateId: string;
    data:       WeatherAffinityData;
}

export interface WeatherAffinityData {
    weatherCondition: string;
    pokemonType:      TemplateIdElement[];
}

export interface WeatherBonusSettings {
    templateId: string;
    data:       WeatherBonusSettingData;
}

export interface WeatherBonusSettingData {
    cpBaseLevelBonus:                        number;
    guaranteedIndividualValues:              number;
    stardustBonusMultiplier:                 number;
    attackBonusMultiplier:                   number;
    raidEncounterCpBaseLevelBonus:           number;
    raidEncounterGuaranteedIndividualValues: number;
}

export interface AvatarStoreFooterFlags {
    templateId: string;
    data:       AdditiveSceneSettingData;
}

export interface AvatarStoreSubcategoryFilteringFlags {
    templateId: string;
    data:       AdditiveSceneSettingData;
}

export interface ImpressionTrackingSettings {
    templateId: string;
    data:       ImpressionTrackingSettingData;
}

export interface ImpressionTrackingSettingData {
    impressionTrackingEnabled:                 boolean;
    fullScreenAdViewTrackingEnabled:           boolean;
    pokestopSpinnerInteractionTrackingEnabled: boolean;
    approachGymTrackingEnabled:                boolean;
    approachRaidTrackingEnabled:               boolean;
}

export interface MoveSequenceSettings {
    templateId: string;
    data:       MoveSequenceSettingData;
}

export interface MoveSequenceSettingData {
    sequence: string[];
}

export interface StickerCategorySettings {
    templateId: string;
    data:       StickerCategorySettingData;
}

export interface StickerCategorySettingData {
    enabled:         boolean;
    stickerCategory: DataElement[];
}

export interface UsernameSuggestionSettings {
    templateId: string;
    data:       UsernameSuggestionSettingData;
}

export interface UsernameSuggestionSettingData {
    featureEnabled:          boolean;
    numSuggestionsDisplayed: number;
    numSuggestionsGenerated: number;
}
