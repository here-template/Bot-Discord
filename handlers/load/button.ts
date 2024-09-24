import {CustomClient} from '../../class/CustomClient';
import path from 'node:path';
import fs from 'node:fs';
import {Button} from '../../interface/button';

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient): Promise<void> => {
    return await new Promise<void>(async (resolve) => {
        const basePath = path.join('interactions', 'buttons');
        let buttons: Array<string> = [];
        for (const content of fs.readdirSync(basePath)) {
            if (fs.lstatSync(path.join(basePath, content)).isDirectory()) {
                for (const file of fs.readdirSync(path.join(basePath, content))) {
                    if (!file.endsWith('.ts') || file.endsWith('.js')) {
                        continue;
                    }

                    buttons.push(path.join(content, file));
                }
                continue;
            }

            if (!content.endsWith('.ts')) {
                continue;
            }

            buttons.push(content);
        }

        for (const button of buttons) {
            const btn: Button = (await import(path.join(__dirname, '..', '..', basePath, button))).default;

            if (!btn.customID) {
                console.log(`The button ${button} has no customID`);
                continue;
            }

            const directoryName = path.dirname(button).split(path.sep).pop();
            if (directoryName && directoryName !== '.') btn.customID = `${directoryName}:${btn.customID}`;

            client.buttons?.set(btn.customID, btn);
        }
        resolve();
    });
}
