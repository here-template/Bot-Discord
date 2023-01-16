const { CommandInteraction, Client} = require("discord.js");

module.exports = {
  name: "test",
  userPermissions: [],
  botPermissions: [],
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
