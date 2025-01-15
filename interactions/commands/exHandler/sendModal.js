const {
	ChatInputCommandInteraction,
	Client,
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle
} = require("discord.js");

module.exports = {
	name: "sendmodal",
	description: "Envoie un bouton de test.",
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	runInteraction: async (client, interaction) => {
		// Creation du modals
		const modal = new ModalBuilder()
			.setCustomId("testModal") //custom ID du modal
			.setTitle("My Modal");
		
		// Création d'input (court)
		const favoriteColorInput = new TextInputBuilder()
			.setCustomId("favoriteColorInput")
			.setLabel("What's your favorite color?")
			.setStyle(TextInputStyle.Short);
		// Création d'input (long)
		const hobbiesInput = new TextInputBuilder()
			.setCustomId("hobbiesInput")
			.setLabel("What's some of your favorite hobbies?")
			.setStyle(TextInputStyle.Paragraph);
		
		// Convertion des input en components pour le modal
		const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
		const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);
		
		// Ajout des components au modal
		modal.addComponents(firstActionRow, secondActionRow);
		
		// Montre le modal
		await interaction.showModal(modal);
	},
};
