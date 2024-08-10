import {ContextMenuCommandBuilder, UserContextMenuCommandInteraction} from "discord.js";
import {CustomClient} from "../../../class/CustomClient";
import {Context} from "../../../interface/context";

// noinspection JSUnusedGlobalSymbols
export default {
    command: new ContextMenuCommandBuilder()
        .setName("test2"),
    async run(client: CustomClient, interaction: UserContextMenuCommandInteraction) {
        return interaction.reply({content: `Tu as cliqué sur ${interaction.targetUser}`})
    }
} as Context;