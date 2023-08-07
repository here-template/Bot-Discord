const {yellow} = require("cli-color");
const fs = require("fs");

module.exports = (client) => {
	console.log(yellow.underline("Commandes chargées :"));
	let dirs = fs.readdirSync("./interactions/commands/");
	dirs.push("../commands");
	dirs.forEach((dir) => {
		const files = fs.readdirSync(`./interactions/commands/${dir}/`).filter((file) => file.endsWith(".js"));
		console.log(yellow.bold(`> ${dir === "../commands" ? "sans catégorie" : dir} :`));
		files.forEach((file) => {
			let command = require(`../../interactions/commands/${dir}/${file}`);
			if (command) {
				//met le cooldown en ms et ajuste le temps max
				if (command.cooldown) {
					command.cooldown *= 1000;
					if (command.cooldown > 2147483646) command.cooldown = 2147483646; //ne peut pas dépasser cette valeur
				}
				
				//si pas de devOnly, par defaut false
				if (!command.devOnly) command.devOnly = false;
				//pour bloquer l'utlisation de la commande en mp
				if (!command.mpLock) command.mpLock = false;
				
				
				//la categorie
				command.category = dir === "../commands" ? "sans_categorie" : dir;
				
				//les permissions (par défaut)
				if (!command.userPermissions) command.userPermissions = [];
				if (!command.botPermissions) command.botPermissions = [];
				command.userPermissions.push("SendMessages");
				command.botPermissions.push("SendMessages");
				//à faire : vérif taille description ?
				//upload dans le bot
				client.commands.set(command.name, command);
				console.log(yellow(`  > ${command.name}`));
			}
			
		});
	});
};
