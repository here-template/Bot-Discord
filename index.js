const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { greenBright } = require("cli-color");
const env = require("dotenv").config();
const configFile = require("./config.json");
const { config } = require("dotenv");
const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildScheduledEvents,
		GatewayIntentBits.GuildScheduledEvents,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
	],
	partials: [Partials.Channel, Partials.User, Partials.Reaction, Partials.Message, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.ThreadMember],
});

console.log(greenBright.bold.underline("Lancement du bot :"));

//Mise en cache de la config :
client.config = configFile;

//config bdd :
if (configFile.bdd.enable) {
	require("./api/bdd.js");
}

//Création des collection discords pour les handlers :
client.commands = new Collection();
client.buttons = new Collection();
client.selects = new Collection();
client.modals = new Collection();

module.exports.client = client;

//Chargement en mémoire des handlers :
["command", "event", "button", "select", "modal"].forEach(async (handler) => {
	await require(`./handlers/preload/${handler}`)(client);
});

//Connection du bot :
client.login(process.env.TOKEN);