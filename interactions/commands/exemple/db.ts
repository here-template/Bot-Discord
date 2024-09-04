import {SlashCommandBuilder} from 'discord.js';
import {Command} from '../../../interface/command';

// noinspection JSUnusedGlobalSymbols
export default {
    command: new SlashCommandBuilder()
        .setName('db')
        .setDescription('Exemple pour la base de données')
        .addUserOption(option => option
            .setName('user')
            .setDescription('Utilisateur')
            .setRequired(true))
        .addStringOption(option => option
            .setName('action')
            .setDescription('Action à effectuer')
            .setRequired(true)
            .addChoices([
                {
                    name: 'Ajouter de l\'argent',
                    value: 'add-money'
                },
                {
                    name: 'Retirer de l\'argent',
                    value: 'remove-money'
                }
            ]))
        .addIntegerOption(option => option
            .setName('amount')
            .setDescription('Montant')
            .setRequired(true)
        ),
    run: async (client, interaction) => {
        const user = interaction.options.getUser('user') ?? interaction.user;
        const action = interaction.options.getString('action') ?? 'null';
        const amount = interaction.options.getInteger('amount') ?? 0;


        if (amount <= 0) return interaction.reply({content: 'Le montant doit être supérieur à 0'});
        if (action === 'null') return interaction.reply({content: 'L\'action n\'est pas valide'});

        if (action === 'add-money') {
            await client.db.user.upsert({
                where: {id: user.id},
                create: {id: user.id, money: amount},
                update: {money: {increment: amount}}
            });
            return interaction.reply({content: `Vous avez ajouté ${amount}€ à ${user.tag}`});
        } else if (action === 'remove-money') {
            await client.db.user.upsert({
                where: {id: user.id},
                create: {id: user.id, money: 0},
                update: {money: {decrement: amount}}
            });
            return interaction.reply({content: `Vous avez retiré ${amount}€ à ${user.tag}`});
        }
    }
} as Command;