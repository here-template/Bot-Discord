const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { greenBright } = require("cli-color");
const env = require("dotenv").config();
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
client.config = require("./config.js");
module.exports.client = client;

//Création des collèection discords pour les handlers :
client.commands = new Collection();
client.btn = new Collection();
client.select = new Collection();
client.modal = new Collection();

if (client.config.bdd) {
	client.bdd.host = "";
	client.bdd.port = "";
	client.bdd.user = "";
	client.bdd.password = "";
	client.bdd.database = ""; //Vide pour port 3306 par défaut
	require("./api/bdd.js");
}

// Chargement en mémoire des handlers :
["command", "event", "button", "select", "modal"].forEach(async (handler) => {
	await require(`./handlers/${handler}`)(client);
});
// Connection du bot
client.login(process.env.TOKEN);
