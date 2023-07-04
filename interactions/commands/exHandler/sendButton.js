const {CommandInteraction, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");

module.exports = {
	name: "sendbutton",
	description: "Envoie un bouton de test",
	userOnly: true,
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	runInteraction: async (client, interaction) => {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId("sendbutton") //Custom ID du bouton pour interactions/buttons/sendButton.js
					.setLabel("Test")
					.setStyle(ButtonStyle.Primary) //Style du bouton avoir sur https://discordjs.guide/message-components/buttons.html#button-styles
			);
		
		interaction.reply({content: "Voila le bouton de test !", components: [row]});
	},
};
