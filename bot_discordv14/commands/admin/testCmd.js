const { CommandInteraction, Client} = require("discord.js");

module.exports = {
  name: "test",
  devOnly: true,
  category: "admin",
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  description: "Une commande de test",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  run: async (client, interaction) => {
    await interaction.deferReply(); //si il ya un test long à faire
    return interaction.editReply("Aucun test de codé !");
  },
};
