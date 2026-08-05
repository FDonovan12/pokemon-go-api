import path from 'path';

import 'utilitish';
import { isDev } from './config.js';
import { IntermediateRunner } from './IntermediateRunner.js';
import { loadIntermediates } from './loadIntermediates.js';

runIntermediates().catch((err) => {
    console.error('❌ Erreur:', err);
    process.exit(1);
});

async function runIntermediates() {
    const intermediatesFolder = isDev
        ? path.resolve('./src/intermediates')
        : path.resolve('./dist/src/intermediates');
    const folder = path.resolve(intermediatesFolder);
    const intermediates = await loadIntermediates(folder);
    const runner = new IntermediateRunner(intermediates);
    await runner.run();
}
