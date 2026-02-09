import fs from 'fs';
import path from 'path';
import { fetchGameMaster } from './fetchGameMaster.js';
import { GameMaster } from './gameMasterType.js';
import { parseGameMaster } from './parseGameMaster.js';

import 'utilitish';

const DATA_DIR = 'data';

async function main() {
    const gameMaster: GameMaster = await fetchGameMaster();
    const parsedData = parseGameMaster(gameMaster);
    Object.keys(parsedData).forEach((key) => {
        const pathFile = key.split('/');
        const fileName = pathFile.last()!.kebabCase() + '.json';
        const finalDir = [DATA_DIR, pathFile.slice(0, -1)].join('/');
        fs.mkdirSync(finalDir, { recursive: true });
        fs.writeFileSync(path.join(finalDir, fileName), JSON.stringify(parsedData[key], null, 2));
    });
}

main().catch((err) => {
    console.error('❌ Erreur:', err);
    process.exit(1);
});
