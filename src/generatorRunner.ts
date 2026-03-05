import { FileGenerator } from './type/fileGenerator.js';

export class GeneratorRunner {
    constructor(private generators: FileGenerator[]) {}

    async run() {
        for (const generator of this.generators) {
            await generator.generate();
        }
    }
}
