import fs from 'fs';
import path from 'path';

export enum GeneratorSpeed {
    FAST = 0,
    MEDIUM = 1,
    SLOW = 2,
    VERY_SLOW = 3,
}
export abstract class FileGenerator {
    abstract getFileName(): string;
    abstract getFileContent(): Promise<string>;

    // par défaut FAST, chaque générateur override si besoin
    getSpeed(): GeneratorSpeed {
        return GeneratorSpeed.FAST;
    }

    async generate(): Promise<string> {
        const fileName = 'generated/data/' + this.getFileName();
        const start = performance.now();

        const content = await this.getFileContent();

        const dir = path.dirname(fileName);
        fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(fileName, content);

        const elapsedMs = Math.round(performance.now() - start);
        console.log(`Fichier généré : ${fileName} (${elapsedMs}ms)`);

        return content;
    }
}
