import {CustomClient} from "../../class/CustomClient";
import {MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction} from "discord.js";
import {ContextMenu} from "../../interface/contextMenu";

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient, interaction: UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction) => {
    if (!client.config) return interaction.reply({content: "Le bot n'est pas encore prêt !", ephemeral: true});

    const cmd: ContextMenu = client.commands?.get(interaction.commandName) as ContextMenu
    if (!cmd) {
        if (!client.config.config.checkCommandExists) return;
        return interaction.reply({
            content: "Ce context menu ne semble pas exister !",
            ephemeral: true
        });
    }

    cmd.run(client, interaction);
}