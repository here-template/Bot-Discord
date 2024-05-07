import {ActivityType, Events} from "discord.js";
import {blue} from "cli-color";
import {CustomClient} from "../../class/CustomClient";


export default async (client: CustomClient) => {
    client.once(Events.ClientReady, async () => {
        // @ts-ignore
        client.user.setPresence({
            activities: [{name: "status personnalisé", type: ActivityType.Watching}],
            status: "online",
        });
        // @ts-ignore
        await client.application.commands.set(client.commands.map((cmd) => cmd));

        // Delete "Connecting to Discord..."
        process.stdout.write('\x1B[0G\x1B[2K');
        // @ts-ignore
        console.log(blue.bold.underline(`${client.user.tag} est connecté à discord !`));
    })
}