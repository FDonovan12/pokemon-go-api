import {
    ChargedMove,
    PokemonSetting,
    SameTempEvoOverride,
} from '#generated/data/api/intermediate.type.js';
import { MegaEvoLevelSettings } from '#generated/data/api/raw.type.js';
import { IntermediateData } from '#generated/intermediate.index.js';
import { RawGameMaster } from '#generated/raw.index.js';
import { FileGenerator, GeneratorSpeed } from '../type/fileGenerator.js';
import { pokeApiClient } from '../utils/pokeApiClient.js';
import { getImage } from '../utils/utils.js';
export default class PokemonSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'pokemon-setting.json';
    }

    getSpeed(): GeneratorSpeed {
        return GeneratorSpeed.MEDIUM;
    }

    chargedMove?: ChargedMove;
    evoLevel?: MegaEvoLevelSettings[];

    private async getMegaId(pokemon: PokemonSetting, tempEvo: SameTempEvoOverride) {
        const dexNumber = pokemon.base.dexNumber;
        const name = pokemon.base.pokemonId;
        const data = await pokeApiClient.fetchPokemonSpecies(dexNumber);
        const evotype = tempEvo.tempEvoId?.replace('TEMP_EVOLUTION_', '') ?? 'non-defini';
        const variety = data.varieties.filter(
            (variety: any) =>
                variety.pokemon.name.slugifyIncludes(evotype) &&
                variety.pokemon.name.slugifyIncludes(name.kebabCase()),
        );
        console.log(variety);
        return +variety[0]?.pokemon.url.split('/')?.filter(Boolean)?.last() || dexNumber;
    }

    private async buildMega(pokemon: PokemonSetting) {
        return Promise.all(
            pokemon.base.tempEvoOverrides?.map(async (mega) => {
                const megaAttackKey = Object.keys(this.chargedMove ?? {}).find(
                    (t) =>
                        t.slugifyIncludes(pokemon.base.pokemonId) &&
                        t.slugifyIncludes(mega.tempEvoId ?? 'non-defini'),
                );
                const megaAttack = megaAttackKey
                    ? (this.chargedMove as Record<string, any>)[megaAttackKey]
                    : undefined;
                const megaId = await this.getMegaId(pokemon, mega);
                const stats = mega.stats;
                const image = getImage(megaId);
                const types = [mega.typeOverride1, mega.typeOverride2].compact();
                const hasLevel4 =
                    (this.evoLevel?.filter(
                        (level) =>
                            level.templateId.includes(pokemon.base.pokemonId) &&
                            level.templateId.includes('MEGA_EVOLUTION_LEVEL_4'),
                    ).length ?? 0) > 0;
                return { megaAttack, stats, image, types, hasLevel4 };
            }) ?? [],
        );
    }

    async getFileContent(): Promise<any> {
        const content = await IntermediateData.getPokemonSetting();
        const raidMove = await IntermediateData.getRaidMove();
        const evoLevel = await RawGameMaster.getMegaEvoLevelSettings();
        this.chargedMove = raidMove.chargedMove;
        this.evoLevel = evoLevel;
        return Promise.all(
            content.map(async (pokemon) => ({
                ...pokemon,
                base: { ...pokemon.base, mega: await this.buildMega(pokemon) },
            })),
        );
    }
}
