const { CommandInteraction, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");

module.exports = {
  name: "sendbutton",
  description: "Envoie un bouton de test",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  run: async (client, interaction) => {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setCustomId("sendbutton") //Cutom ID du bouton pour interactions/button/sendButton.js
        .setLabel("Test")
        .setStyle(ButtonStyle.Primary) //Style du bouton avoir sur https://discordjs.guide/message-components/buttons.html#button-styles
      )

    interaction.reply({ content: "Voila le bouton de test !", components: [row] });
  },
};
