import fs from 'fs';
import path from 'path';

import 'utilitish';
import { GeneratorRunner } from './generatorRunner.js';
import { loadGenerators } from './loadGenerator.js';

async function main() {
    const srcPath = path.resolve('./src/generators');
    const folder = fs.existsSync(srcPath) ? srcPath : path.resolve('./dist/src/generators');

    console.log('folder');
    const generators = await loadGenerators(folder);
    console.log('generators');

    const runner = new GeneratorRunner(generators);
    console.log('runner');
    await runner.run();
    console.log('runner generator end');
}

main().catch((err) => {
    console.error('❌ Erreur:', err);
    process.exit(1);
});
