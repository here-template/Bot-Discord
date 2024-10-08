import {CustomClient} from '../../class/CustomClient';
import {MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction} from 'discord.js';
import {Context} from '../../interface/context';

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient, interaction: UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction) => {
    if (!client.config) return interaction.reply({content: 'Le bot n\'est pas encore prêt !', ephemeral: true});

    const cmd: Context = client.commands?.get(interaction.commandName) as Context;
    if (!cmd) {
        if (!client.config.config.checkCommandExists) return;
        return interaction.reply({
            content: 'Ce context menu ne semble pas exister !',
            ephemeral: true
        });
    }

    cmd.run(client, interaction);
}