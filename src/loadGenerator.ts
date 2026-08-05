import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { GeneratorSpeed } from './type/fileGenerator.js';

export interface LoadGeneratorsOptions {
    only?: string[];
    maxSpeed?: GeneratorSpeed; // charge ce niveau ET tout ce qui est plus rapide
}

export async function loadGenerators(folder: string, options: LoadGeneratorsOptions = {}) {
    const { only, maxSpeed } = options;
    const files = fs.readdirSync(folder);

    const generators: any[] = [];

    for (const file of files) {
        if (!file.endsWith('.ts') && !file.endsWith('.js')) continue;

        const baseName = path.basename(file, path.extname(file));
        if (only && only.length > 0 && !only.includes(baseName)) continue;

        const filePath = path.join(folder, file);
        const fileUrl = pathToFileURL(filePath).href;

        const module = await import(fileUrl);

        const GeneratorClass = module.default;
        if (!GeneratorClass) continue;

        const instance = new GeneratorClass();

        if (maxSpeed !== undefined && instance.getSpeed() > maxSpeed) continue;

        generators.push(instance);
    }

    return generators;
}
