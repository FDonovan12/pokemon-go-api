import fs from 'fs';
import path from 'path';
import { fetchGameMaster } from './fetchGameMaster.js';
import { GameMaster, GameMasterByKey, groupGameMaster } from './type/gameMasterType.js';

import 'utilitish';
import { generateTypesFile, TypeSource } from './quicktypeGenerator.js';

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

    const sources: TypeSource[] = [];
    const filesMapping: string[] = [];

    for (const [key, items] of Object.entries(groupedData)) {
        const fileName = `${key}.json`;
        fs.writeFileSync(path.join(outputDir, fileName), JSON.stringify(items, null, 2));

        const typeName = key.camelCase().capitalize();
        sources.push({ typeName, sample: JSON.stringify(items) });
        filesMapping.push(key);
    }

    await generateTypesFile(sources, 'generated/data/api/raw.type.ts');

    const indexContent = generateInternalIndex(filesMapping);
    fs.writeFileSync(path.join('generated', 'raw.index.ts'), indexContent);
}

function generateInternalIndex(keys: string[]): string {
    let content = `import * as Types from '@generated/data/api/raw.type.js';\n\n`;
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
