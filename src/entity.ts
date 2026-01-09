import { GameMasterKey } from './gameMasterType.js';

export interface AttackMove {
    movementId: string;
    animationId: number;
    pokemonType: string;
    power: number;
    energyDelta: number;
    accuracyChance: number;
    staminaLossScalar: number;
    trainerLevelMin: number;
    trainerLevelMax: number;
    vfxName: string;
    durationMs: number;
    damageWindowStartMs: number;
    damageWindowEndMs: number;
}

export interface DynamaxMove {
    movementId: string;
    animationId: number;
    pokemonType: string;
    obMoveSettingsNumber18: number[];
    accuracyChance: number;
    staminaLossScalar: number;
    trainerLevelMin: number;
    trainerLevelMax: number;
    vfxName: string;
    durationMs: number;
    damageWindowStartMs: number;
    damageWindowEndMs: number;
}

export type MoveSettings = AttackMove | DynamaxMove;

export const keysResult: GameMasterKey[] = ['moveSettings'];
export interface SpecializedDataTypeMap {
    moveSettings: MoveSettings;
}
