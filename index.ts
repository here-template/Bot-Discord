// Creation Date: 07.05.2024
// Update Date: 09/08/2024
// Template Version: 3.0.0
// Created By: Cleboost & Youritch in My-Template Organization
// Description: Main file of the bot


import {CustomClient} from './class/CustomClient';
import * as dotenv from 'dotenv';
import {Collection} from 'discord.js';
import {greenBright, magenta, redBright} from 'cli-color';
import Logger from './class/logger/Logger';
// @ts-ignore
import configFile from './config.json';
import {Config} from './interface/config';
import * as path from 'node:path';

dotenv.config();


const client: CustomClient = new CustomClient();
const logger: Logger = new Logger();

const config: Config = configFile as Config;
client.config = config;
client.logger = logger;

client.commands = new Collection();
client.buttons = new Collection();
client.selects = new Collection();
client.modals = new Collection();
client.contextMenus = new Collection();

export {client};

async function loadHandler() {
    for (const handler of ['command', 'context', 'event', 'button', 'modals', 'select']) {
        await (await import(path.join(__dirname, 'handlers', 'load', handler))).default(client);
    }
}

loadHandler().then(() => {
    console.log(magenta.bold.underline('All handlers loaded !'));
    process.stdout.write(greenBright.bold.underline('Connecting to Discord...'));
    client.login(process.env.TOKEN).catch((reason) => {
        process.stdout.write('\x1B[0G\x1B[2K');
        console.log(redBright.bold('Discord connection failed !'));
        switch (reason.code) {
            case 'ENOTFOUND':
                console.log(redBright('> Error: No internet connection !'));
                break;
            case 'TokenInvalid':
                console.log(redBright('> Token invalide ! Please check your token in the .env file or reset it (https://discord.com/developers/applications)!'));
                break;
            default:
                if (process.env.DEBUG === 'false') console.log(reason);
                break;
        }
        if (process.env.DEBUG === 'true') console.log(reason);
    });
});