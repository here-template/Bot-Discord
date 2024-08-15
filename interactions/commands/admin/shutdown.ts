import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {CustomClient} from "../../../class/CustomClient";
import {Command} from "../../../interface/command";

// noinspection JSUnusedGlobalSymbols
export default {
    command: new SlashCommandBuilder()
        .setName("shutdown")
        .setDescription("Ferme le bot."),
    async run(client: CustomClient, interaction: CommandInteraction) {
        await interaction.reply("Shutdown du bot");
        await client.destroy();
        process.exit(0);
    }
} as Command;