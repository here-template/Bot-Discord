import {CustomClient} from "../../../../class/CustomClient";
import {AutocompleteInteraction, CommandInteraction} from "discord.js";
import {SubCommandRun} from "../../../../interface/command";

// noinspection JSUnusedGlobalSymbols
export default {
    async run(client: CustomClient, interaction: CommandInteraction) {
        return interaction.reply("Subcommand");
    },
    async runAutocomplete(client: CustomClient, interaction: AutocompleteInteraction) {
        return interaction.respond([{
            name: "test",
            value: "test"
        }])
    }
} as SubCommandRun;