import * as Types from './types';

export const RawGameMaster = {
    getAccessibilitySettings: async (): Promise<Types.AccessibilitySettings[]> => {
        const data = await import('./accessibilitySettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.AccessibilitySettings[];
    },
    getAdditiveSceneSettings: async (): Promise<Types.AdditiveSceneSettings[]> => {
        const data = await import('./additiveSceneSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.AdditiveSceneSettings[];
    },
    getAddressablePokemonSettings: async (): Promise<Types.AddressablePokemonSettings[]> => {
        const data = await import('./addressablePokemonSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.AddressablePokemonSettings[];
    },
    getAddressBookImportSettings: async (): Promise<Types.AddressBookImportSettings[]> => {
        const data = await import('./addressBookImportSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.AddressBookImportSettings[];
    },
    getFeatureGate: async (): Promise<Types.FeatureGate[]> => {
        const data = await import('./featureGate.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.FeatureGate[];
    },
    getAdvancedSettings: async (): Promise<Types.AdvancedSettings[]> => {
        const data = await import('./advancedSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.AdvancedSettings[];
    },
    getRollBack: async (): Promise<Types.RollBack[]> => {
        const data = await import('./rollBack.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.RollBack[];
    },
    getEvolutionQuestTemplate: async (): Promise<Types.EvolutionQuestTemplate[]> => {
        const data = await import('./evolutionQuestTemplate.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.EvolutionQuestTemplate[];
    },
    getArPhotoFeatureFlags: async (): Promise<Types.ArPhotoFeatureFlags[]> => {
        const data = await import('./arPhotoFeatureFlags.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.ArPhotoFeatureFlags[];
    },
    getArTelemetrySettings: async (): Promise<Types.ArTelemetrySettings[]> => {
        const data = await import('./arTelemetrySettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.ArTelemetrySettings[];
    },
    getAssetRefreshProto: async (): Promise<Types.AssetRefreshProto[]> => {
        const data = await import('./assetRefreshProto.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.AssetRefreshProto[];
    },
    getAvatarFeatureFlags: async (): Promise<Types.AvatarFeatureFlags[]> => {
        const data = await import('./avatarFeatureFlags.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.AvatarFeatureFlags[];
    },
    getAvatarGroupOrderSettings: async (): Promise<Types.AvatarGroupOrderSettings[]> => {
        const data = await import('./avatarGroupOrderSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.AvatarGroupOrderSettings[];
    },
    getAvatarCustomization: async (): Promise<Types.AvatarCustomization[]> => {
        const data = await import('./avatarCustomization.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.AvatarCustomization[];
    },
    getLevelUpRewards: async (): Promise<Types.LevelUpRewards[]> => {
        const data = await import('./levelUpRewards.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.LevelUpRewards[];
    },
    getBackgroundModeSettings: async (): Promise<Types.BackgroundModeSettings[]> => {
        const data = await import('./backgroundModeSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BackgroundModeSettings[];
    },
    getBadgeSettings: async (): Promise<Types.BadgeSettings[]> => {
        const data = await import('./badgeSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BadgeSettings[];
    },
    getCodeGateProto: async (): Promise<Types.CodeGateProto[]> => {
        const data = await import('./codeGateProto.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.CodeGateProto[];
    },
    getBattleHubBadgeSettings: async (): Promise<Types.BattleHubBadgeSettings[]> => {
        const data = await import('./battleHubBadgeSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BattleHubBadgeSettings[];
    },
    getBattleHubOrderSettings: async (): Promise<Types.BattleHubOrderSettings[]> => {
        const data = await import('./battleHubOrderSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BattleHubOrderSettings[];
    },
    getBattlePartySettings: async (): Promise<Types.BattlePartySettings[]> => {
        const data = await import('./battlePartySettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BattlePartySettings[];
    },
    getBattleSettings: async (): Promise<Types.BattleSettings[]> => {
        const data = await import('./battleSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BattleSettings[];
    },
    getBattleVisualSettings: async (): Promise<Types.BattleVisualSettings[]> => {
        const data = await import('./battleVisualSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BattleVisualSettings[];
    },
    getBelugaPokemonWhitelist: async (): Promise<Types.BelugaPokemonWhitelist[]> => {
        const data = await import('./belugaPokemonWhitelist.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BelugaPokemonWhitelist[];
    },
    getBestFriendsPlusSettings: async (): Promise<Types.BestFriendsPlusSettings[]> => {
        const data = await import('./bestFriendsPlusSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BestFriendsPlusSettings[];
    },
    getBreadBattleClientSettings: async (): Promise<Types.BreadBattleClientSettings[]> => {
        const data = await import('./breadBattleClientSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BreadBattleClientSettings[];
    },
    getBreadFeatureFlags: async (): Promise<Types.BreadFeatureFlags[]> => {
        const data = await import('./breadFeatureFlags.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BreadFeatureFlags[];
    },
    getBreadLobbyCounterSettings: async (): Promise<Types.BreadLobbyCounterSettings[]> => {
        const data = await import('./breadLobbyCounterSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BreadLobbyCounterSettings[];
    },
    getBreadLobbyUpdateSettings: async (): Promise<Types.BreadLobbyUpdateSettings[]> => {
        const data = await import('./breadLobbyUpdateSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BreadLobbyUpdateSettings[];
    },
    getBreadMoveLevelSettings: async (): Promise<Types.BreadMoveLevelSettings[]> => {
        const data = await import('./breadMoveLevelSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BreadMoveLevelSettings[];
    },
    getBreadMoveMappings: async (): Promise<Types.BreadMoveMappings[]> => {
        const data = await import('./breadMoveMappings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BreadMoveMappings[];
    },
    getBreadPokemonScalingSettings: async (): Promise<Types.BreadPokemonScalingSettings[]> => {
        const data = await import('./breadPokemonScalingSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BreadPokemonScalingSettings[];
    },
    getBreadSettings: async (): Promise<Types.BreadSettings[]> => {
        const data = await import('./breadSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BreadSettings[];
    },
    getBuddyActivityCategorySettings: async (): Promise<Types.BuddyActivityCategorySettings[]> => {
        const data = await import('./buddyActivityCategorySettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BuddyActivityCategorySettings[];
    },
    getBuddyEmotionLevelSettings: async (): Promise<Types.BuddyEmotionLevelSettings[]> => {
        const data = await import('./buddyEmotionLevelSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BuddyEmotionLevelSettings[];
    },
    getBuddyEncounterCameoSettings: async (): Promise<Types.BuddyEncounterCameoSettings[]> => {
        const data = await import('./buddyEncounterCameoSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BuddyEncounterCameoSettings[];
    },
    getBuddyHungerSettings: async (): Promise<Types.BuddyHungerSettings[]> => {
        const data = await import('./buddyHungerSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BuddyHungerSettings[];
    },
    getBuddyInteractionSettings: async (): Promise<Types.BuddyInteractionSettings[]> => {
        const data = await import('./buddyInteractionSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BuddyInteractionSettings[];
    },
    getBuddyLevelSettings: async (): Promise<Types.BuddyLevelSettings[]> => {
        const data = await import('./buddyLevelSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BuddyLevelSettings[];
    },
    getBuddySwapSettings: async (): Promise<Types.BuddySwapSettings[]> => {
        const data = await import('./buddySwapSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BuddySwapSettings[];
    },
    getBuddyWalkSettings: async (): Promise<Types.BuddyWalkSettings[]> => {
        const data = await import('./buddyWalkSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BuddyWalkSettings[];
    },
    getBulkHealingSettings: async (): Promise<Types.BulkHealingSettings[]> => {
        const data = await import('./bulkHealingSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BulkHealingSettings[];
    },
    getIapItemDisplay: async (): Promise<Types.IapItemDisplay[]> => {
        const data = await import('./iapItemDisplay.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.IapItemDisplay[];
    },
    getButterflyCollectorSettings: async (): Promise<Types.ButterflyCollectorSettings[]> => {
        const data = await import('./butterflyCollectorSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.ButterflyCollectorSettings[];
    },
    getCampfireSettings: async (): Promise<Types.CampfireSettings[]> => {
        const data = await import('./campfireSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.CampfireSettings[];
    },
    getCatchRadiusMultiplierSettings: async (): Promise<Types.CatchRadiusMultiplierSettings[]> => {
        const data = await import('./catchRadiusMultiplierSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.CatchRadiusMultiplierSettings[];
    },
    getInvasionNpcDisplaySettings: async (): Promise<Types.InvasionNpcDisplaySettings[]> => {
        const data = await import('./invasionNpcDisplaySettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.InvasionNpcDisplaySettings[];
    },
    getVnextBattleConfig: async (): Promise<Types.VnextBattleConfig[]> => {
        const data = await import('./vnextBattleConfig.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.VnextBattleConfig[];
    },
    getCombatCompetitiveSeasonSettings: async (): Promise<Types.CombatCompetitiveSeasonSettings[]> => {
        const data = await import('./combatCompetitiveSeasonSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.CombatCompetitiveSeasonSettings[];
    },
    getCombatLeague: async (): Promise<Types.CombatLeague[]> => {
        const data = await import('./combatLeague.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.CombatLeague[];
    },
    getCombatLeagueSettings: async (): Promise<Types.CombatLeagueSettings[]> => {
        const data = await import('./combatLeagueSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.CombatLeagueSettings[];
    },
    getCombatType: async (): Promise<Types.CombatType[]> => {
        const data = await import('./combatType.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.CombatType[];
    },
    getCombatRankingProtoSettings: async (): Promise<Types.CombatRankingProtoSettings[]> => {
        const data = await import('./combatRankingProtoSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.CombatRankingProtoSettings[];
    },
    getCombatSettings: async (): Promise<Types.CombatSettings[]> => {
        const data = await import('./combatSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.CombatSettings[];
    },
    getCombatStatStageSettings: async (): Promise<Types.CombatStatStageSettings[]> => {
        const data = await import('./combatStatStageSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.CombatStatStageSettings[];
    },
    getCombatMove: async (): Promise<Types.CombatMove[]> => {
        const data = await import('./combatMove.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.CombatMove[];
    },
    getContestSettings: async (): Promise<Types.ContestSettings[]> => {
        const data = await import('./contestSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.ContestSettings[];
    },
    getConversationSettings: async (): Promise<Types.ConversationSettings[]> => {
        const data = await import('./conversationSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.ConversationSettings[];
    },
    getCrossGameSocialSettings: async (): Promise<Types.CrossGameSocialSettings[]> => {
        const data = await import('./crossGameSocialSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.CrossGameSocialSettings[];
    },
    getDailyAdventureIncenseSettings: async (): Promise<Types.DailyAdventureIncenseSettings[]> => {
        const data = await import('./dailyAdventureIncenseSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.DailyAdventureIncenseSettings[];
    },
    getDeepLinkingSettings: async (): Promise<Types.DeepLinkingSettings[]> => {
        const data = await import('./deepLinkingSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.DeepLinkingSettings[];
    },
    getBattleInputBufferSettings: async (): Promise<Types.BattleInputBufferSettings[]> => {
        const data = await import('./battleInputBufferSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BattleInputBufferSettings[];
    },
    getEggHatchImprovementsSettings: async (): Promise<Types.EggHatchImprovementsSettings[]> => {
        const data = await import('./eggHatchImprovementsSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.EggHatchImprovementsSettings[];
    },
    getEncounterSettings: async (): Promise<Types.EncounterSettings[]> => {
        const data = await import('./encounterSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.EncounterSettings[];
    },
    getPokemonHomeEnergyCosts: async (): Promise<Types.PokemonHomeEnergyCosts[]> => {
        const data = await import('./pokemonHomeEnergyCosts.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PokemonHomeEnergyCosts[];
    },
    getEventPassSettings: async (): Promise<Types.EventPassSettings[]> => {
        const data = await import('./eventPassSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.EventPassSettings[];
    },
    getEventPassTierSettings: async (): Promise<Types.EventPassTierSettings[]> => {
        const data = await import('./eventPassTierSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.EventPassTierSettings[];
    },
    getEventPlannerPopularNotificationSettings: async (): Promise<Types.EventPlannerPopularNotificationSettings[]> => {
        const data = await import('./eventPlannerPopularNotificationSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.EventPlannerPopularNotificationSettings[];
    },
    getPlannerSettings: async (): Promise<Types.PlannerSettings[]> => {
        const data = await import('./plannerSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PlannerSettings[];
    },
    getEvolutionChainDisplaySettings: async (): Promise<Types.EvolutionChainDisplaySettings[]> => {
        const data = await import('./evolutionChainDisplaySettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.EvolutionChainDisplaySettings[];
    },
    getPokemonExtendedSettings: async (): Promise<Types.PokemonExtendedSettings[]> => {
        const data = await import('./pokemonExtendedSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PokemonExtendedSettings[];
    },
    getExternalAddressableAssetsSettings: async (): Promise<Types.ExternalAddressableAssetsSettings[]> => {
        const data = await import('./externalAddressableAssetsSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.ExternalAddressableAssetsSettings[];
    },
    getFeatureUnlockLevelSettings: async (): Promise<Types.FeatureUnlockLevelSettings[]> => {
        const data = await import('./featureUnlockLevelSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.FeatureUnlockLevelSettings[];
    },
    getFormSettings: async (): Promise<Types.FormSettings[]> => {
        const data = await import('./formSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.FormSettings[];
    },
    getFortPowerUpLevelSettings: async (): Promise<Types.FortPowerUpLevelSettings[]> => {
        const data = await import('./fortPowerUpLevelSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.FortPowerUpLevelSettings[];
    },
    getFriendshipMilestoneSettings: async (): Promise<Types.FriendshipMilestoneSettings[]> => {
        const data = await import('./friendshipMilestoneSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.FriendshipMilestoneSettings[];
    },
    getItemSettings: async (): Promise<Types.ItemSettings[]> => {
        const data = await import('./itemSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.ItemSettings[];
    },
    getGeotargetedQuestSettings: async (): Promise<Types.GeotargetedQuestSettings[]> => {
        const data = await import('./geotargetedQuestSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.GeotargetedQuestSettings[];
    },
    getGiftingSettings: async (): Promise<Types.GiftingSettings[]> => {
        const data = await import('./giftingSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.GiftingSettings[];
    },
    getGuiSearchSettings: async (): Promise<Types.GuiSearchSettings[]> => {
        const data = await import('./guiSearchSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.GuiSearchSettings[];
    },
    getGymBadgeSettings: async (): Promise<Types.GymBadgeSettings[]> => {
        const data = await import('./gymBadgeSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.GymBadgeSettings[];
    },
    getHapticsSettings: async (): Promise<Types.HapticsSettings[]> => {
        const data = await import('./hapticsSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.HapticsSettings[];
    },
    getLanguageSettings: async (): Promise<Types.LanguageSettings[]> => {
        const data = await import('./languageSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.LanguageSettings[];
    },
    getIapCategoryDisplay: async (): Promise<Types.IapCategoryDisplay[]> => {
        const data = await import('./iapCategoryDisplay.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.IapCategoryDisplay[];
    },
    getIapSettings: async (): Promise<Types.IapSettings[]> => {
        const data = await import('./iapSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.IapSettings[];
    },
    getIbfcLightweightSettings: async (): Promise<Types.IbfcLightweightSettings[]> => {
        const data = await import('./ibfcLightweightSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.IbfcLightweightSettings[];
    },
    getIncidentPrioritySettings: async (): Promise<Types.IncidentPrioritySettings[]> => {
        const data = await import('./incidentPrioritySettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.IncidentPrioritySettings[];
    },
    getIncidentVisibilitySettings: async (): Promise<Types.IncidentVisibilitySettings[]> => {
        const data = await import('./incidentVisibilitySettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.IncidentVisibilitySettings[];
    },
    getPokestopInvasionAvailabilitySettings: async (): Promise<Types.PokestopInvasionAvailabilitySettings[]> => {
        const data = await import('./pokestopInvasionAvailabilitySettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PokestopInvasionAvailabilitySettings[];
    },
    getInventorySettings: async (): Promise<Types.InventorySettings[]> => {
        const data = await import('./inventorySettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.InventorySettings[];
    },
    getIrisSocialSettings: async (): Promise<Types.IrisSocialSettings[]> => {
        const data = await import('./irisSocialSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.IrisSocialSettings[];
    },
    getIrisSocialUxFunnelSettings: async (): Promise<Types.IrisSocialUxFunnelSettings[]> => {
        const data = await import('./irisSocialUxFunnelSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.IrisSocialUxFunnelSettings[];
    },
    getItemExpirationSettings: async (): Promise<Types.ItemExpirationSettings[]> => {
        const data = await import('./itemExpirationSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.ItemExpirationSettings[];
    },
    getItemInventoryUpdateSettings: async (): Promise<Types.ItemInventoryUpdateSettings[]> => {
        const data = await import('./itemInventoryUpdateSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.ItemInventoryUpdateSettings[];
    },
    getJoinRaidViaFriendListSettings: async (): Promise<Types.JoinRaidViaFriendListSettings[]> => {
        const data = await import('./joinRaidViaFriendListSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.JoinRaidViaFriendListSettings[];
    },
    getLanguageSelectorSettings: async (): Promise<Types.LanguageSelectorSettings[]> => {
        const data = await import('./languageSelectorSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.LanguageSelectorSettings[];
    },
    getLocationCardSettings: async (): Promise<Types.LocationCardSettings[]> => {
        const data = await import('./locationCardSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.LocationCardSettings[];
    },
    getClientQuestTemplate: async (): Promise<Types.ClientQuestTemplate[]> => {
        const data = await import('./clientQuestTemplate.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.ClientQuestTemplate[];
    },
    getLimitedPurchaseSkuSettings: async (): Promise<Types.LimitedPurchaseSkuSettings[]> => {
        const data = await import('./limitedPurchaseSkuSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.LimitedPurchaseSkuSettings[];
    },
    getLuckyPokemonSettings: async (): Promise<Types.LuckyPokemonSettings[]> => {
        const data = await import('./luckyPokemonSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.LuckyPokemonSettings[];
    },
    getMainMenuChanges: async (): Promise<Types.MainMenuChanges[]> => {
        const data = await import('./mainMenuChanges.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.MainMenuChanges[];
    },
    getMapDisplaySettings: async (): Promise<Types.MapDisplaySettings[]> => {
        const data = await import('./mapDisplaySettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.MapDisplaySettings[];
    },
    getMapObjectsInteractionRangeSettings: async (): Promise<Types.MapObjectsInteractionRangeSettings[]> => {
        const data = await import('./mapObjectsInteractionRangeSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.MapObjectsInteractionRangeSettings[];
    },
    getMegaEvoLevelSettings: async (): Promise<Types.MegaEvoLevelSettings[]> => {
        const data = await import('./megaEvoLevelSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.MegaEvoLevelSettings[];
    },
    getMegaEvoSettings: async (): Promise<Types.MegaEvoSettings[]> => {
        const data = await import('./megaEvoSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.MegaEvoSettings[];
    },
    getMonodepthSettings: async (): Promise<Types.MonodepthSettings[]> => {
        const data = await import('./monodepthSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.MonodepthSettings[];
    },
    getMpSettings: async (): Promise<Types.MpSettings[]> => {
        const data = await import('./mpSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.MpSettings[];
    },
    getNearbyPokemonSettings: async (): Promise<Types.NearbyPokemonSettings[]> => {
        const data = await import('./nearbyPokemonSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.NearbyPokemonSettings[];
    },
    getNeutralAvatarSettings: async (): Promise<Types.NeutralAvatarSettings[]> => {
        const data = await import('./neutralAvatarSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.NeutralAvatarSettings[];
    },
    getNonCombatMoveSettings: async (): Promise<Types.NonCombatMoveSettings[]> => {
        const data = await import('./nonCombatMoveSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.NonCombatMoveSettings[];
    },
    getAvatarItemDisplay: async (): Promise<Types.AvatarItemDisplay[]> => {
        const data = await import('./avatarItemDisplay.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.AvatarItemDisplay[];
    },
    getOnboardingSettings: async (): Promise<Types.OnboardingSettings[]> => {
        const data = await import('./onboardingSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.OnboardingSettings[];
    },
    getOptimizationsProto: async (): Promise<Types.OptimizationsProto[]> => {
        const data = await import('./optimizationsProto.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.OptimizationsProto[];
    },
    getPartyDarkLaunchSettings: async (): Promise<Types.PartyDarkLaunchSettings[]> => {
        const data = await import('./partyDarkLaunchSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PartyDarkLaunchSettings[];
    },
    getPartyPlayGeneralSettings: async (): Promise<Types.PartyPlayGeneralSettings[]> => {
        const data = await import('./partyPlayGeneralSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PartyPlayGeneralSettings[];
    },
    getPartyIapBoostsSettings: async (): Promise<Types.PartyIapBoostsSettings[]> => {
        const data = await import('./partyIapBoostsSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PartyIapBoostsSettings[];
    },
    getPartyRecommendationSettings: async (): Promise<Types.PartyRecommendationSettings[]> => {
        const data = await import('./partyRecommendationSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PartyRecommendationSettings[];
    },
    getPhotoSettings: async (): Promise<Types.PhotoSettings[]> => {
        const data = await import('./photoSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PhotoSettings[];
    },
    getPhotoSetsSettingsProto: async (): Promise<Types.PhotoSetsSettingsProto[]> => {
        const data = await import('./photoSetsSettingsProto.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PhotoSetsSettingsProto[];
    },
    getPlayerBonusSystemSettings: async (): Promise<Types.PlayerBonusSystemSettings[]> => {
        const data = await import('./playerBonusSystemSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PlayerBonusSystemSettings[];
    },
    getPlayerLevel: async (): Promise<Types.PlayerLevel[]> => {
        const data = await import('./playerLevel.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PlayerLevel[];
    },
    getPokeballThrowPropertySettings: async (): Promise<Types.PokeballThrowPropertySettings[]> => {
        const data = await import('./pokeballThrowPropertySettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PokeballThrowPropertySettings[];
    },
    getPokecoinPurchaseDisplayGmt: async (): Promise<Types.PokecoinPurchaseDisplayGmt[]> => {
        const data = await import('./pokecoinPurchaseDisplayGmt.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PokecoinPurchaseDisplayGmt[];
    },
    getPokedexv2FeatureFlags: async (): Promise<Types.Pokedexv2FeatureFlags[]> => {
        const data = await import('./pokedexv2FeatureFlags.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.Pokedexv2FeatureFlags[];
    },
    getPokedexCategoriesSettings: async (): Promise<Types.PokedexCategoriesSettings[]> => {
        const data = await import('./pokedexCategoriesSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PokedexCategoriesSettings[];
    },
    getPokedexSizeStatsSystemSettings: async (): Promise<Types.PokedexSizeStatsSystemSettings[]> => {
        const data = await import('./pokedexSizeStatsSystemSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PokedexSizeStatsSystemSettings[];
    },
    getPokedexV2Settings: async (): Promise<Types.PokedexV2Settings[]> => {
        const data = await import('./pokedexV2Settings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PokedexV2Settings[];
    },
    getPokemonFxSettings: async (): Promise<Types.PokemonFxSettings[]> => {
        const data = await import('./pokemonFxSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PokemonFxSettings[];
    },
    getPokemonHomeSettings: async (): Promise<Types.PokemonHomeSettings[]> => {
        const data = await import('./pokemonHomeSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PokemonHomeSettings[];
    },
    getPokemonScaleSettings: async (): Promise<Types.PokemonScaleSettings[]> => {
        const data = await import('./pokemonScaleSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PokemonScaleSettings[];
    },
    getPokemonTagSettings: async (): Promise<Types.PokemonTagSettings[]> => {
        const data = await import('./pokemonTagSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PokemonTagSettings[];
    },
    getTypeEffective: async (): Promise<Types.TypeEffective[]> => {
        const data = await import('./typeEffective.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.TypeEffective[];
    },
    getPokemonUpgrades: async (): Promise<Types.PokemonUpgrades[]> => {
        const data = await import('./pokemonUpgrades.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PokemonUpgrades[];
    },
    getPopupControlSettings: async (): Promise<Types.PopupControlSettings[]> => {
        const data = await import('./popupControlSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PopupControlSettings[];
    },
    getPostcardCollectionSettings: async (): Promise<Types.PostcardCollectionSettings[]> => {
        const data = await import('./postcardCollectionSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PostcardCollectionSettings[];
    },
    getPowerUpPokestopsSettings: async (): Promise<Types.PowerUpPokestopsSettings[]> => {
        const data = await import('./powerUpPokestopsSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PowerUpPokestopsSettings[];
    },
    getPrimalEvoSettings: async (): Promise<Types.PrimalEvoSettings[]> => {
        const data = await import('./primalEvoSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PrimalEvoSettings[];
    },
    getQuestSettings: async (): Promise<Types.QuestSettings[]> => {
        const data = await import('./questSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.QuestSettings[];
    },
    getQuickInviteSettings: async (): Promise<Types.QuickInviteSettings[]> => {
        const data = await import('./quickInviteSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.QuickInviteSettings[];
    },
    getRaidSettings: async (): Promise<Types.RaidSettings[]> => {
        const data = await import('./raidSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.RaidSettings[];
    },
    getRaidLobbyCounterSettings: async (): Promise<Types.RaidLobbyCounterSettings[]> => {
        const data = await import('./raidLobbyCounterSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.RaidLobbyCounterSettings[];
    },
    getRecommendedSearchSettings: async (): Promise<Types.RecommendedSearchSettings[]> => {
        const data = await import('./recommendedSearchSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.RecommendedSearchSettings[];
    },
    getReferralSettings: async (): Promise<Types.ReferralSettings[]> => {
        const data = await import('./referralSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.ReferralSettings[];
    },
    getSquashSettings: async (): Promise<Types.SquashSettings[]> => {
        const data = await import('./squashSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.SquashSettings[];
    },
    getRemoteTradeSettings: async (): Promise<Types.RemoteTradeSettings[]> => {
        const data = await import('./remoteTradeSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.RemoteTradeSettings[];
    },
    getRoutesNearbyNotifSettings: async (): Promise<Types.RoutesNearbyNotifSettings[]> => {
        const data = await import('./routesNearbyNotifSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.RoutesNearbyNotifSettings[];
    },
    getRoutesPartyPlayInteropSettings: async (): Promise<Types.RoutesPartyPlayInteropSettings[]> => {
        const data = await import('./routesPartyPlayInteropSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.RoutesPartyPlayInteropSettings[];
    },
    getRouteBadgeSettings: async (): Promise<Types.RouteBadgeSettings[]> => {
        const data = await import('./routeBadgeSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.RouteBadgeSettings[];
    },
    getRouteCreationSettings: async (): Promise<Types.RouteCreationSettings[]> => {
        const data = await import('./routeCreationSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.RouteCreationSettings[];
    },
    getRouteDiscoverySettings: async (): Promise<Types.RouteDiscoverySettings[]> => {
        const data = await import('./routeDiscoverySettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.RouteDiscoverySettings[];
    },
    getRoutePinSettings: async (): Promise<Types.RoutePinSettings[]> => {
        const data = await import('./routePinSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.RoutePinSettings[];
    },
    getRoutePlaySettings: async (): Promise<Types.RoutePlaySettings[]> => {
        const data = await import('./routePlaySettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.RoutePlaySettings[];
    },
    getRouteStampCategorySettings: async (): Promise<Types.RouteStampCategorySettings[]> => {
        const data = await import('./routeStampCategorySettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.RouteStampCategorySettings[];
    },
    getSettingsOverrideRule: async (): Promise<Types.SettingsOverrideRule[]> => {
        const data = await import('./settingsOverrideRule.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.SettingsOverrideRule[];
    },
    getSharedFusionSettings: async (): Promise<Types.SharedFusionSettings[]> => {
        const data = await import('./sharedFusionSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.SharedFusionSettings[];
    },
    getSharedMoveSettings: async (): Promise<Types.SharedMoveSettings[]> => {
        const data = await import('./sharedMoveSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.SharedMoveSettings[];
    },
    getSourdoughMoveMappingSettings: async (): Promise<Types.SourdoughMoveMappingSettings[]> => {
        const data = await import('./sourdoughMoveMappingSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.SourdoughMoveMappingSettings[];
    },
    getGenderSettings: async (): Promise<Types.GenderSettings[]> => {
        const data = await import('./genderSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.GenderSettings[];
    },
    getSpecialEggSettings: async (): Promise<Types.SpecialEggSettings[]> => {
        const data = await import('./specialEggSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.SpecialEggSettings[];
    },
    getSponsoredGeofenceGiftSettings: async (): Promise<Types.SponsoredGeofenceGiftSettings[]> => {
        const data = await import('./sponsoredGeofenceGiftSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.SponsoredGeofenceGiftSettings[];
    },
    getStampCollectionSettings: async (): Promise<Types.StampCollectionSettings[]> => {
        const data = await import('./stampCollectionSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.StampCollectionSettings[];
    },
    getStationedPokemonTableSettings: async (): Promise<Types.StationedPokemonTableSettings[]> => {
        const data = await import('./stationedPokemonTableSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.StationedPokemonTableSettings[];
    },
    getStickerMetadata: async (): Promise<Types.StickerMetadata[]> => {
        const data = await import('./stickerMetadata.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.StickerMetadata[];
    },
    getStyleShopSettings: async (): Promise<Types.StyleShopSettings[]> => {
        const data = await import('./styleShopSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.StyleShopSettings[];
    },
    getInAppSurveySettings: async (): Promise<Types.InAppSurveySettings[]> => {
        const data = await import('./inAppSurveySettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.InAppSurveySettings[];
    },
    getTappableSettings: async (): Promise<Types.TappableSettings[]> => {
        const data = await import('./tappableSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.TappableSettings[];
    },
    getTemporaryEvolutionSettings: async (): Promise<Types.TemporaryEvolutionSettings[]> => {
        const data = await import('./temporaryEvolutionSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.TemporaryEvolutionSettings[];
    },
    getTicketGiftingSettings: async (): Promise<Types.TicketGiftingSettings[]> => {
        const data = await import('./ticketGiftingSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.TicketGiftingSettings[];
    },
    getTodayViewSettings: async (): Promise<Types.TodayViewSettings[]> => {
        const data = await import('./todayViewSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.TodayViewSettings[];
    },
    getCombatNpcTrainer: async (): Promise<Types.CombatNpcTrainer[]> => {
        const data = await import('./combatNpcTrainer.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.CombatNpcTrainer[];
    },
    getCombatNpcPersonality: async (): Promise<Types.CombatNpcPersonality[]> => {
        const data = await import('./combatNpcPersonality.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.CombatNpcPersonality[];
    },
    getTutorialSettings: async (): Promise<Types.TutorialSettings[]> => {
        const data = await import('./tutorialSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.TutorialSettings[];
    },
    getPokemonFamily: async (): Promise<Types.PokemonFamily[]> => {
        const data = await import('./pokemonFamily.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PokemonFamily[];
    },
    getPokemonSettings: async (): Promise<Types.PokemonSettings[]> => {
        const data = await import('./pokemonSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PokemonSettings[];
    },
    getMoveSettings: async (): Promise<Types.MoveSettings[]> => {
        const data = await import('./moveSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.MoveSettings[];
    },
    getPokemonHomeFormReversions: async (): Promise<Types.PokemonHomeFormReversions[]> => {
        const data = await import('./pokemonHomeFormReversions.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.PokemonHomeFormReversions[];
    },
    getVerboseLogCombatSettings: async (): Promise<Types.VerboseLogCombatSettings[]> => {
        const data = await import('./verboseLogCombatSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.VerboseLogCombatSettings[];
    },
    getVerboseLogRaidSettings: async (): Promise<Types.VerboseLogRaidSettings[]> => {
        const data = await import('./verboseLogRaidSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.VerboseLogRaidSettings[];
    },
    getVistaGeneralSettings: async (): Promise<Types.VistaGeneralSettings[]> => {
        const data = await import('./vistaGeneralSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.VistaGeneralSettings[];
    },
    getBattleAnimationSettings: async (): Promise<Types.BattleAnimationSettings[]> => {
        const data = await import('./battleAnimationSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.BattleAnimationSettings[];
    },
    getVsSeekerClientSettings: async (): Promise<Types.VsSeekerClientSettings[]> => {
        const data = await import('./vsSeekerClientSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.VsSeekerClientSettings[];
    },
    getVsSeekerLoot: async (): Promise<Types.VsSeekerLoot[]> => {
        const data = await import('./vsSeekerLoot.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.VsSeekerLoot[];
    },
    getVsSeekerPokemonRewards: async (): Promise<Types.VsSeekerPokemonRewards[]> => {
        const data = await import('./vsSeekerPokemonRewards.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.VsSeekerPokemonRewards[];
    },
    getVsSeekerScheduleSettings: async (): Promise<Types.VsSeekerScheduleSettings[]> => {
        const data = await import('./vsSeekerScheduleSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.VsSeekerScheduleSettings[];
    },
    getWeatherAffinities: async (): Promise<Types.WeatherAffinities[]> => {
        const data = await import('./weatherAffinities.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.WeatherAffinities[];
    },
    getWeatherBonusSettings: async (): Promise<Types.WeatherBonusSettings[]> => {
        const data = await import('./weatherBonusSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.WeatherBonusSettings[];
    },
    getAvatarStoreFooterFlags: async (): Promise<Types.AvatarStoreFooterFlags[]> => {
        const data = await import('./avatarStoreFooterFlags.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.AvatarStoreFooterFlags[];
    },
    getAvatarStoreSubcategoryFilteringFlags: async (): Promise<Types.AvatarStoreSubcategoryFilteringFlags[]> => {
        const data = await import('./avatarStoreSubcategoryFilteringFlags.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.AvatarStoreSubcategoryFilteringFlags[];
    },
    getImpressionTrackingSettings: async (): Promise<Types.ImpressionTrackingSettings[]> => {
        const data = await import('./impressionTrackingSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.ImpressionTrackingSettings[];
    },
    getMoveSequenceSettings: async (): Promise<Types.MoveSequenceSettings[]> => {
        const data = await import('./moveSequenceSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.MoveSequenceSettings[];
    },
    getStickerCategorySettings: async (): Promise<Types.StickerCategorySettings[]> => {
        const data = await import('./stickerCategorySettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.StickerCategorySettings[];
    },
    getUsernameSuggestionSettings: async (): Promise<Types.UsernameSuggestionSettings[]> => {
        const data = await import('./usernameSuggestionSettings.json', {
            assert: { type: 'json' },
        });
        return (data.default || data) as unknown as Types.UsernameSuggestionSettings[];
    },
};
