import { PokemonSetting } from '@generated/data/api/intermediate.type.js';
import {
    BreadPokemonScalingSettings,
    PokemonExtendedSettings,
    PokemonSettings,
    SourdoughMoveMappingSettings,
} from '@generated/data/api/raw.type.js';
import { IntermediateData } from '@generated/intermediate.index.js';
import { RawGameMaster } from '@generated/raw.index.js';
import { FileGenerator } from '../type/fileGenerator.js';

export default class PokemonSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'dynamax.json';
    }

    async getFileContent(): Promise<any> {
        const rawMappingGigamax: SourdoughMoveMappingSettings[] =
            await RawGameMaster.getSourdoughMoveMappingSettings(); // mapping gigamax
        const rawDynamax2: BreadPokemonScalingSettings[] =
            await RawGameMaster.getBreadPokemonScalingSettings(); // is Dynamax File
        const rawDynamax: PokemonExtendedSettings[] =
            await RawGameMaster.getPokemonExtendedSettings(); // is Dynamax File
        const rawPokemonSetting: PokemonSettings[] = await RawGameMaster.getPokemonSettings();
        const intermediatePokemonSetting: PokemonSetting[] =
            await IntermediateData.getPokemonSetting();

        const raidMove = await IntermediateData.getRaidMove();

        const dynamax = rawDynamax2[0].data.visualSettings
            .filter((visual) =>
                visual.pokemonFormData.some((form) =>
                    form.visualData.some((data) => data.breadMode === 'BREAD_MODE'),
                ),
            )
            .map((visual) => visual.pokemonId);
        const gigamax = rawDynamax2[0].data.visualSettings
            .filter((visual) =>
                visual.pokemonFormData.some((form) =>
                    form.visualData.some((data) => data.breadMode === 'BREAD_DOUGH_MODE'),
                ),
            )
            .map((visual) => visual.pokemonId);
        const dynamax2 = rawDynamax
            .filter((pokemon) =>
                pokemon.data.breadOverrides?.some((bread) => bread.breadMode === 'BREAD_MODE'),
            )
            .map((data) => data.data.uniqueId)
            .unique();
        const gigamax2 = rawDynamax
            .filter((pokemon) =>
                pokemon.data.breadOverrides?.some(
                    (bread) => bread.breadMode === 'BREAD_DOUGH_MODE',
                ),
            )
            .map((data) => data.data.uniqueId)
            .unique();
        const dynamaxFinal = dynamax2
            .map((pokemonId) =>
                rawPokemonSetting.find((setting) => setting.data.pokemonId === pokemonId),
            )
            .map((pokemon) => ({
                pokemonId: pokemon?.data.pokemonId,
                stats: pokemon?.data.stats,
                quickMoves: pokemon?.data.quickMoves,
                familyId: pokemon?.data.familyId,
                evolutionIds: pokemon?.data.evolutionBranch?.map((branch) => branch.evolution),
            }));
        const dynamaxFinal2 = dynamax2
            .map((pokemonId) =>
                intermediatePokemonSetting.find((setting) => setting.base.pokemonId === pokemonId),
            )
            .map((pokemon) => ({
                pokemonId: pokemon?.base.pokemonId,
                name: pokemon?.base.name,
                slug: pokemon?.base.slug,
                stats: pokemon?.base.stats,
                quickMoves: pokemon?.base.quickMoves
                    .map((move) => raidMove.fastMove[move])
                    .toObject((move) => move.movementId),
                familyId: pokemon?.base.family,
                evolutionIds: pokemon?.base.evolutionIds,
            }));
        const final = [dynamax2, gigamax2];
        return dynamaxFinal2;
    }
}
