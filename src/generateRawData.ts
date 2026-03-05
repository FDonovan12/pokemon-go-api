import fs from 'fs';
import path from 'path';
import { InputData, jsonInputForTargetLanguage, quicktype } from 'quicktype-core';
import { fetchGameMaster } from './fetchGameMaster.js';
import { GameMaster, GameMasterByKey, groupGameMaster } from './type/gameMasterType.js';

import 'utilitish';

mainRawGenerated().catch((err) => {
    console.error('❌ Erreur:', err);
    process.exit(1);
});

async function mainRawGenerated() {
    const gameMaster: GameMaster = await fetchGameMaster();
    const gameMasterByKey: GameMasterByKey = groupGameMaster(gameMaster);

    saveRawAndGenerateTypes(gameMasterByKey);
}

async function saveRawAndGenerateTypes(groupedData: GameMasterByKey) {
    const outputDir: string = 'generated/data/raw';
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const inputData = new InputData();
    const filesMapping: string[] = [];

    for (const [key, items] of Object.entries(groupedData)) {
        const fileName = `${key}.json`;
        fs.writeFileSync(path.join(outputDir, fileName), JSON.stringify(items, null, 2));

        const typeName = key.camelCase().capitalize();

        await inputData.addSource(
            'json',
            {
                name: typeName,
                samples: [JSON.stringify(items)],
            },
            () => jsonInputForTargetLanguage('typescript'),
        );

        filesMapping.push(key);
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

    fs.writeFileSync(path.join('generated', 'types.ts'), lines.join('\n'));

    const indexContent = generateInternalIndex(filesMapping);
    fs.writeFileSync(path.join('generated', 'index.ts'), indexContent);
}

function generateInternalIndex(keys: string[]): string {
    let content = `import * as Types from './types.js';\n\n`;
    content += `export const RawGameMaster = {\n`;

    keys.forEach((key) => {
        const typeName = key.camelCase().capitalize();
        content += `    get${typeName}: async (): Promise<Types.${typeName}[]> => {\n`;
        content += `        const data = await import('./data/raw/${key}.json', {\n`;
        content += `            with: { type: 'json' },\n`;
        content += `        });\n`;
        content += `        return (data.default || data) as unknown as Types.${typeName}[];\n`;
        content += `    },\n`;
    });

    content += `};\n`;
    return content;
}
