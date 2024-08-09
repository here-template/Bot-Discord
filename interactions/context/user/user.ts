import {ContextMenuCommandBuilder, UserContextMenuCommandInteraction} from "discord.js";
import {CustomClient} from "../../../class/CustomClient";
import {ContextMenu} from "../../../interface/contextMenu";

// noinspection JSUnusedGlobalSymbols
export default {
    command: new ContextMenuCommandBuilder()
        .setName("user"),
    async run(client: CustomClient, interaction: UserContextMenuCommandInteraction) {
        return interaction.reply({content: `Tu as cliqué sur ${interaction.targetUser}`})
    }
} as ContextMenu;