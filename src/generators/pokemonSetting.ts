import { RawGameMaster } from '../../generated/index.js';
import { FileGenerator } from '../type/fileGenerator.js';
import { PokemonSettings } from '../types.js';

export default class PokemonSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'pokemon-setting.json';
    }

    private extractPokemonIdNumber(templateId: string): number {
        return +templateId.split('_')[0].slice(1);
    }

    private getFormNotCostume() {
        return ['alola', 'galar', 'normal'];
    }

    private extractFormNameFromForm(pokemon: PokemonSettings): string {
        const form = pokemon.data.form;
        const pokemonId = pokemon.data.pokemonId;
        if (!form) return 'base';
        if (typeof form === 'number') return 'costume-' + form;
        const index = form.indexOf(pokemonId);
        const isNidoran = index !== -1;
        const formName = isNidoran ? form.slice(index + pokemonId.length).slugify() : 'normal';
        const match = this.getFormNotCostume().some((trigger) => formName.includes(trigger));
        const result = match ? formName : 'costume-' + formName;
        return result;
    }

    private isBaseForm(pokemon: { form: string | undefined }): boolean {
        return pokemon.form === 'base';
    }

    async getFileContent(): Promise<string> {
        const raw: PokemonSettings[] = await RawGameMaster.getPokemonSettings();
        const pokemons = raw
            .map((pokemon) => ({
                id: pokemon.templateId,
                pokemonId: pokemon.data.pokemonId,
                // type: pokemon.data.type,
                // type2: pokemon.data.type2,
                // stats: pokemon.data.stats,
                // quickMoves: pokemon.data.quickMoves ?? [],
                // cinematicMoves: pokemon.data.cinematicMoves,
                // eliteQuickMove: pokemon.data.eliteQuickMove,
                // eliteCinematicMove: pokemon.data.eliteCinematicMove,
                // evolutionIds: pokemon.data.evolutionIds,
                familyId: pokemon.data.familyId,
                // pokemonClass: pokemon.data.pokemonClass,
                // nonTmCinematicMoves: pokemon.data.nonTmCinematicMoves,
                form: this.extractFormNameFromForm(pokemon),
                // encounter: {
                //     stardustCaptureReward:
                //         (pokemon.data.encounter?.bonusStardustCaptureReward ?? 0) + 100,
                // },
            }))
            .groupBy('pokemonId')
            .toList('values');

        const finalPokemon = pokemons.map((pokemonForms) => {
            const pokemonId = pokemonForms[0].pokemonId;
            const familyId = pokemonForms[0].familyId;
            const id = this.extractPokemonIdNumber(pokemonForms[0].id);

            const hasNormalForm =
                pokemonForms.filter((form) => form.id.endsWith('NORMAL')).length >= 1;
            const baseForm = pokemonForms.filter((form) => this.isBaseForm(form)).first();
            const withoutBaseForm = pokemonForms.filter((form) => !this.isBaseForm(form));
            // const baseFormName = hasNormalForm ? 'normal' : baseForm?.form;

            const withoutIdAndForm = (obj: any) => {
                const { id, form, ...rest } = obj;
                return rest;
            };

            const baseFormName = hasNormalForm
                ? 'normal'
                : (
                      withoutBaseForm
                          .filter(({ id, form, ...rest }) => {
                              return rest.deepEquals(withoutIdAndForm(baseForm));
                          })
                          .first() ?? baseForm
                  )?.form;

            const forms = withoutBaseForm
                // .filter((form) => !this.isBaseForm(form))
                .groupBy(({ id: _, form: form, ...rest }) => rest.stableHash())
                .toList('values')
                .toObject(
                    (array) =>
                        array.filter((form) => !form.form.includes('costume')).first()?.form ??
                        'test',
                );

            return {
                pokemonId,
                familyId,
                id,
                baseFormName,
                forms,
            };
        });
        return JSON.stringify(finalPokemon, null, 2);
    }
}
