const { CommandInteraction, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder} = require("discord.js");

module.exports = {
  name: "sendmodal",
  description: "Envoie un bouton de test",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  runInteraction: async (client, interaction) => {
    // Creation du modals
      const modal = new ModalBuilder()
      .setCustomId('testmodal')
      .setTitle('My Modal');

    // Création de l'input
    const favoriteColorInput = new TextInputBuilder()
      .setCustomId('favoriteColorInput')
      .setLabel("What's your favorite color?")
      .setStyle(TextInputStyle.Short);

    const hobbiesInput = new TextInputBuilder()
      .setCustomId('hobbiesInput')
      .setLabel("What's some of your favorite hobbies?")
      .setStyle(TextInputStyle.Paragraph);

    // Convertion des input en components pour le modals
    const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
    const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

    // Ajout des components au modals
    modal.addComponents(firstActionRow, secondActionRow);

    // Affichage du modals au user
    await interaction.showModal(modal);
  },
};
