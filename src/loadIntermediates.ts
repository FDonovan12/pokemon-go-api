import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

export async function loadIntermediates(folder: string) {
    const files = fs.readdirSync(folder);
    const intermediates: any[] = [];

    for (const file of files) {
        if (!file.endsWith('.ts') && !file.endsWith('.js')) continue;

        const filePath = path.join(folder, file);
        const module = await import(pathToFileURL(filePath).href);

        const IntermediateClass = module.default;
        if (IntermediateClass) intermediates.push(new IntermediateClass());
    }

    return intermediates;
}
