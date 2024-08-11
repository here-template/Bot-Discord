import {ContextMenuCommandBuilder, UserContextMenuCommandInteraction} from 'discord.js';
import {CustomClient} from '../../../class/CustomClient';
import {Context} from '../../../interface/context';

// noinspection JSUnusedGlobalSymbols
export default {
    command: new ContextMenuCommandBuilder()
        .setName('money'),
    async run(client: CustomClient, interaction: UserContextMenuCommandInteraction) {
        const money = await client.db.user.findUnique({
            where: {id: interaction.targetUser.id},
            select: {money: true}
        });
        if (!money) return interaction.reply({content: 'Cet utilisateur n\'a pas encore d\'argent !'});
        return interaction.reply({content: `Cet utilisateur a ${money.money}€`});
    }
} as Context;