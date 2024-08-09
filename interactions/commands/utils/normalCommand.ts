import {SlashCommandBuilder} from "discord.js";
import {Command} from "../../../interface/command";

// noinspection JSUnusedGlobalSymbols
export default {
    command: new SlashCommandBuilder()
        .setName("normalcommand")
        .setDescription("Ferme le bot.")
        .addStringOption(option => option
            .setName("message")
            .setDescription("Message à afficher.")
            .setRequired(true)
            .setAutocomplete(true)
        ),
    run: async (client, interaction) => {
        const message = interaction.options.get("message")?.value as string;
        return interaction.reply(message ?? "Aucun message spécifié.");
    },
    runAutocomplete: async (client, interaction) => {
        return interaction.respond([{
            name: "test2",
            value: "test"
        }]);
    }
} as Command