// src/intermediates/pokemonSetting.intermediate.ts
import { RawGameMaster } from '#generated/raw.index.js';
import { IntermediateGenerator } from '../type/intermediateGenerator.js';
import { pokemonTypeToFrench } from '../utils/utils.js';

export default class PokemonSettingIntermediate extends IntermediateGenerator {
    getName(): string {
        return 'raid-move';
    }

    async compute(): Promise<any> {
        const raw = await RawGameMaster.getMoveSettings();

        const fastMove = raw
            .filter((move) => move.templateId.includes('FAST'))
            .map((move) => ({
                id: move.templateId,
                movementId: move.data.movementId,
                pokemonType: pokemonTypeToFrench(move.data.pokemonType),
                power: move.data.power,
                durationMs: move.data.durationMs,
                energyDelta: move.data.energyDelta,
                vfxName: move.data.vfxName,
            }))
            .toObject((move) => move.movementId);

        const chargedMove = raw
            .filter(
                (move) =>
                    !('obMoveSettingsNumber18' in move.data) && !move.templateId.includes('FAST'),
            )
            .map((move) => ({
                id: move.templateId,
                movementId: move.data.movementId,
                pokemonType: pokemonTypeToFrench(move.data.pokemonType),
                power: move.data.power,
                durationMs: move.data.durationMs,
                energyDelta: move.data.energyDelta,
                vfxName: move.data.vfxName,
            }))
            .toObject((move) => move.movementId);

        const dynamaxMove = raw
            .filter((move) => 'obMoveSettingsNumber18' in move.data)
            .map((move) => ({
                id: move.templateId,
                movementId: move.data.movementId,
                pokemonType: pokemonTypeToFrench(move.data.pokemonType),
                powerLevels: move.data.obMoveSettingsNumber18,
                vfxName: move.data.vfxName,
            }))
            .toObject((move) => move.movementId);

        return { fastMove, chargedMove, dynamaxMove };
    }
}
