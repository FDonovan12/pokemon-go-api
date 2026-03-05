import { RawGameMaster } from '../../generated/index.js';
import { FileGenerator } from '../type/fileGenerator.js';

export default class PokemonSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'pokemon-setting.json';
    }
    async getFileContent(): Promise<string> {
        const raw = await RawGameMaster.getPokemonSettings();
        const pokemons = raw
            .filter((pokemon) => !pokemon.templateId.endsWith(pokemon.data.pokemonId))
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
            }));
        return JSON.stringify(pokemons, null, 2);
    }

    // test: (move) => move.templateId.split('_').last()! !== move.data.pokemonId,
    //         transform: (move) => ({
    //             id: move.templateId,
    //             pokemonId: move.data.pokemonId,
    //             type: move.data.type,
    //             type2: move.data.type2,
    //             stats: move.data.stats,
    //             quickMoves: move.data.quickMoves ?? [],
    //             cinematicMoves: move.data.cinematicMoves,
    //             eliteQuickMove: move.data.eliteQuickMove,
    //             eliteCinematicMove: move.data.eliteCinematicMove,
    //             evolutionIds: move.data.evolutionIds,
    //             familyId: move.data.familyId,
    //             pokemonClass: move.data.pokemonClass,
    //             nonTmCinematicMoves: move.data.nonTmCinematicMoves,
    //             encounter: {
    //                 stardustCaptureReward:
    //                     (move.data.encounter.bonusStardustCaptureReward ?? 0) + 100,
    //             },
    //         }),
}
