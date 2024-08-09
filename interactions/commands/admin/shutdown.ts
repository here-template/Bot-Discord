import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {CustomClient} from "../../../class/CustomClient";
import {Command} from "../../../interface/command";

// noinspection JSUnusedGlobalSymbols
export default {
    command: new SlashCommandBuilder()
        .setName("shutdown")
        .setDescription("Ferme le bot."),
    data: {
        devOnly: true,
    },
    async run(client: CustomClient, interaction: CommandInteraction) {
        console.log("dans ma commande")
        if (!client.config?.owner.includes(interaction.user.id)) return interaction.reply("Vous n'êtes pas le propriétaire du bot !");

        await interaction.reply("Shutdown du bot");
        await client.destroy();
        process.exit(0);
    }
} as Command;