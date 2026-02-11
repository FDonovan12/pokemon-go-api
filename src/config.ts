import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

export interface SourceConfig {
    game_master_url: string;
    timestamp_url: string;
}

const SOURCE_PATH = 'meta/source.json';

if (!fs.existsSync(SOURCE_PATH)) {
    throw new Error('❌ meta/source.json introuvable');
}

export const sourceConfig: SourceConfig = JSON.parse(fs.readFileSync(SOURCE_PATH, 'utf8'));
