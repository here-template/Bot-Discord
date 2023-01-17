const { CommandInteraction, Client } = require("discord.js");

module.exports = {
	name: "exemple",
	description: "Exemple de structure de commande (ici avec toute les options).",
	cooldown: 5,//il faut attendre 5 secondes entre chaque utilisation de cette commande (sauf si elle est noté "devOnly: true")
	devOnly: true, //seul les utilisateurs qui ont leur id discord inscrit dans config.js peuvent executer cette commade
	userPermissions: ["Administrator"],//l'utilisateur a besoin des permissions administrateur pour executer cette commande
	botPermissions: ["Administrator"],//le bot a besoin des permissions administrateur pour executer cette commande
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	run: async (client, interaction) => {
		//le code de la commande ici
		interaction.reply({ content: "Ceci est une commande **d'exemple** __" + interaction.user.username + "__ !" });
	},
};
