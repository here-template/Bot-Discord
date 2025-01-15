const {ChatInputCommandInteraction, Client} = require("discord.js");

module.exports = {
	name: "a",
	description: "1er choix.",
	subCommande: true,//obligatoire
	//tout les autres options (mp, cooldown…) sont à mettre dans le fichier principale (ici commandeGroupe.js)
	//les options discord fct ici
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	runInteraction: async (client, interaction) => {
		return interaction.reply({content: "Vous avez utilisé l'option **A** !!"});
	},
};
