import path from 'path';

import 'utilitish';
import { setSlugifyConfig, SlugifyConfig } from 'utilitish';
import { isDev } from './config.js';
import { GeneratorRunner } from './generatorRunner.js';
import { loadGenerators } from './loadGenerator.js';
import { GeneratorSpeed } from './type/fileGenerator.js';

const SPEED_NAMES: Record<string, GeneratorSpeed> = {
    fast: GeneratorSpeed.FAST,
    medium: GeneratorSpeed.MEDIUM,
    slow: GeneratorSpeed.SLOW,
    'very-slow': GeneratorSpeed.VERY_SLOW,
};

async function main() {
    setSlugifyConfig(
        SlugifyConfig.builder().withCustomReplacements({ '♂': '_male', '♀': '_male' }).build(),
    );

    const onlyArg = process.argv.find((arg) => arg.startsWith('--only='));
    const groupArg = process.argv.find((arg) => arg.startsWith('--group='));

    const only = onlyArg?.replace('--only=', '').split(',');
    const groupName = groupArg?.replace('--group=', '');
    const maxSpeed = groupName ? SPEED_NAMES[groupName] : undefined;

    if (groupName && maxSpeed === undefined) {
        throw new Error(
            `Groupe inconnu : ${groupName}. Attendu : ${Object.keys(SPEED_NAMES).join(', ')}`,
        );
    }

    if (only) console.log('⚠️  Mode filtré (only) :', only.join(', '));
    if (groupName) console.log(`⚠️  Mode filtré (group) : ${groupName} et plus rapide`);
    const isFiltered = !!only || maxSpeed !== undefined;

    const folder = isDev ? path.resolve('./src/generators') : path.resolve('./dist/src/generators');
    const generators = await loadGenerators(folder, { only, maxSpeed });

    const runner = new GeneratorRunner(generators);
    await runner.run(isFiltered);
}

main().catch((err) => {
    console.error('❌ Erreur:', err);
    process.exit(1);
});
