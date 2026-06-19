import { RawGameMaster } from '../../generated/index.js';
import { FileGenerator } from '../type/fileGenerator.js';
import { PokemonSettings } from '../types.js';

export default class PokemonSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'pokemon-setting.json';
    }

    private extractDexNumber(templateId: string): number {
        return +templateId.split('_')[0].slice(1);
    }

    private async fetchFrenchName(dexNumber: number): Promise<string> {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${dexNumber}`);
        const data = await res.json();
        const raw = data.names.find((n: any) => n.language.name === 'fr')?.name;
        if (!raw) {
            console.log('fetchFrenchName : ', dexNumber);
        }
        return raw ?? '';
    }

    private async fetchFormId(formSlug: string): Promise<number | null> {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${formSlug}`);
            if (!res.ok) {
                console.log('fetchFormId : ', formSlug);
                return null;
            }
            const data = await res.json();
            return data.id;
        } catch {
            return null;
        }
    }

    private getFormNotCostume() {
        return [
            'alola',
            'galar',
            'normal',
            'hisuian',
            'galarian-standard',
            'galarian-zen',
            'overcast ',
            'sunny ',
            'baile ',
            'pompom  ',
            'sensu   ',
            'incarnate   ',
            'therian   ',
            'altered   ',
            'origin   ',
            'standard   ',
            'zen   ',
            'midday   ',
            'midnight   ',
            'dusk   ',
            'solo    ',
            'school   ',
            'plant   ',
            'sandy ',
            'trash   ',
            'blue-striped  ',
            'blade   ',
            'shield   ',
            'unbound   ',
            'confined   ',
            'hero   ',
            'zero   ',
            'rapid-strike  ',
            'single-strike  ',
            'pompom  ',
            'pompom  ',
            'pompom  ',
        ];
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

    private isSameForm(form: any, otherForm: any) {
        const hasSameStatsStamina = form.stats.baseStamina === otherForm.stats.baseStamina;
        const hasSameStatsAttack = form.stats.baseAttack === otherForm.stats.baseAttack;
        const hasSameStatsDefense = form.stats.baseDefense === otherForm.stats.baseDefense;
        const hasSameStats = hasSameStatsStamina && hasSameStatsAttack && hasSameStatsDefense;

        const hasSameTypes =
            form.type.length === otherForm.type.length &&
            form.type.every((t: any) => otherForm.type.includes(t));

        const isSameMoveList = (a: string[], b: string[]) =>
            a.length === b.length && a.every((m) => b.includes(m));

        const hasSameMoves =
            isSameMoveList(form.quickMoves, otherForm.quickMoves) &&
            isSameMoveList(form.cinematicMoves, otherForm.cinematicMoves) &&
            isSameMoveList(form.eliteQuickMove, otherForm.eliteQuickMove) &&
            isSameMoveList(form.eliteCinematicMove, otherForm.eliteCinematicMove) &&
            isSameMoveList(form.nonTmCinematicMoves, otherForm.nonTmCinematicMoves);

        return hasSameStats && hasSameTypes && hasSameMoves;
    }

    private isBaseForm(pokemon: { form: string | undefined }): boolean {
        return pokemon.form === 'base';
    }

    async getFileContent(): Promise<string> {
        const raw: PokemonSettings[] = await RawGameMaster.getPokemonSettings();

        const rawPokemons = await Promise.all(
            raw.map(async (pokemon) => {
                const dexNumber = this.extractDexNumber(pokemon.templateId);
                const formField = pokemon.data.form as string | undefined;

                const name = await this.fetchFrenchName(dexNumber);

                let imageId: number = dexNumber;
                if (formField) {
                    const slug = formField.slugify();
                    imageId = (await this.fetchFormId(slug)) ?? dexNumber;
                }
                return {
                    id: pokemon.templateId,
                    pokemonId: pokemon.data.pokemonId,
                    dexNumber,
                    name,
                    imageId,
                    type: [pokemon.data.type, pokemon.data.type2].compact(),
                    stats: pokemon.data.stats,
                    quickMoves: pokemon.data.quickMoves ?? [],
                    cinematicMoves: pokemon.data.cinematicMoves ?? [],
                    eliteQuickMove: pokemon.data.eliteQuickMove ?? [],
                    eliteCinematicMove: pokemon.data.eliteCinematicMove ?? [],
                    nonTmCinematicMoves: pokemon.data.nonTmCinematicMoves ?? [],
                    evolutionIds: pokemon.data.evolutionIds,
                    familyId: pokemon.data.familyId,
                    isLegendary: pokemon.data.pokemonClass === 'POKEMON_CLASS_LEGENDARY',
                    isMythic: pokemon.data.pokemonClass === 'POKEMON_CLASS_MYTHIC',
                    isUltraBeast: pokemon.data.pokemonClass === 'POKEMON_CLASS_ULTRA_BEAST',
                    form: pokemon.data.form ?? 'base',
                    // encounter: {
                    //     stardustCaptureReward:
                    //         (pokemon.data.encounter?.bonusStardustCaptureReward ?? 0) + 100,
                    // },
                };
            }),
        );
        const pokemons = rawPokemons.groupBy('pokemonId').toList('values');
        //.map(pokemonList => pokemonList.map(pokemon => pokemon.))
        // .toObject(
        //     (list) => list[0].pokemonId,
        //     (list) => list.map((pokemon) => pokemon.form ?? 'base'),
        // );

        const finalPokemons = pokemons.map((pokemonForms) => {
            // const pokemonId = pokemonForms[0].pokemonId;
            // const familyId = pokemonForms[0].familyId;
            // const id = this.extractPokemonIdNumber(pokemonForms[0].id);

            const filteredForms = pokemonForms.filter((form) => !form.id.includes('NORMAL'));

            const baseFormIndex = filteredForms.findIndex((form) => form.form === 'base');
            const baseForm = filteredForms[baseFormIndex];
            const otherFormSameAsBase = filteredForms.filter(
                (form, id) => this.isSameForm(form, baseForm) && id !== baseFormIndex,
            );

            const formDifferentAsBase = filteredForms.filter(
                (form) => !this.isSameForm(form, baseForm),
            );
            // return pokemonForms
            return { base: baseForm, same: otherFormSameAsBase, different: formDifferentAsBase };
        });

        // const finalPokemon = pokemons.map((pokemonForms) => {
        //     const pokemonId = pokemonForms[0].pokemonId;
        //     const familyId = pokemonForms[0].familyId;
        //     const id = this.extractPokemonIdNumber(pokemonForms[0].id);

        //     const hasNormalForm =
        //         pokemonForms.filter((form) => form.id.endsWith('NORMAL')).length >= 1;
        //     const baseForm = pokemonForms.filter((form) => this.isBaseForm(form)).first();
        //     const withoutBaseForm = pokemonForms.filter((form) => !this.isBaseForm(form));
        //     // const baseFormName = hasNormalForm ? 'normal' : baseForm?.form;

        //     const withoutIdAndForm = (obj: any) => {
        //         const { id, form, ...rest } = obj;
        //         return rest;
        //     };

        //     const baseFormName = hasNormalForm
        //         ? 'normal'
        //         : (
        //               withoutBaseForm
        //                   .filter(({ id, form, ...rest }) => {
        //                       return rest.deepEquals(withoutIdAndForm(baseForm));
        //                   })
        //                   .first() ?? baseForm
        //           )?.form;

        //     const forms = withoutBaseForm
        //         // .filter((form) => !this.isBaseForm(form))
        //         .groupBy(({ id: _, form: form, ...rest }) => rest.stableHash())
        //         .toList('values')
        //         .toObject(
        //             (array) =>
        //                 array.filter((form) => !form.form.includes('costume')).first()?.form ??
        //                 'test',
        //         );

        //     return {
        //         pokemonId,
        //         familyId,
        //         id,
        //         baseFormName,
        //         forms,
        //     };
        // });
        return JSON.stringify(finalPokemons, null, 2);
    }
}
