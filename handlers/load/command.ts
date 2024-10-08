import {CustomClient} from '../../class/CustomClient';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {Command, SubCommand} from '../../interface/command';
import {redBright} from 'cli-color';
import subcommand from './subcommand';

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient): Promise<void> => {
    return await new Promise<void>(async (resolve) => {
        const basePath = path.join(__dirname, '..', '..', 'interactions', 'commands');
        for (const categories of fs.readdirSync(basePath)) {
            for (const command of fs.readdirSync(path.join(basePath, categories)).filter(file => file.endsWith('.ts') || file.endsWith('.js'))) {
                const cmd: Command = (await import(path.join(basePath, categories, command))).default;
                if (!('data' in cmd)) {
                    // @ts-ignore
                    cmd.data = {};
                }
                cmd.data.category = categories;
                if ((cmd as unknown as SubCommand).data.subCommand) {
                    await subcommand(client, cmd as unknown as SubCommand);
                }
                if (!('command' in cmd) || (!('run' in cmd) && !((cmd as unknown as SubCommand).data.subCommand))) {
                    console.log(redBright.bold(`>> La commande ${categories}/${command} n'est pas correcte !`));
                    continue;
                }
                client.commands?.set(cmd.command.name, cmd);
            }
        }
        resolve();
    });
}