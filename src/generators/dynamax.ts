import { PokemonSetting } from '#generated/data/api/intermediate.type.js';
import { IntermediateData } from '#generated/intermediate.index.js';
import { RawGameMaster } from '#generated/raw.index.js';
import { FileGenerator } from '../type/fileGenerator.js';

const DYNAMAX_NOT_RELEASED = ['GYARADOS'];
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
    'DURALUDON',
    'URSHIFU',
];
const OTHER_FORM_IDS = ['zacian', 'zamazenta', 'eternatus'];

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

        const resolveSettings = (pokemonId: string): PokemonSetting[] => {
            const setting = pokemonSettings.find((s) => s.base.pokemonId === pokemonId)!;
            return pokemonId === 'URSHIFU'
                ? (setting?.different as PokemonSetting[])
                : setting
                  ? [setting]
                  : [];
        };

        const idsWithBreadMode = (mode: string) =>
            rawExtendedSettings
                .filter((p) => p.data.breadOverrides?.some((b) => b.breadMode === mode))
                .map((p) => p.data.uniqueId)
                .unique();

        const otherForms = OTHER_FORM_IDS.map((id) => {
            const setting = pokemonSettings.find((p) => p.base.pokemonId.slugifyEquals(id));
            if (id === 'eternatus') return setting;
            const crownedForm = `${id.toUpperCase()}_CROWNED`;
            return setting?.different.find((f) => f.base.form.slugifyEquals(crownedForm));
        }).compact() as PokemonSetting[];

        const quickMoves = (pokemon: PokemonSetting) =>
            pokemon.base.quickMoves.map((move) => raidMove.fastMove[move]);

        const dynamaxMoveByType = (pokemon: PokemonSetting) =>
            quickMoves(pokemon)
                .map((move) => move.pokemonType)
                .unique()
                .map((type) => mappingDynamax.find((m) => m.type === (type as string))?.move ?? '')
                .map((move) => raidMove.dynamaxMove[move]);

        const dynamaxMoveByMapping = (pokemon: PokemonSetting) => [
            raidMove.dynamaxMove[
                mappingGigamax.find(
                    (m) => m.form === pokemon.base.form || m.pokemonId === pokemon.base.pokemonId,
                )?.move ?? ''
            ],
        ];

        const toOutput = (
            pokemon: PokemonSetting,
            dynamaxMove: unknown[],
            isReleased?: boolean,
        ) => ({
            pokemonId: pokemon.base.pokemonId,
            name: pokemon.base.name,
            slug: pokemon.base.slug,
            stats: pokemon.base.stats,
            quickMoves: quickMoves(pokemon).toObject((move) => move.movementId),
            dynamaxMove,
            familyId: pokemon.base.family,
            ...(isReleased !== undefined && { isReleased }),
        });

        // Dynamax : formes sans évolution
        const dynamax = idsWithBreadMode('BREAD_MODE')
            .flatMap(resolveSettings)
            .filter((pokemon) => pokemon.base.evolutionIds.length === 0)
            .map((pokemon) => toOutput(pokemon, dynamaxMoveByType(pokemon)));

        const gigamaxIds = idsWithBreadMode('BREAD_DOUGH_MODE');

        // Gigamax non sortis (liste fixe + formes spéciales)
        const gigamaxNotReleased = GIGAMAX_NOT_RELEASED.flatMap(resolveSettings).map((pokemon) =>
            toOutput(pokemon, dynamaxMoveByMapping(pokemon), false),
        );

        // Gigamax sortis
        const gigamaxReleased = gigamaxIds
            .filter((id) => id !== 'URSHIFU') // TODO: retirer quand sorti
            .flatMap(resolveSettings)
            .concat(otherForms)
            .map((pokemon) => toOutput(pokemon, dynamaxMoveByMapping(pokemon), true));

        return dynamax.concat(gigamaxReleased, gigamaxNotReleased);
    }
}
