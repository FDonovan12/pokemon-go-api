import { generateApiTypes } from './generateApiTypes.js';
import { FileGenerator } from './type/fileGenerator.js';

export class GeneratorRunner {
    constructor(private generators: FileGenerator[]) {}

    async run(skipApiTypes = false) {
        const results: { fileName: string; content: string }[] = [];

        for (const generator of this.generators) {
            const content = await generator.generate();
            results.push({ fileName: generator.getFileName(), content });
        }

        if (skipApiTypes) {
            console.log('⚠️  Génération des types API sautée (mode filtré)');
            return;
        }

        await generateApiTypes(results);
    }
}
