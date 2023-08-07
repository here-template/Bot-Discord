module.exports = {
	customID: "sendButton",
	runInteraction: async (client, interaction) => {
		interaction.reply({content: "Vous avez cliqué sur le bouton !", ephemeral: true});
	},
};
