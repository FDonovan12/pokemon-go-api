import fs from 'fs';
import path from 'path';

export abstract class FileGenerator {
    abstract getFileName(): string;
    abstract getFileContent(): Promise<string>;

    async generate(): Promise<void> {
        const fileName = 'generated/data/' + this.getFileName();
        const content = await this.getFileContent();

        const dir = path.dirname(fileName);
        fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(fileName, content);
        console.log(`Fichier généré : ${fileName}`);
    }
}
