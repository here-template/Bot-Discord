import {ButtonInteraction} from "discord.js";
import {CustomClient} from "../../../class/CustomClient";
import {Button} from "../../../interface/button";

// noinspection JSUnusedGlobalSymbols
export default {
    customID: "test",
    async run(client: CustomClient, interaction: ButtonInteraction) {
        return interaction.reply("Le bouton test a été cliqué !")
    }
} as Button;