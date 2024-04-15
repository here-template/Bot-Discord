//Template made with love by Here-Template (https://github.com/here-template)
require("dotenv").config();
const {Client, GatewayIntentBits, Partials, Collection} = require("discord.js");
const {greenBright, redBright} = require("cli-color");
const configFile = require("./config.json");
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
if (configFile.bdd) {
	require("./api/bdd.js");
}

//Création des collections discords pour les handlers :
client.commands = new Collection();
client.buttons = new Collection();
client.selects = new Collection();
client.modals = new Collection();

//export du client
module.exports.client = client;

//Chargement en mémoire des handlers :
["command", "event", "button", "select", "modal"].forEach(async (handler) => {
	await require(`./handlers/preload/${handler}`)(client);
});
console.log(greenBright.bold.underline("Connection à discord…"));
//Connection du bot :
client.login(process.env.TOKEN).catch((reason) => {
	console.log(redBright.bold("La connection à discord à échoué !"));
	switch (reason.code) {
		case "ENOTFOUND":
			console.log(redBright("> Erreur de connection (vérifier votre connection à internet) !"));
			break;
		case "TokenInvalid":
			console.log(redBright("> Token invalide (vérifier votre token sur https://discord.com/developers/applications et dans le fichier .ENV) !"));
			break;
		default:
			if (process.env.DEBUG === "false") console.log(reason);
			break;
	}
	if (process.env.DEBUG === "true") console.log(reason);
});
