import {ContextMenuCommandBuilder, MessageContextMenuCommandInteraction} from "discord.js";
import {CustomClient} from "../../../class/CustomClient";
import {Context} from "../../../interface/context";

// noinspection JSUnusedGlobalSymbols
export default {
    command: new ContextMenuCommandBuilder()
        .setName("test1"),
    async run(client: CustomClient, interaction: MessageContextMenuCommandInteraction) {
        return interaction.reply({content: `Message cliqué : \`${interaction.targetMessage}\``})
    }
} as Context;