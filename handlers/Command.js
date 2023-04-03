const { yellow } = require("cli-color");
const fs = require("fs");

module.exports = (client) => {
	console.log(yellow.underline("Commandes chargées :"));
	fs.readdirSync("./commands/").forEach((dir) => {
		const files = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
		console.log(yellow.bold("> " + dir + " :"));
		files.forEach((file) => {
			let command = require(`../commands/${dir}/${file}`);
			if (command) {
				//met le cooldown en ms
				if (command.cooldown) {
					command.cooldown *= 1000;
					if (command.cooldown > 2147483646) {
						command.cooldown = 2147483646; //ne peut pas dépasser cette valeur
					};
				};
				//si pas de devOnly, par defaut false
				if (!command.devOnly) {
					command.devOnly = false;
				};
				//la categorie
				command.category = dir;
				//les permission par défaut :
				if (!command.userPermissions) {
					command.userPermissions = [];
				};
				if (!command.botPermissions) {
					command.botPermissions = [];
				};
				command.userPermissions.push("SendMessages");
				command.botPermissions.push("SendMessages");
				//à faire : vérif taille description
				//upload dans le bot
				client.commands.set(command.name, command);;
				console.log(yellow("  > " + command.name));
			};
		});
	});
};
