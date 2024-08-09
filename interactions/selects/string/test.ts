import {StringSelectMenuInteraction} from "discord.js";
import {CustomClient} from "../../../class/CustomClient";
import {Select} from "../../../interface/select";

// noinspection JSUnusedGlobalSymbols
export default {
    customID: "test",
    async run(client: CustomClient, interaction: StringSelectMenuInteraction) {
        const result = interaction.values;
        return interaction.reply(`Le champ sélectionné est : ${result}`)
    }
} as Select;