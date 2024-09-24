import {CustomClient} from '../../class/CustomClient';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {SubCommand, SubCommandRun} from '../../interface/command';
import {redBright} from 'cli-color';

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient, cmd: SubCommand): Promise<void> => {
    return await new Promise<void>(async (resolve) => {
        const basePath = path.join('interactions', 'commands', cmd.data.category as string, cmd.command.name);
        for (const subCommand of fs.readdirSync(basePath).filter(file => file.endsWith('.ts') || file.endsWith('.js'))) {
            const subCmd: SubCommandRun = (await import(path.join(__dirname, '..', '..', basePath, subCommand))).default;
            if (!('run' in subCmd)) {
                console.log(redBright.bold(`>> La SubCommand ${cmd.data.category}/${subCommand} n'est pas correcte !`));
                continue;
            }
            client.subCommands?.set(cmd.command.name + ':' + subCommand.split('.')[0], subCmd);
        }
        resolve();
    });
}