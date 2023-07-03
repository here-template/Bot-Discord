const { CommandInteraction, Client } = require("discord.js");

module.exports = {
	name: "exemple",
	description: "Exemple de structure de commande (ici avec toute les options).",
	cooldown: 5,//Il faut attendre 5 secondes entre chaque utilisation de cette commande (sauf si elle est noté "devOnly: true")
	devOnly: true, //Seul les utilisateurs qui ont leur id discord inscrit dans config.js peuvent executer cette commade
	mpLock: true, //Si true, la commande ne peut être executé que dans un salon d'un serveur et non en mp
	userPermissions: ["Administrator"], //L'utilisateur a besoin des permissions administrateur pour executer cette commande
	botPermissions: ["Administrator"], //Le bot a besoin des permissions administrateur pour executer cette commande
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	runInteraction: async (client, interaction) => {
		//le code de la commande ici
		return interaction.reply({ content: `Ceci est une commande **d'exemple** __${interaction.user.username}__ !` });
	},
};
