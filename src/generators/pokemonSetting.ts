import { RawGameMaster } from '../../generated/index.js';
import { FileGenerator } from '../type/fileGenerator.js';

export default class PokemonSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'pokemon-setting.json';
    }
    async getFileContent(): Promise<string> {
        const raw = await RawGameMaster.getPokemonSettings();
        const pokemons = raw
            // .filter((pokemon) => !pokemon.templateId.endsWith(pokemon.data.pokemonId))
            .map((pokemon) => ({
                id: pokemon.templateId,
                pokemonId: pokemon.data.pokemonId,
                type: pokemon.data.type,
                type2: pokemon.data.type2,
                stats: pokemon.data.stats,
                quickMoves: pokemon.data.quickMoves ?? [],
                cinematicMoves: pokemon.data.cinematicMoves,
                eliteQuickMove: pokemon.data.eliteQuickMove,
                eliteCinematicMove: pokemon.data.eliteCinematicMove,
                evolutionIds: pokemon.data.evolutionIds,
                familyId: pokemon.data.familyId,
                pokemonClass: pokemon.data.pokemonClass,
                nonTmCinematicMoves: pokemon.data.nonTmCinematicMoves,
                encounter: {
                    stardustCaptureReward:
                        (pokemon.data.encounter.bonusStardustCaptureReward ?? 0) + 100,
                },
            }))
            .groupBy('pokemonId')
            .toList('values');

        const finalPokemon = pokemons.map((pokemonForms) => {
            const pokemonId = pokemonForms[0].pokemonId;
            const familyId = pokemonForms[0].familyId;
            const id = +pokemonForms[0].id.split('_')[0].slice(1);

            const hasNormalForm =
                pokemonForms.filter((form) => form.id.endsWith('NORMAL')).length >= 1;
            const baseForm = pokemonForms
                .filter((form) => form.id.endsWith(form.pokemonId))
                .first();
            const extractFormName = (form: any) => {
                const index = form.id.indexOf(pokemonId);
                let result = 'empty';
                if (index !== -1) {
                    result = form.id.slice(index + pokemonId.length);
                }
                return result.slugify();
            };
            const withoutId = (obj: any) => {
                const { id, ...rest } = obj;
                return rest;
            };
            const baseFormName = hasNormalForm
                ? 'normal'
                : extractFormName(
                      pokemonForms
                          .filter(({ id, ...form }) => {
                              return form.deepEquals(withoutId(baseForm));
                          })
                          .last() ?? baseForm,
                  );
            const formsList = pokemonForms
                .filter((form) => !form.id.endsWith(form.pokemonId))
                .map(({ pokemonId, familyId, ...rest }) => ({
                    ...rest,
                    formName: extractFormName(rest),
                }));
            const forms = formsList.reduce((acc: any, obj) => {
                const name = extractFormName(obj);
                acc[name] = obj;
                return acc;
            }, {});
            const finalPokemon = {
                pokemonId,
                familyId,
                id,
                baseFormName,
                forms,
            };
            return finalPokemon;
        });
        return JSON.stringify(finalPokemon, null, 2);
    }
}
