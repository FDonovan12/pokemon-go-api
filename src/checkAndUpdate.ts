import path from 'path';

import dotenv from 'dotenv';
import 'utilitish';
import { setSlugifyConfig, SlugifyConfig } from 'utilitish';
import { GeneratorRunner } from './generatorRunner.js';
import { loadGenerators } from './loadGenerator.js';
dotenv.config();

async function main() {
    setSlugifyConfig(
        SlugifyConfig.builder().withCustomReplacements({ '♂': '_male', '♀': '_male' }).build(),
    );

    const isDev = process.env.DEV === 'true';
    const folder = isDev ? path.resolve('./src/generators') : path.resolve('./dist/src/generators');

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
