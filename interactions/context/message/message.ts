import {ContextMenuCommandBuilder, MessageContextMenuCommandInteraction} from "discord.js";
import {CustomClient} from "../../../class/CustomClient";
import {ContextMenu} from "../../../interface/contextMenu";

// noinspection JSUnusedGlobalSymbols
export default {
    command: new ContextMenuCommandBuilder()
        .setName("message"),
    async run(client: CustomClient, interaction: MessageContextMenuCommandInteraction) {
        return interaction.reply({content: `Message cliqué : \`${interaction.targetMessage}\``})
    }
} as ContextMenu;