import {SlashCommandBuilder} from "discord.js";
import {SubCommand} from "../../../interface/command";

// noinspection JSUnusedGlobalSymbols
export default {
    command: new SlashCommandBuilder()
        .setName("handler")
        .setDescription("Exemple pour les handlers")
        .addSubcommand(sub => sub
            .setName("button")
            .setDescription("Affiche un bouton et gère son event")
        )
        .addSubcommand(sub => sub
            .setName("select-menu")
            .setDescription("Affiche un menu déroulant et gère son event")
        )
        .addSubcommand(sub => sub
            .setName("modal")
            .setDescription("Affiche une modal et gère son event")
        ),
    data: {
        subCommand: true,
        devOnly: true,
    },
} as SubCommand;