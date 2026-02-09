import fs from 'fs';
import path from 'path';
import { fetchGameMaster } from './fetchGameMaster.js';
import { GameMaster } from './gameMasterType.js';
import { parseGameMaster } from './parseGameMaster.js';

import 'utilitish';

const META_DIR = 'meta';
const DATA_DIR = 'data';
const LAST_TIMESTAMP_FILE = path.join(META_DIR, 'last_timestamp.json');

async function main() {
    // if (!fs.existsSync(META_DIR)) fs.mkdirSync(META_DIR);
    // if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

    // const remoteTimestamp = await fetchTimestamp();

    // let localTimestamp: string | null = null;
    // if (fs.existsSync(LAST_TIMESTAMP_FILE)) {
    //     localTimestamp = JSON.parse(fs.readFileSync(LAST_TIMESTAMP_FILE, 'utf8')).timestamp;
    // }

    // if (remoteTimestamp === localTimestamp && !isDev) {
    //     console.log('⏸️ Aucun changement de Game Master');
    //     return;
    // }

    // console.log('🔄 Nouveau Game Master détecté');

    const gameMaster: GameMaster = await fetchGameMaster();
    const parsedData = parseGameMaster(gameMaster);
    Object.keys(parsedData).forEach((key) => {
        const pathFile = key.split('/');
        const fileName = pathFile.last()!.kebabCase() + '.json';
        const finalDir = [DATA_DIR, pathFile.slice(0, -1)].join('/');
        fs.mkdirSync(finalDir, { recursive: true });
        fs.writeFileSync(path.join(finalDir, fileName), JSON.stringify(parsedData[key], null, 2));
    });

    // if (!isDev) {
    //     fs.writeFileSync(
    //         LAST_TIMESTAMP_FILE,
    //         JSON.stringify(
    //             {
    //                 timestamp: remoteTimestamp,
    //                 updated_at: new Date().toISOString(),
    //             },
    //             null,
    //             2
    //         )
    //     );
    // }

    console.log('✅ Données mises à jour');
}

main().catch((err) => {
    console.error('❌ Erreur:', err);
    process.exit(1);
});
