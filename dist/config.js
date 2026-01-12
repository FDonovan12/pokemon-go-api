import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();
const SOURCE_PATH = 'meta/source.json';
if (!fs.existsSync(SOURCE_PATH)) {
    throw new Error('❌ meta/source.json introuvable');
}
export const sourceConfig = JSON.parse(fs.readFileSync(SOURCE_PATH, 'utf8'));
export const isDev = process.env.NODE_ENV === 'development';
