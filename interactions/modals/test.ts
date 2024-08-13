import {ModalSubmitInteraction} from "discord.js";
import {Modal} from "../../interface/modal";
import {CustomClient} from "../../class/CustomClient";

// noinspection JSUnusedGlobalSymbols
export default {
    customID: "test",
    async run(client: CustomClient, interaction: ModalSubmitInteraction) {
        const input = interaction.fields.getTextInputValue("input")
        return interaction.reply(`Le champ de texte contient: \`${input}\``)
    }
} as Modal;