const {ChatInputCommandInteraction, Client} = require("discord.js");

module.exports = {
	name: "exemple",
	description: "Exemple de structure de commande (ici avec toute les options).",
	cooldown: 5,//Il faut attendre 5 secondes entre chaque utilisation de cette commande (sauf si elle est noté "devOnly: true")
	devOnly: true, //Seuls les utilisateurs qui ont leur id discord inscrit dans config.js peuvent execute cette commande
	mp: true, //Si true, la commande peut être execute en mp, si false elle peut etre executer que sur un serveur
	userPermissions: ["Administrator"], //L'utilisateur a besoin des permissions administrateur pour execute cette commande
	botPermissions: ["Administrator"], //Le bot a besoin des permissions administrateur pour execute cette commande
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	runInteraction: async (client, interaction) => {
		//le code de la commande ici
		return interaction.reply({content: `Ceci est une commande **d'exemple** __${interaction.user.username}__ !`});
	},
};
