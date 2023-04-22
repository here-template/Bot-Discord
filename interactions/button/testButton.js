module.exports = {
	customID: "sendbutton",
	runInteraction: async (client, interaction) => {
		interaction.reply({ content: "Vous avez cliqué sur le bouton !", ephemeral: true });
	},
};
