import { generateIntermediateTypes } from './generateIntermediateTypes.js';
import { IntermediateGenerator } from './type/intermediateGenerator.js';

export class IntermediateRunner {
    constructor(private intermediates: IntermediateGenerator[]) {}

    async run() {
        const results: { name: string; content: string }[] = [];

        for (const intermediate of this.intermediates) {
            const content = await intermediate.generate();
            results.push({ name: intermediate.getName(), content });
        }

        await generateIntermediateTypes(results);
    }
}
