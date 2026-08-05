import fs from 'fs';
import path from 'path';
import { InputData, jsonInputForTargetLanguage, quicktype } from 'quicktype-core';

export interface TypeSource {
    typeName: string;
    sample: string; // JSON.stringify du contenu
}

export async function generateTypesFile(sources: TypeSource[], outputPath: string): Promise<void> {
    const inputData = new InputData();

    for (const { typeName, sample } of sources) {
        await inputData.addSource('json', { name: typeName, samples: [sample] }, () =>
            jsonInputForTargetLanguage('typescript'),
        );
    }

    const { lines } = await quicktype({
        inputData,
        lang: 'typescript',
        rendererOptions: {
            'just-types': 'true',
            'explicit-unions': 'true',
            'no-date-times': 'true',
            'acronym-style': 'camel',
        },
        fixedTopLevels: true,
    });

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, lines.join('\n'));
}
