import {ActivityType, ClientUser, Events} from 'discord.js';
import {blue} from 'cli-color';
import {CustomClient} from '../../class/CustomClient';
import {Command} from '../../interface/command';

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient) => {
    client.once(Events.ClientReady, async () => {
        (client.user as ClientUser).setPresence({
            activities: [{name: 'status personnalisé', type: ActivityType.Watching}],
            status: 'online'
        });
        // @ts-ignore
        await client.application.commands.set(client.commands.map((cmd: Command) => cmd.command));

        process.stdout.write('\x1B[0G\x1B[2K');
        // @ts-ignore
        console.log(blue.bold.underline(`${client.user.tag} est connecté à discord !`));
    });
}