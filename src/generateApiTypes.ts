import fs from 'fs';
import path from 'path';
import 'utilitish';
import { generateTypesFile, TypeSource } from './quicktypeGenerator.js';

export async function generateApiTypes(results: { fileName: string; content: string }[]) {
    const sources: TypeSource[] = [];
    const manifest: { file: string; typeName: string }[] = [];
    const seenTypeNames = new Set<string>();

    for (const { fileName, content } of results) {
        const typeName = toTypeName(fileName);

        if (!seenTypeNames.has(typeName)) {
            seenTypeNames.add(typeName);
            sources.push({ typeName, sample: content });
        }

        manifest.push({ file: fileName, typeName });
    }

    fs.mkdirSync('generated/data/api', { recursive: true });
    await generateTypesFile(sources, 'generated/data/api/types.ts');
    fs.writeFileSync(
        path.join('generated/data/api', 'manifest.json'),
        JSON.stringify(manifest, null, 2),
    );
    console.log('generate api type and manifest');
}

function toTypeName(fileName: string): string {
    return fileName
        .replace('.json', '')
        .split('/')
        .map((segment) => segment.camelCase().capitalize())
        .join('');
}
