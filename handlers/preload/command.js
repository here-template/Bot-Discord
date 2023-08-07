const {yellow} = require("cli-color");
const fs = require("fs");

module.exports = (client) => {
	console.log(yellow.underline("Commandes chargées :"));
	fs.readdirSync("./interactions/commands/").forEach((dir) => {
		const files = fs.readdirSync(`./interactions/commands/${dir}/`).filter((file) => file.endsWith(".js"));
		console.log(yellow.bold(`> ${dir} :`));
		files.forEach((file) => {
			let command = require(`../../interactions/commands/${dir}/${file}`);
			if (command) {
				//met le cooldown en ms
				if (command.cooldown) {
					command.cooldown *= 1000;
					if (command.cooldown > 2147483646) command.cooldown = 2147483646; //ne peut pas dépasser cette valeur
				}
				
				//si pas de devOnly, par defaut false
				if (!command.devOnly) command.devOnly = false;
				
				if (!command.mpLock) {
					//@Youritch : Besoins de toi pour la suite
				}
				
				
				//la categorie
				command.category = dir;
				//les permissions par défaut :
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
