// src/intermediates/pokemonSetting.intermediate.ts
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

        const fastMove = (
            await Promise.all(
                raw
                    .filter((move) => move.templateId.includes('FAST'))
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
                    .filter(
                        (move) =>
                            !('obMoveSettingsNumber18' in move.data) &&
                            !move.templateId.includes('FAST'),
                    )
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

        const dynamaxMove = (
            await Promise.all(
                raw
                    .filter((move) => 'obMoveSettingsNumber18' in move.data)
                    .map(async (move) => ({
                        id: move.templateId,
                        movementId: move.data.movementId,
                        pokemonType: pokemonTypeToFrench(move.data.pokemonType),
                        powerLevels: move.data.obMoveSettingsNumber18,
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
