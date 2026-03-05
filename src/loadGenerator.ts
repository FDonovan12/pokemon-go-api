import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

export async function loadGenerators(folder: string) {
    const files = fs.readdirSync(folder);

    const generators: any[] = [];

    for (const file of files) {
        if (!file.endsWith('.ts') && !file.endsWith('.js')) continue;

        const filePath = path.join(folder, file);
        const fileUrl = pathToFileURL(filePath).href;

        const module = await import(fileUrl);

        const GeneratorClass = module.default;
        if (GeneratorClass) generators.push(new GeneratorClass());
    }

    return generators;
}
