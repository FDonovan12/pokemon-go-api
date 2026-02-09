import fs from 'fs';
import path from 'path';
import { fetchGameMaster } from './fetchGameMaster.js';
import { parseGameMaster } from './parseGameMaster.js';
import { GameMaster } from './type/gameMasterType.js';

import 'utilitish';

const DATA_DIR = 'data';

async function main() {
    console.log('🚀 Starting data generation process...');

    // 1. Fetch
    console.log('📡 Fetching GameMaster from remote source...');
    const gameMaster: GameMaster = await fetchGameMaster();
    console.log(`✅ GameMaster received (${Object.keys(gameMaster).length} raw entries detected)`);

    // 2. Parse
    console.log('🧠 Parsing GameMaster data...');
    const parsedData = parseGameMaster(gameMaster);
    const categoryCount = Object.keys(parsedData).length;
    console.log(`✨ Parsing complete. ${categoryCount} categories prepared.`);

    // 3. Write
    console.log(`📁 Writing files to directory: ${DATA_DIR}`);

    Object.keys(parsedData).forEach((key) => {
        const pathFile = key.split('/');
        const fileName = pathFile.last()!.kebabCase() + '.json';
        const finalDir = [DATA_DIR, ...pathFile.slice(0, -1)].join('/');

        try {
            fs.mkdirSync(finalDir, { recursive: true });
            const fullPath = path.join(finalDir, fileName);

            fs.writeFileSync(fullPath, JSON.stringify(parsedData[key], null, 2));

            // Log discret pour ne pas inonder la console si tu as 1000 fichiers
            console.log(`   📄 Created: ${key.kebabCase()}.json`);
        } catch (error) {
            console.error(`❌ Error writing file ${fileName}:`, error);
        }
    });

    console.log('🎉 All data files have been generated successfully.');
}

main().catch((err) => {
    console.error('❌ Erreur:', err);
    process.exit(1);
});
