const { redBright } = require("cli-color");
const { CommandInteraction, Client } = require("discord.js");

module.exports = {
  name: "stop",
  devOnly: false,
  category: "admin",
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  description: "Une commande pour stopper le bot.",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  run: async (client, interaction) => {
    interaction.reply("Shutdown du bot !");
    console.log(redBright.bold(">> Shutdown (par "+interaction.user.username+")! <<"));
    return client.destroy();
  },
};
