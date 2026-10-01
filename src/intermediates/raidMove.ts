// src/intermediates/pokemonSetting.intermediate.ts
import { MoveSettings } from '#generated/data/api/raw.type.js';
import { RawGameMaster } from '#generated/raw.index.js';
import { IntermediateGenerator } from '../type/intermediateGenerator.js';
import { pokeApiClient } from '../utils/pokeApiClient.js';
import { pokemonTypeToFrench } from '../utils/utils.js';

export default class PokemonSettingIntermediate extends IntermediateGenerator {
    getName(): string {
        return 'raid-move';
    }

    async getMoveFrenchName(move: any) {
        const englishName = move.data.vfxName.replace('_fast', '').slugify();
        const data = await pokeApiClient.fetchMove(englishName);
        const frenchName = data?.names.find((n: any) => n.language.name === 'fr')?.name;
        const baseName = frenchName ?? englishName.titleCase();

        const suffix = move.data.movementId.slugifyIncludes('TEMP_EVOLUTION')
            ? '+'
            : '+'.repeat(move.data.movementId.split('PLUS').length - 1);

        return baseName + suffix;
    }

    async compute(): Promise<any> {
        const raw = await RawGameMaster.getMoveSettings();

        // const isDynamaxMove = (move: MoveSettings) => 'obMoveSettingsNumber18' in move.data
        const isDynamaxMove = (move: MoveSettings) => move.templateId.includes('VN_BM');
        const isFastMove = (move: MoveSettings) => move.templateId.includes('FAST');
        const ischargedMove = (move: MoveSettings) =>
            !isDynamaxMove(move) && !move.templateId.includes('FAST');

        const fastMove = (
            await Promise.all(
                raw
                    .filter((move) => isFastMove(move))
                    .map(async (move) => ({
                        id: move.templateId,
                        movementId: move.data.movementId,
                        pokemonType: pokemonTypeToFrench(move.data.pokemonType),
                        power: move.data.power ?? 0,
                        durationMs: move.data.durationMs,
                        energyDelta: move.data.energyDelta ?? 0,
                        vfxName: move.data.vfxName,
                        names: {
                            fr: await this.getMoveFrenchName(move),
                        },
                    })),
            )
        ).toObject((move) => move.movementId);

        const chargedMove = (
            await Promise.all(
                raw
                    .filter((move) => ischargedMove(move))
                    .map(async (move) => ({
                        id: move.templateId,
                        movementId: move.data.movementId,
                        pokemonType: pokemonTypeToFrench(move.data.pokemonType),
                        power: move.data.power ?? 0,
                        durationMs: move.data.durationMs,
                        energyDelta: move.data.energyDelta ?? 0,
                        vfxName: move.data.vfxName,
                        names: {
                            fr: await this.getMoveFrenchName(move),
                        },
                    })),
            )
        ).toObject((move) => move.movementId);

        // const dynamaxMove = (
        //     await Promise.all(
        //         raw
        //             .filter((move) => 'obMoveSettingsNumber18' in move.data)
        //             .map(async (move) => ({
        //                 id: move.templateId,
        //                 movementId: move.data.movementId,
        //                 pokemonType: pokemonTypeToFrench(move.data.pokemonType),
        //                 powerLevels: move.data.obMoveSettingsNumber18,
        //                 vfxName: move.data.vfxName,
        //                 names: {
        //                     fr: await this.getMoveFrenchName(move),
        //                 },
        //             })),
        //     )
        // ).toObject((move) => move.movementId);

        const healAndGuardPowers = [1, 0, 0, 0];
        const dynamaxAttackPowers = [250, 300, 350, 450];
        const gigamaxAttackPowers = [350, 400, 450, 550];

        const isGigamax = (move: MoveSettings) =>
            move.data.vfxName.includes('max_dynamax_cannon') || move.data.vfxName.includes('gmax');
        const isHealOrGuard = (move: MoveSettings) =>
            move.data.vfxName.includes('max_shield') || move.data.vfxName.includes('max_heal');

        const getPowerLevels = (move: MoveSettings) =>
            isGigamax(move)
                ? gigamaxAttackPowers
                : isHealOrGuard(move)
                  ? healAndGuardPowers
                  : dynamaxAttackPowers;

        const dynamaxMove = (
            await Promise.all(
                raw
                    .filter((move) => isDynamaxMove(move))
                    .map(async (move) => ({
                        id: move.templateId,
                        movementId: move.data.movementId,
                        pokemonType: pokemonTypeToFrench(move.data.pokemonType),
                        powerLevels: getPowerLevels(move),
                        vfxName: move.data.vfxName,
                        names: {
                            fr: await this.getMoveFrenchName(move),
                        },
                    })),
            )
        ).toObject((move) => move.movementId);

        return { fastMove, chargedMove, dynamaxMove };
    }
}
