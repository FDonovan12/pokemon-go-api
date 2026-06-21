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

    private speciesCache = new Map<number, any>();

    private async fetchPokemonSpecies(dexNumber: number): Promise<any> {
        if (this.speciesCache.has(dexNumber)) return this.speciesCache.get(dexNumber);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${dexNumber}`);
        const data = await res.json();
        this.speciesCache.set(dexNumber, data);
        return data;
    }

    private async fetchFrenchName(dexNumber: number): Promise<string> {
        const data = await this.fetchPokemonSpecies(dexNumber);
        const raw = data.names.find((n: any) => n.language.name === 'fr')?.name;
        if (!raw) {
            console.log('fetchFrenchName : ', dexNumber);
        }
        return raw ?? '';
    }

    private async fetchGeneration(dexNumber: number, form?: string): Promise<number> {
        if (form) {
            if (form.includes('ALOLA')) return 7;
            if (form.includes('GALARIAN')) return 8;
            if (form.includes('HISUIAN')) return 8;
            if (form.includes('PALDEA')) return 9;
        }
        const data = await this.fetchPokemonSpecies(dexNumber);
        return +data.generation.url.split('/').filter(Boolean).last();
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

    // private extractFormNameFromForm(pokemon: PokemonSettings): string {
    //     const form = pokemon.data.form;
    //     const pokemonId = pokemon.data.pokemonId;
    //     return result;
    // }

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

    private extractBaseSameDifferentForm(lists: any[], baseFormIndex: number) {
        const baseForm = lists[baseFormIndex];
        const otherFormSameAsBase = lists.filter(
            (form, id) => this.isSameForm(form, baseForm) && id !== baseFormIndex,
        );
        const formDifferentAsBase = lists.filter((form) => !this.isSameForm(form, baseForm));
        return { base: baseForm, same: otherFormSameAsBase, different: formDifferentAsBase };
    }

    async getFileContent(): Promise<string> {
        const raw: PokemonSettings[] = await RawGameMaster.getPokemonSettings();

        const rawPokemons = await Promise.all(
            raw.map(async (pokemon) => {
                const dexNumber = this.extractDexNumber(pokemon.templateId);
                const realData = this.alterPokemon(pokemon);
                let formField = realData.data.form ?? 'base';

                /* 
                    meloetta aria is tru base
                    keldeao absolute same as base add secret attack
                    add dialga and palka attack origin
                    find genesect image
                    arceus, silvalié
                    zygard 10%
                    *******zacian and zamazenta
                    *******fix meteno with remove same in different array
                    necrosma fusion
                    calirex fusion
                    remove morpeko angry, superdofin?

                */

                const name = realData.templateId; //await this.fetchFrenchName(dexNumber);
                const generation = 1; //await this.fetchGeneration(dexNumber, formField);

                let imageId: number = dexNumber;
                if (formField) {
                    const slug = formField.slugify();
                    // imageId = (await this.fetchFormId(slug)) ?? dexNumber;
                }
                return {
                    id: realData.templateId,
                    pokemonId: realData.data.pokemonId,
                    dexNumber,
                    name,
                    generation,
                    slug: name.slugify().capitalize(),
                    imageId,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${imageId}.png`,
                    type: [realData.data.type, realData.data.type2].compact(),
                    stats: realData.data.stats,
                    quickMoves: realData.data.quickMoves ?? [],
                    cinematicMoves: realData.data.cinematicMoves ?? [],
                    eliteQuickMove: realData.data.eliteQuickMove ?? [],
                    eliteCinematicMove: realData.data.eliteCinematicMove ?? [],
                    nonTmCinematicMoves: realData.data.nonTmCinematicMoves ?? [],
                    evolutionIds: realData.data.evolutionIds,
                    family: realData.data.familyId,
                    isLegendary: realData.data.pokemonClass === 'POKEMON_CLASS_LEGENDARY',
                    isMythical: realData.data.pokemonClass === 'POKEMON_CLASS_MYTHIC',
                    isUltraBeast: realData.data.pokemonClass === 'POKEMON_CLASS_ULTRA_BEAST',
                    form: formField ?? 'base',
                    encounter: {
                        stardustCaptureReward:
                            (realData.data.encounter?.bonusStardustCaptureReward ?? 0) + 100,
                    },
                };
            }),
        );
        const pokemons = rawPokemons.groupBy('pokemonId').toList('values');

        const finalPokemons = pokemons.map((pokemonForms) => {
            const filteredForms = pokemonForms.filter((form) => !form.id.includes('NORMAL'));

            const baseFormIndex = filteredForms.findIndex((form) => form.form === 'base');
            const mainGroup = this.extractBaseSameDifferentForm(filteredForms, baseFormIndex);

            const alternateGroups = [];
            let remainingForms = mainGroup.different;
            while (remainingForms.length > 0) {
                const currentGroup = this.extractBaseSameDifferentForm(remainingForms, 0);

                alternateGroups.push({
                    base: currentGroup.base,
                    same: currentGroup.same,
                });

                remainingForms = currentGroup.different;
            }

            return {
                base: mainGroup.base,
                same: mainGroup.same,
                different: alternateGroups,
            };
        });

        (lists: any[], baseFormIndex: number) => {
            const baseForm = lists[baseFormIndex];
            const otherFormSameAsBase = lists.filter(
                (form, id) => this.isSameForm(form, baseForm) && id !== baseFormIndex,
            );
            const formDifferentAsBase = lists.filter((form) => !this.isSameForm(form, baseForm));
            return { base: baseForm, same: otherFormSameAsBase, different: formDifferentAsBase };
        };

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
    private alterPokemon(pokemon: PokemonSettings) {
        /* 
                    ******* meloetta aria is tru base
                    ******* keldeao absolute same as base add secret attack
                    ******* add dialga and palka attack origin
                    find genesect image
                    arceus, silvalié
                    ******* zygard 10%
                    ******* zacian and zamazenta
                    ******* fix meteno with remove same in different array
                    ******* necrosma fusion
                    ******* calirex fusion
                    remove morpeko angry, superdofin?

                */
        const result = pokemon;
        result.data.form = result.data.form ?? 'base';
        result.data.form = result.data.form.replace('GALARIAN', 'GALAR');
        result.data.form = result.data.form.replace('HISUIAN', 'HISUI');
        if (result.data.form.includes('TAUROS_PALDEA')) {
            result.data.form += '_BREED';
        }
        if (result.data.form.includes('NECROZMA')) {
            result.data.form = result.data.form.replace('_MANE', '').replace('_WINGS', '');
        }
        if (pokemon.templateId.includes('ZACIAN') || pokemon.templateId.includes('ZAMAZENTA')) {
            if (result.data.form.includes('HERO')) {
                result.data.form = 'base';
            } else if (result.data.form === 'base') {
                result.templateId = result.templateId + '_NORMAL';
            } else {
                result.data.form = result.data.form.replace('_SWORD', '').replace('_SHIELD', '');
            }
        }
        if (pokemon.templateId.includes('MELOETTA')) {
            if (result.data.form.includes('ARIA')) {
                result.data.form = 'base';
            } else if (result.data.form === 'base') {
                result.templateId = result.templateId + '_NORMAL';
            }
        }
        if (result.data.form.includes('CALYREX')) {
            result.data.form = result.data.form.replace('_RIDER', '');
        }
        if (result.data.form.includes('KELDEO_RESOLUTE')) {
            result.data.nonTmCinematicMoves = ['SECRET_SWORD'];
        }
        if (result.data.form.includes('ORIGIN')) {
            if (pokemon.templateId.includes('DIALGA')) {
                result.data.nonTmCinematicMoves = ['ROAR_OF_TIME'];
            }
            if (pokemon.templateId.includes('PALKIA')) {
                result.data.nonTmCinematicMoves = ['SPACIAL_REND'];
            }
        }
        if (result.templateId.includes('ZYGARDE') || pokemon.templateId.includes('ZYGARDE')) {
            const is100Percent = result.data.form.endsWith('COMPLETE');
            const isPowerConstruct = result.data.form.includes('COMPLETE') && !is100Percent;
            if (isPowerConstruct) {
                result.data.form = result.data.form.replace(
                    'COMPLETE_TEN_PERCENT',
                    '10_POWER_CONSTRUCT',
                );
                result.data.form = result.data.form.replace(
                    'COMPLETE_FIFTY_PERCENT',
                    '50_POWER_CONSTRUCT',
                );
            }
            result.data.form = result.data.form.replace('TEN_PERCENT', '10');
            result.data.form = result.data.form.replace('FIFTY_PERCENT', '10');
        }
        return result;
    }
}
