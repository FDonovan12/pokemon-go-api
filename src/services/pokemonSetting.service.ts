import { PokemonSettings } from '#generated/data/api/raw.type.js';
import { RawGameMaster } from '#generated/raw.index.js';

let cachedResult: Promise<any> | null = null;

export function getPokemonSetting() {
    if (!cachedResult) {
        const service = new PokemonSettingGeneratorService();
        cachedResult = service.getFileContent();
    }
    return cachedResult;
}

class PokemonSettingGeneratorService {
    private extractDexNumber(templateId: string): number {
        return +templateId.split('_')[0].slice(1);
    }

    private speciesCache = new Map<number, any>();

    private async fetchPokemonSpecies(dexNumber: number): Promise<any> {
        if (this.speciesCache.has(dexNumber)) return this.speciesCache.get(dexNumber);

        const data = await this.fetchJsonWithRetry(
            `https://pokeapi.co/api/v2/pokemon-species/${dexNumber}`,
        );
        this.speciesCache.set(dexNumber, data);
        return data;
    }

    private async fetchJsonWithRetry(url: string, retries = 3, delayMs = 500): Promise<any> {
        for (let attempt = 0; attempt <= retries; attempt++) {
            const res = await fetch(url);

            if (res.ok) {
                return res.json();
            }

            // 429 = rate limit, 5xx = erreur serveur temporaire -> on retry
            if ((res.status === 429 || res.status >= 500) && attempt < retries) {
                const wait = delayMs * 2 ** attempt; // backoff exponentiel
                console.log(
                    `⚠️  ${res.status} sur ${url}, retry dans ${wait}ms (tentative ${attempt + 1}/${retries})`,
                );
                await new Promise((resolve) => setTimeout(resolve, wait));
                continue;
            }

            throw new Error(`Échec fetch ${url} : ${res.status} ${res.statusText}`);
        }

        throw new Error(`Échec fetch ${url} après ${retries} tentatives`);
    }

    private async fetchFrenchName(dexNumber: number): Promise<string> {
        const data = await this.fetchPokemonSpecies(dexNumber);
        const raw = data.names.find((n: any) => n.language.name === 'fr')?.name;
        if (!raw) {
            // console.log('fetchFrenchName : ', dexNumber);
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
                // console.log('fetchFormId : ', formSlug);
                return null;
            }
            const data = await res.json();
            return data.id;
        } catch {
            return null;
        }
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

    private extractBaseSameDifferentForm(lists: any[], baseFormIndex: number) {
        const baseForm = lists[baseFormIndex];
        const otherFormSameAsBase = lists.filter(
            (form, id) => this.isSameForm(form, baseForm) && id !== baseFormIndex,
        );
        const formDifferentAsBase = lists.filter((form) => !this.isSameForm(form, baseForm));
        return { base: baseForm, same: otherFormSameAsBase, different: formDifferentAsBase };
    }

