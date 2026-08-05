import fs from 'fs';
import path from 'path';
import 'utilitish';
import { generateTypesFile, TypeSource } from './quicktypeGenerator.js';

export async function generateIntermediateTypes(results: { name: string; content: string }[]) {
    const sources: TypeSource[] = results.map(({ name, content }) => ({
        typeName: name.camelCase().capitalize(),
        sample: content,
    }));

    await generateTypesFile(sources, 'generated/data/api/intermediate.type.ts');

    const isArrayByName = new Map<string, boolean>(
        results.map(({ name, content }) => [name, Array.isArray(JSON.parse(content))]),
    );

    const indexContent = generateIntermediateIndex(
        results.map((r) => r.name),
        isArrayByName,
    );
    fs.writeFileSync(path.join('generated', 'intermediate.index.ts'), indexContent);
}

function generateIntermediateIndex(names: string[], isArrayByName: Map<string, boolean>): string {
    let content = `import * as Types from '@generated/data/api/intermediate.type.js';\n\n`;
    content += `export const IntermediateData = {\n`;

    names.forEach((name) => {
        const typeName = name.camelCase().capitalize();
        const isArray = isArrayByName.get(name);
        const returnType = isArray ? `Types.${typeName}[]` : `Types.${typeName}`;

        content += `    get${typeName}: async (): Promise<${returnType}> => {\n`;
        content += `        const data = await import('./data/intermediate/${name}.json', {\n`;
        content += `            with: { type: 'json' },\n`;
        content += `        });\n`;
        content += `        return (data.default || data) as unknown as ${returnType};\n`;
        content += `    },\n`;
    });

    content += `};\n`;
    return content;
}
