const { CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Permet d'obtenir la latence du bot.",
    devOnly: false,
    cooldown: 30,
    category: "utils",
    userPermissions: ["SendMessages"],
    botPermissions: ["SendMessages"],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
    */
    run: async (client, interaction) => {
        interaction.reply({content: `Le bot à une latence de :\`${client.ws.ping}ms\``})
    }
}