    async getFileContent(): Promise<any> {
        const raw: PokemonSettings[] = await RawGameMaster.getPokemonSettings();
        const rawPokemons: any[] = [];
        for (let i = 0; i < raw.length; i += 20) {
            const batch = raw.slice(i, i + 20);
            await Promise.all(
                batch.map(async (pokemon) => {
                    console.log(pokemon.templateId);
                    const dexNumber = this.extractDexNumber(pokemon.templateId);
                    this.alterPokemon(pokemon);
                    let formField = String(pokemon.data.form ?? 'base'); // have to convert number to string even most of the time never number here

                    const name = await this.fetchFrenchName(dexNumber);
                    const generation = await this.fetchGeneration(dexNumber, formField);

                    let imageId: number = dexNumber;
                    if (formField) {
                        const slug = formField.slugify();
                        imageId = (await this.fetchFormId(slug)) ?? dexNumber;
                    }

                    const slug =
                        formField === 'base'
                            ? name.slugify()
                            : formField.replace(pokemon.data.pokemonId, name).slugify();
                    rawPokemons.push({
                        id: pokemon.templateId,
                        pokemonId: pokemon.data.pokemonId,
                        dexNumber,
                        name,
                        generation,
                        slug: slug,
                        imageId,
                        // https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/other/official-artwork/${imageId}.png
                        // image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${imageId}.png`,
                        image: `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/other/official-artwork/${imageId}.png`,
                        imageShiny: `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/other/official-artwork/shiny/${imageId}.png`,
                        type: [
                            pokemonTypeToFrench(pokemon.data.type),
                            pokemonTypeToFrench(pokemon.data.type2 ?? ''),
                        ].compact(),
                        stats: pokemon.data.stats,
                        quickMoves: pokemon.data.quickMoves ?? [],
                        cinematicMoves: pokemon.data.cinematicMoves ?? [],
                        eliteQuickMove: pokemon.data.eliteQuickMove ?? [],
                        eliteCinematicMove: pokemon.data.eliteCinematicMove ?? [],
                        nonTmCinematicMoves: pokemon.data.nonTmCinematicMoves ?? [],
                        hasMega: (pokemon.data.evolutionBranch ?? []).some(
                            (branch) => !!branch.temporaryEvolution,
                        ),
                        evolutionIds: (pokemon.data.evolutionBranch ?? [])
                            .filter((branch) => branch.evolution && branch.evolution !== 'ZYGARDE')
                            .map((branch) => ({
                                pokemonId: branch.evolution,
                                form:
                                    (branch.form?.endsWith('_NORMAL') ? 'base' : branch.form) ??
                                    'base',
                            }))
                            .compact(),
                        family: pokemon.data.familyId,
                        isLegendary: pokemon.data.pokemonClass === 'POKEMON_CLASS_LEGENDARY',
                        isMythical: pokemon.data.pokemonClass === 'POKEMON_CLASS_MYTHIC',
                        isUltraBeast: pokemon.data.pokemonClass === 'POKEMON_CLASS_ULTRA_BEAST',
                        form: formField ?? 'base',
                        encounter: {
                            stardustCaptureReward:
                                (pokemon.data.encounter?.bonusStardustCaptureReward ?? 0) + 100,
                        },
                    });
                }),
            );
        }
        const familyToFrenchName = new Map<string, string>(
            rawPokemons
                .filter((pokemon) => pokemon.pokemonId === pokemon.family.replace('FAMILY_', ''))
                .map((pokemon) => [pokemon.family, pokemon.name]),
        );

        const pokemons = rawPokemons
            .map((pokemon) => ({ ...pokemon, family: familyToFrenchName.get(pokemon.family)! }))
            .groupBy('pokemonId')
            .toList('values');

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
        return finalPokemons.sortAsc((pokemon) => pokemon.base.dexNumber);
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
                    Pikachu

                */
        const templateId = pokemon.templateId;
        let formField = String(pokemon.data.form ?? 'base'); // have to convert number to string even most of the time never number here

        // 1. Nettoyage global initial
        formField = formField.replace('GALARIAN', 'GALAR').replace('HISUIAN', 'HISUI');

        // 2. Traitement des cas spécifiques
        if (formField.includes('TAUROS_PALDEA')) {
            formField += '_BREED';
        }

        if (formField.includes('NECROZMA')) {
            formField = formField.replace('_MANE', '').replace('_WINGS', '');
        }

        if (formField.includes('CALYREX')) {
            formField = formField.replace('_RIDER', '');
        }

        if (templateId.includes('ZACIAN') || templateId.includes('ZAMAZENTA')) {
            if (formField.includes('HERO')) {
                formField = 'base';
            } else if (formField === 'base') {
                pokemon.templateId = `${templateId}_NORMAL`; // Mutation directe du templateId
            } else {
                formField = formField.replace('_SWORD', '').replace('_SHIELD', '');
            }
        }

        if (templateId.includes('MELOETTA')) {
            if (formField.includes('ARIA')) {
                formField = 'base';
            } else if (formField === 'base') {
                pokemon.templateId = `${templateId}_NORMAL`;
            }
        }

        if (formField.includes('KELDEO_RESOLUTE')) {
            pokemon.data.nonTmCinematicMoves = ['SECRET_SWORD'];
        }

        if (formField.includes('ORIGIN')) {
            if (templateId.includes('DIALGA')) pokemon.data.nonTmCinematicMoves = ['ROAR_OF_TIME'];
            if (templateId.includes('PALKIA')) pokemon.data.nonTmCinematicMoves = ['SPACIAL_REND'];
        }

        if (templateId.includes('ZYGARDE')) {
            const is100Percent = formField.endsWith('COMPLETE');
            const isPowerConstruct = formField.includes('COMPLETE') && !is100Percent;

            if (isPowerConstruct) {
                formField = formField
                    .replace('COMPLETE_TEN_PERCENT', '10_POWER_CONSTRUCT')
                    .replace('COMPLETE_FIFTY_PERCENT', '50_POWER_CONSTRUCT');
            }

            // Correction du bug d'assignation (50_PERCENT -> 50)
            formField = formField.replace('TEN_PERCENT', '10').replace('FIFTY_PERCENT', '50');
        }
        if (templateId.includes('PIKACHU')) {
            formField = formField.replace('DOCTOR', 'PHD');
        }

        // 3. Application de la forme finale nettoyée sur l'objet d'origine
        pokemon.data.form = formField;
    }
}
const POKEMON_TYPE_TO_FRENCH: Record<string, string | undefined> = {
    POKEMON_TYPE_BUG: 'Insecte',
    POKEMON_TYPE_DARK: 'Ténèbres',
    POKEMON_TYPE_DRAGON: 'Dragon',
    POKEMON_TYPE_ELECTRIC: 'Électrik',
    POKEMON_TYPE_FAIRY: 'Fée',
    POKEMON_TYPE_FIGHTING: 'Combat',
    POKEMON_TYPE_FIRE: 'Feu',
    POKEMON_TYPE_FLYING: 'Vol',
    POKEMON_TYPE_GHOST: 'Spectre',
    POKEMON_TYPE_GRASS: 'Plante',
    POKEMON_TYPE_GROUND: 'Sol',
    POKEMON_TYPE_ICE: 'Glace',
    POKEMON_TYPE_NORMAL: 'Normal',
    POKEMON_TYPE_POISON: 'Poison',
    POKEMON_TYPE_PSYCHIC: 'Psy',
    POKEMON_TYPE_ROCK: 'Roche',
    POKEMON_TYPE_STEEL: 'Acier',
    POKEMON_TYPE_WATER: 'Eau',
};

function pokemonTypeToFrench(type: string): string | undefined {
    return POKEMON_TYPE_TO_FRENCH[type];
}
