import {CustomClient} from '../../class/CustomClient';
import * as fs from 'node:fs';
import * as path from 'node:path';

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient): Promise<void> => {
    return await new Promise<void>(async (resolve) => {
        const basePath = path.join(__dirname, '..', '..', 'events');
        for (const dirs of fs.readdirSync(basePath).filter((file) => fs.lstatSync(path.join(basePath, file)).isDirectory())) {
            const files = fs.readdirSync(path.join(basePath, dirs)).filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
            for (const evt of files) {
                await import(path.join(basePath, dirs, evt)).then((mod) => mod.default(client));
            }
        }
        resolve();
    });
}