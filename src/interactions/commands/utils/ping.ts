import Command from "../../../../internal/class/interactions/Command";
import { ChatInputCommandInteraction } from 'discord.js';

export default new Command()
    .setName("ping")
    .setDescription("Ping command")
    .run((client, interaction: ChatInputCommandInteraction) => {
        interaction.reply({ content: "Pong!\nLatency is " + client.ws.ping + "ms" });
    });