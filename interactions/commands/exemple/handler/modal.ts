import {CustomClient} from '../../../../class/CustomClient';
import {ActionRowBuilder, CommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle} from 'discord.js';
import {SubCommandRun} from '../../../../interface/command';

// noinspection JSUnusedGlobalSymbols
export default {
    async run(client: CustomClient, interaction: CommandInteraction) {
        const modal = new ModalBuilder()
            .setCustomId('test')
            .setTitle('Test');

        const input = new TextInputBuilder()
            .setCustomId('input')
            .setPlaceholder('Test')
            .setLabel('Mon super input')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);


        modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(input));

        return interaction.showModal(modal);
    }
} as SubCommandRun;