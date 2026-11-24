import { PokemonSetting, RaidMove } from '#generated/data/api/intermediate.type.js';
import { IntermediateData } from '#generated/intermediate.index.js';
import { RawGameMaster } from '#generated/raw.index.js';
import { FileGenerator } from '../type/fileGenerator.js';
import { pokeApiClient } from '../utils/pokeApiClient.js';
import { pokemonTypeToFrench } from '../utils/utils.js';

const GIGAMAX_NOT_RELEASED = [
    'MELMETAL',
    'CORVIKNIGHT',
    'ORBEETLE',
    'DREDNAW',
    'COALOSSAL',
    'FLAPPLE',
    'APPLETUN',
    'SANDACONDA',
    'CENTISKORCH',
    'HATTERENE',
    'ALCREMIE',
    'COPPERAJAH',
    'URSHIFU',
];
const OTHER_FORM_IDS = ['zacian', 'zamazenta', 'eternatus'];

type DynamaxMove = RaidMove['dynamaxMove'][string];
export default class PokemonSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'dynamax.json';
    }

    async getFileContent(): Promise<any> {
        const [mappingGigamax, mappingDynamax, rawExtendedSettings, pokemonSettings, raidMove] =
            await Promise.all([
                RawGameMaster.getSourdoughMoveMappingSettings().then((r) => r[0].data.mappings),
                RawGameMaster.getBreadMoveMappings().then((r) => r[0].data.mappings),
                RawGameMaster.getPokemonExtendedSettings(),
                IntermediateData.getPokemonSetting(),
                IntermediateData.getRaidMove(),
            ]);

        const resolveSettings = (pokemon: {
            uniqueId: string;
            form: string | undefined;
        }): PokemonSetting[] => {
            const setting = pokemonSettings.find((s) => s.base.pokemonId === pokemon.uniqueId);
            const finalForm = (
                pokemon.form
                    ? setting?.different.find((p) => p.base.form === pokemon.form)
                    : setting
            ) as PokemonSetting;
            return pokemon.uniqueId === 'URSHIFU'
                ? ((finalForm?.different as any as PokemonSetting[]) ?? [])
                : finalForm
                  ? [finalForm]
                  : [];
        };

        const getIdGigamax = async (pokemon: PokemonSetting) => {
            const dexNumber: number = pokemon.base.dexNumber;
            const data = await pokeApiClient.fetchPokemonSpecies(dexNumber);
            const name = pokemon.base.form === 'base' ? pokemon.base.pokemonId : pokemon.base.form;

            return +(
                data?.varieties
                    ?.filter(
                        (variety: any) =>
                            variety.pokemon.name.includes('gmax') &&
                            variety.pokemon.name.includes(name.kebabCase()),
                    )?.[0]
                    ?.pokemon.url.split('/')
                    ?.filter(Boolean)
                    ?.last() || dexNumber
            );
        };

        // const idsWithBreadMode = (mode: string) =>
        //     rawExtendedSettings
        //         .filter((p) => p.data.breadOverrides?.some((b) => b.breadMode === mode))
        //         .map((p) => ({ uniqueId: p.data.uniqueId, form: p.data.form })) //uniqueId)
        //         .unique();

        const idsWithBreadMode = (mode: string) => {
            const seen = new Map<string, { uniqueId: string; form: string | undefined }>();
            for (const p of rawExtendedSettings) {
                if (!p.data.breadOverrides?.some((b) => b.breadMode === mode)) continue;
                const key = `${p.data.uniqueId}|${p.data.form ?? ''}`;
                if (!seen.has(key)) {
                    seen.set(key, { uniqueId: p.data.uniqueId, form: p.data.form });
                }
            }
            return [...seen.values()];
        };

        const otherForms = OTHER_FORM_IDS.map((id) => {
            const setting = pokemonSettings.find((p) => p.base.pokemonId.slugifyEquals(id));
            if (id === 'eternatus') return setting;
            const crownedForm = `${id.toUpperCase()}_CROWNED`;
            return setting?.different.find((f) => f.base.form.slugifyEquals(crownedForm));
        }).compact() as PokemonSetting[];

        const quickMoves = (pokemon: PokemonSetting) =>
            pokemon.base.quickMoves
                .concat(pokemon.base.eliteQuickMove)
                .map((move) => raidMove.fastMove[move]);

        const dynamaxMoveByType = (pokemon: PokemonSetting) =>
            quickMoves(pokemon)
                .map((move) => move.pokemonType)
                .unique()
                .map(
                    (type) =>
                        mappingDynamax.find((m) => pokemonTypeToFrench(m.type) === (type as string))
                            ?.move ?? '',
                )
                .map((move) => raidMove.dynamaxMove[move]);

        const dynamaxMoveByMapping = (pokemon: PokemonSetting) => [
            raidMove.dynamaxMove[
                mappingGigamax.find((m) =>
                    m?.form?.includes('URSHIFU')
                        ? m.form === pokemon.base.form
                        : m.pokemonId === pokemon.base.pokemonId,
                )?.move ?? ''
            ],
        ];

        const NORMAL_MOVE_POWER = 250;
        const isGigamaxMove = (dynamaxMove: DynamaxMove[]) =>
            (dynamaxMove[0]?.powerLevels?.[0] ?? NORMAL_MOVE_POWER) !== NORMAL_MOVE_POWER;
        const toOutput = async (
            pokemon: PokemonSetting,
            dynamaxMove: DynamaxMove[],
            isReleased?: boolean,
        ) => {
            const imageId = isGigamaxMove(dynamaxMove)
                ? await getIdGigamax(pokemon)
                : pokemon.base.imageId;
            return {
                pokemonId: pokemon.base.pokemonId,
                name: pokemon.base.name,
                dexNumber: pokemon.base.dexNumber,
                image: `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/other/official-artwork/${imageId}.png`,
                imageShiny: `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/other/official-artwork/shiny/${imageId}.png`,
                slug: pokemon.base.slug,
                types: pokemon.base.types,
                stats: pokemon.base.stats,
                quickMoves: quickMoves(pokemon).toObject((move) => move.movementId),
                dynamaxMove,
                familyId: pokemon.base.family,
                form: pokemon.base.form,
                ...(isReleased !== undefined && { isReleased }),
            };
        };

        // Dynamax : formes sans évolution
        const dynamax = Promise.all(
            idsWithBreadMode('BREAD_MODE')
                .flatMap(resolveSettings)
                .filter((pokemon) => pokemon.base.evolutionIds.length === 0)
                .map((pokemon) => toOutput(pokemon, dynamaxMoveByType(pokemon))),
        );

        const gigamaxIds = idsWithBreadMode('BREAD_DOUGH_MODE');

        // Gigamax non sortis (liste fixe)
        const gigamaxNotReleased = Promise.all(
            GIGAMAX_NOT_RELEASED.map((gigamax) => ({ uniqueId: gigamax, form: undefined }))
                .flatMap(resolveSettings)
                .map((pokemon) => toOutput(pokemon, dynamaxMoveByMapping(pokemon), false)),
        );

        // Gigamax sortis
        const gigamaxReleased = Promise.all(
            gigamaxIds
                .filter((pokemon) => pokemon.uniqueId !== 'URSHIFU') // TODO: retirer quand sorti
                .flatMap(resolveSettings)
                .concat(otherForms)
                .map((pokemon) => toOutput(pokemon, dynamaxMoveByMapping(pokemon), true)),
        );

        const [dynamaxResult, gigamaxReleasedResult, gigamaxNotReleasedResult] = await Promise.all([
            dynamax,
            gigamaxReleased,
            gigamaxNotReleased,
        ]);

        return dynamaxResult.concat(gigamaxReleasedResult, gigamaxNotReleasedResult);
    }
}
