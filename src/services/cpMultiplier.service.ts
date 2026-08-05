import { RawGameMaster } from '#generated/raw.index.js';

export async function getCpMultipliers(): Promise<Record<string, number>> {
    const raw = await RawGameMaster.getPlayerLevel();
    const entry = raw[0];

    const integerCpms: number[] = entry.data.cpMultiplier;
    const result: Record<string, number> = {};

    for (let i = 0; i < integerCpms.length; i++) {
        const level = i + 1;
        const cpm = integerCpms[i];

        result[level.toString()] = cpm;

        if (i < integerCpms.length - 1) {
            const nextCpm = integerCpms[i + 1];
            const halfCpm = Math.sqrt((cpm ** 2 + nextCpm ** 2) / 2);
            result[`${level}.5`] = Math.round(halfCpm * 1e8) / 1e8;
        }
    }
    return result;
}
