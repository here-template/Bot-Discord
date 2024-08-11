import {CustomClient} from '../../class/CustomClient';
import {ModalSubmitInteraction} from 'discord.js';
import {Modal} from '../../interface/modal';

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient, interaction: ModalSubmitInteraction) => {
    if (!client.config) return interaction.reply({content: 'Le bot n\'est pas encore prêt !', ephemeral: true});

    const modal: Modal = client.modals?.get(interaction.customId) as Modal;
    if (!modal) {
        if (!client.config.config.checkCommandExists) return;
        return interaction.reply({
            content: 'Ce modal ne semble pas exister !',
            ephemeral: true
        });
    }

    modal.run(client, interaction);
}