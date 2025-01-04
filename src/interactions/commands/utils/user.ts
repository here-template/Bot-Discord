import Command from "../../../../internal/class/interactions/Command";
import { ChatInputCommandInteraction } from 'discord.js';

export default new Command()
    .setName("user")
    .setDescription("User command")
    .addUserOption((option) => 
        option.setName("user").setDescription("The user to show").setRequired(true)
    )
    .run((client, interaction: ChatInputCommandInteraction) => {
        const user = interaction.options.getUser('user');
        if (user) {
            interaction.reply(`User: ${user.username}`);
        } else {
            interaction.reply("User not found.");
        }
    });