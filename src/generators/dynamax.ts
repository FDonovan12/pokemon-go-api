import { PokemonSetting } from '#generated/data/api/intermediate.type.js';
import { PokemonExtendedSettings } from '#generated/data/api/raw.type.js';
import { IntermediateData } from '#generated/intermediate.index.js';
import { RawGameMaster } from '#generated/raw.index.js';
import { FileGenerator } from '../type/fileGenerator.js';

export default class PokemonSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'dynamax.json';
    }

    async getFileContent(): Promise<any> {
        const rawMappingGigamax = (await RawGameMaster.getSourdoughMoveMappingSettings())[0].data
            .mappings;
        const rawMappingMoveDynamax = (await RawGameMaster.getBreadMoveMappings())[0].data.mappings;
        const rawDynamax: PokemonExtendedSettings[] =
            await RawGameMaster.getPokemonExtendedSettings(); // is Dynamax File
        const intermediatePokemonSetting: PokemonSetting[] =
            await IntermediateData.getPokemonSetting();

        const raidMove = await IntermediateData.getRaidMove();

        const dynamax = rawDynamax
            .filter((pokemon) =>
                pokemon.data.breadOverrides?.some((bread) => bread.breadMode === 'BREAD_MODE'),
            )
            .map((data) => data.data.uniqueId)
            .unique();
        const gigamax = rawDynamax
            .filter((pokemon) =>
                pokemon.data.breadOverrides?.some(
                    (bread) => bread.breadMode === 'BREAD_DOUGH_MODE',
                ),
            )
            .map((data) => data.data.uniqueId)
            .unique();
        const dynamaxFinal2 = dynamax
            .flatMap((pokemonId) => {
                if (pokemonId === 'URSHIFU') {
                    return intermediatePokemonSetting.find(
                        (setting) => setting.base.pokemonId === pokemonId,
                    )?.different;
                }
                return intermediatePokemonSetting.find(
                    (setting) => setting.base.pokemonId === pokemonId,
                );
            })
            .compact()
            .filter((pokemon) => pokemon.base.evolutionIds.length === 0)
            .map((pokemon) => ({
                pokemonId: pokemon?.base.pokemonId,
                name: pokemon?.base.name,
                slug: pokemon?.base.slug,
                stats: pokemon?.base.stats,
                quickMoves: pokemon?.base.quickMoves
                    .map((move) => raidMove.fastMove[move])
                    .toObject((move) => move.movementId),
                dynamaxMove: pokemon?.base.quickMoves
                    .map((move) => raidMove.fastMove[move])
                    .map((move) => move.pokemonType)
                    .unique()
                    .map(
                        (type) =>
                            rawMappingMoveDynamax.find((move) => move.type === (type as string))
                                ?.move ?? '',
                    )
                    .map((move) => raidMove.dynamaxMove[move]),
                familyId: pokemon?.base.family,
            }));

        const otherPokemons = intermediatePokemonSetting.filter((pokemon) =>
            pokemon.base.pokemonId.slugifyIn(['zacian', 'zamazenta', 'eternatus']),
        );
        const zacian = otherPokemons
            .find((pokemon) => pokemon.base.pokemonId.slugifyEquals('zacian'))
            ?.different.find((form) => form.base.form.slugifyEquals('ZACIAN_CROWNED'));
        const zamazenta = otherPokemons
            .find((pokemon) => pokemon.base.pokemonId.slugifyEquals('zamazenta'))
            ?.different.find((form) => form.base.form.slugifyEquals('ZAMAZENTA_CROWNED'));
        const eternatus = otherPokemons.find((pokemon) =>
            pokemon.base.pokemonId.slugifyEquals('eternatus'),
        );
        const other = [zacian, zamazenta, eternatus].compact();
        const gigamaxFinal2 = gigamax
            .flatMap((pokemonId) => {
                if (pokemonId === 'URSHIFU') {
                    return intermediatePokemonSetting.find(
                        (setting) => setting.base.pokemonId === pokemonId,
                    )?.different;
                }
                return intermediatePokemonSetting.find(
                    (setting) => setting.base.pokemonId === pokemonId,
                );
            })
            .compact()
            .filter((pokemon) => pokemon.base.evolutionIds.length === 0)
            .concat(other)
            .map((pokemon) => ({
                pokemonId: pokemon?.base.pokemonId,
                name: pokemon?.base.name,
                slug: pokemon?.base.slug,
                stats: pokemon?.base.stats,
                quickMoves: pokemon?.base.quickMoves
                    .map((move) => raidMove.fastMove[move])
                    .toObject((move) => move.movementId),
                dynamaxMove: [
                    raidMove.dynamaxMove[
                        rawMappingGigamax.find(
                            (mapping) =>
                                mapping.form === pokemon?.base.form ||
                                mapping.pokemonId === pokemon.base.pokemonId,
                        )?.move ?? ''
                    ],
                ],
                familyId: pokemon?.base.family,
            }));

        return dynamaxFinal2.concat(gigamaxFinal2);
    }
}
