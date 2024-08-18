import {CustomClient} from '../../class/CustomClient';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {Context} from '../../interface/context';
import {ApplicationCommandType} from 'discord.js';

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient): Promise<void> => {
    return await new Promise<void>(async (resolve) => {
        for (const sub of ['user', 'message']) {
            const dir = path.join(path.join('interactions', 'context'), sub);
            const files = fs.readdirSync(dir).filter((file) => file.endsWith('.ts'));
            if (files.length > 5) {
                files.splice(5);
                console.log(`Plus de 5 context menu on était trouvé. Seulement les 5 premiers ont été chargé. Discord n'accepte pas plus de 5 context menu par application.`);
            }
            for (const file of files) {
                const context: Context = (await import(path.join('..', '..', dir, file))).default;
                const menuType = path.basename(dir);
                if (menuType === 'user') context.command.setType(ApplicationCommandType.User);
                if (menuType === 'message') context.command.setType(ApplicationCommandType.Message);
                client.commands?.set(context.command.name, context);
            }
        }
        resolve();
    });
}