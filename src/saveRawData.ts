import fs from 'fs';
import path from 'path';
import { InputData, jsonInputForTargetLanguage, quicktype } from 'quicktype-core';
import { GameMasterByKey } from './gameMasterType.js';

export async function saveRawAndGenerateTypes(groupedData: GameMasterByKey, outputDir: string) {
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const inputData = new InputData();
    const filesMapping: string[] = [];

    for (const [key, items] of Object.entries(groupedData)) {
        // 1. Sauvegarde du JSON
        const fileName = `${key}.json`;
        fs.writeFileSync(path.join(outputDir, fileName), JSON.stringify(items, null, 2));

        // 2. Préparation pour Quicktype
        // On donne un nom d'interface propre (ex: pokemonSettings -> PokemonSettings)
        const typeName = key.camelCase().capitalize();

        await inputData.addSource(
            'json',
            {
                name: typeName,
                samples: [JSON.stringify(items)],
            },
            () => jsonInputForTargetLanguage('typescript')
        );

        filesMapping.push(key);
    }

    // 3. Génération du fichier types.ts
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

    fs.writeFileSync(path.join(outputDir, 'types.ts'), lines.join('\n'));

    // 4. Génération de l'index.ts (Usage Interne)
    const indexContent = generateInternalIndex(filesMapping);
    fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);
}

function generateInternalIndex(keys: string[]): string {
    let content = `import * as Types from './types';\n\n`;
    content += `export const RawGameMaster = {\n`;

    keys.forEach((key) => {
        const typeName = key.camelCase().capitalize();
        // Ici, on utilise un chemin relatif pour l'import ou le fetch interne
        content += `    get${typeName}: async (): Promise<Types.${typeName}[]> => {\n`;
        content += `        const data = await import('./${key}.json', {\n`;
        content += `            assert: { type: 'json' },\n`;
        content += `        });\n`;
        content += `        return (data.default || data) as unknown as Types.${typeName}[];\n`;
        content += `    },\n`;
    });

    content += `};\n`;
    return content;
}
