import {SlashCommandBuilder} from "discord.js";
import {SubCommand} from "../../../interface/command";

// noinspection JSUnusedGlobalSymbols
export default {
    command: new SlashCommandBuilder()
        .setName("subcommand")
        .setDescription("Ferme le bot.")
        .addSubcommand(sub => sub
            .setName("sub")
            .setDescription("Sous commande")
            .addStringOption(option => option
                .setRequired(true)
                .setName("test")
                .setDescription("Test")
                .setAutocomplete(true)
            )
        )
    ,
    data: {
        devOnly: true,
        subCommand: true,
    },
} as SubCommand;