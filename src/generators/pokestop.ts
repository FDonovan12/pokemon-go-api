import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { FileGenerator } from '../type/fileGenerator.js';

interface Pokestop {
    id: string;
    name: string;
    lat: number;
    lon: number;
    url: string;
}

export interface RawPokestopData {
    data: Data;
}

export interface Data {
    pokestops: RawPokestop[];
}

export interface RawPokestop {
    id: string;
    name: string;
    url: string;
    lat: number;
    lon: number;
    updated: number;
    last_modified_timestamp: number;
    ar_scan_eligible: boolean;
    power_up_level: number;
    power_up_points: number;
    power_up_end_timestamp: null;
    showcase_expiry: null;
    incident_blocker_display_type: null;
    incident_blocker_expire_timestamp: null;
    __typename: Typename;
}

export enum Typename {
    Pokestop = 'Pokestop',
}

const POKESTOPS_DIR = join(process.cwd(), 'src/pokestops');

export default class PokestopGenerator extends FileGenerator {
    getFileName(): string {
        return 'pokestop.json';
    }
    async getFileContent(): Promise<Pokestop[]> {
        const files = readdirSync(POKESTOPS_DIR).filter((f) => f.endsWith('.json'));

        const byId = new Map<string, Pokestop>();

        for (const file of files) {
            const raw = readFileSync(join(POKESTOPS_DIR, file), 'utf-8');
            const parsed: RawPokestopData = JSON.parse(raw);

            // Supporte { data: { pokestops: [...] } } ou { pokestops: [...] } ou un tableau brut
            const pokestops = parsed?.data?.pokestops;

            for (const p of pokestops) {
                if (!p?.id) continue;
                byId.set(p.id, {
                    id: p.id,
                    name: p.name,
                    lat: p.lat,
                    lon: p.lon,
                    url: p.url,
                });
            }
        }

        return Array.from(byId.values());
    }
}
