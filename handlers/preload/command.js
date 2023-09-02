const {yellow, redBright} = require("cli-color");
const fs = require("fs");

let listFile = [];
let listNameCommand = [];

module.exports = (client) => {
	console.log(yellow.underline("Commandes chargées :"));
	let dirs = fs.readdirSync("./interactions/commands/").filter((file) => !file.includes("."));
	dirs.push("../commands");
	dirs.forEach((dir) => {
		// Check if the file is not double loaded
		const files = fs.readdirSync(`./interactions/commands/${dir}/`).filter((file) => file.endsWith(".js"));
		if (files.length !== 0) console.log(yellow.bold(`> ${dir === "../commands" ? "sans catégorie" : dir} :`));
		files.forEach((file) => {
			if (listFile.includes(file)) console.log(redBright.bold(`>> La commande ${file} est déjà chargée ou un deuxième fichier commande à le même nom dans le dossier ${dir} !`));
			listFile.push(file);
			let command = require(`../../interactions/commands/${dir}/${file}`);
			if (command) {
				// Check if the command name is defined
				if (command.name === undefined) return console.log(redBright.bold(`>> La commande dans ${file} n'a pas de name !`));
				// Check if another command don't have the same name
				if (listNameCommand.includes(command.name)) return console.log(redBright.bold(`>> La commande avec comme nom ${command.name} est déjà chargée ou un doublon existe dans le fichier ${file} situé dans le dossier ${dir} !`));
				listNameCommand.push(command.name);
				if (command.description === undefined) return console.log(redBright.bold(`>> La commande dans ${file} n'a pas de description !`));
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
				command.category = dir === "../commands" ? "sans_categorie" : dir.toLowerCase();
				
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
