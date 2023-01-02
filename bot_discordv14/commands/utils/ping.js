const { CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: "ping",
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
        interaction.reply({content: `Ping :\`${client.ws.ping}ms\``})
    }
}