import fs from 'fs';
import path from 'path';

export abstract class IntermediateGenerator {
    abstract getName(): string;
    abstract compute(): Promise<any>;

    async generate(): Promise<string> {
        const filePath = path.join('generated/data/intermediate', `${this.getName()}.json`);
        const start = performance.now();

        const result = await this.compute();
        const content = JSON.stringify(result, null, 2);

        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, content);

        const elapsedMs = Math.round(performance.now() - start);
        console.log(`Intermédiaire généré : ${filePath} (${elapsedMs}ms)`);

        return content;
    }
}
