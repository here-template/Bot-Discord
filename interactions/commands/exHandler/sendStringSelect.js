const {ChatInputCommandInteraction, Client, ActionRowBuilder, StringSelectMenuBuilder} = require("discord.js");

module.exports = {
	name: "sendstringselect",
	description: "Envoie un string selects de test.",
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	runInteraction: async (client, interaction) => {
		const row = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId("sendStringSelect") //Custom ID du StrinSelectMenu
					.setPlaceholder("Choisissez une option")
					.addOptions([
						{
							label: "Option 1",
							value: "option1",
							description: "Description de l'option 1",
							emoji: "👍",
						},
						{
							label: "Option 2",
							value: "option2",
							description: "Description de l'option 2",
							emoji: "👎",
						}
					])
			);
		
		interaction.reply({content: "Voila le bouton de test !", components: [row]});
	},
};
