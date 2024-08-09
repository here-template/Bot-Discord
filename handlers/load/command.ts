import {CustomClient} from "../../class/CustomClient";
import * as fs from "node:fs";
import * as path from "node:path";
import {Command, SubCommand} from "../../interface/command";
import {redBright} from "cli-color";

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient): Promise<void> => {
    return await new Promise<void>(async (resolve) => {
        const basePath = path.join("interactions", "commands");
        for (const categories of fs.readdirSync(basePath)) {
            for (const command of fs.readdirSync(path.join(basePath, categories)).filter(file => file.endsWith('.ts'))) {
                const cmd: Command = require(path.join(__dirname, "..", "..", basePath, categories, command)).default;
                if (!('data' in cmd)) {
                    // @ts-ignore
                    cmd.data = {};
                }
                cmd.data.category = categories;
                if (!('command' in cmd) || (!('run' in cmd) && !((cmd as SubCommand).data.subCommand))) {
                    console.log(redBright.bold(`>> La commande ${categories}/${command} n'est pas correcte !`));
                    continue;
                }
                client.commands?.set(cmd.command.name, cmd);
            }
        }
        resolve();
    });
}