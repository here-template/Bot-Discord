const {yellow, redBright} = require("cli-color");
const fs = require("fs");

module.exports = (client) => {
	console.log(yellow.underline("Commandes chargées :"));
	let dirs = fs.readdirSync("./interactions/commands/").filter((file) => !file.includes("."));
	dirs.push("../commands");
	dirs.forEach((dir) => {
		const files = fs.readdirSync(`./interactions/commands/${dir}/`).filter((file) => file.endsWith(".js"));
		if (files.length !== 0) console.log(yellow.bold(`> ${dir === "../commands" ? "sans catégorie" : dir} :`));
		files.forEach((file) => {
			let commande = require(`../../interactions/commands/${dir}/${file}`);
			if (commande && !commande.subCommande) {
				if (commande.name === undefined) return console.log(redBright.bold(`>> La commande dans commandes/${dir === "../commands" ? "" : dir + "/"}${file} n'a pas de name !`));
				if (commande.description === undefined) return console.log(redBright.bold(`>> La commande dans commandes/${dir === "../commands" ? "" : dir + "/"}${file} n'a pas de description !`));
				//met le cooldown en ms et ajuste le temps max
				if (commande.cooldown) {
					commande.cooldown *= 1000;
					if (commande.cooldown > 2147483646) commande.cooldown = 2147483646; //ne peut pas dépasser cette valeur
				}
				
				//si pas de devOnly, par defaut false
				if (!commande.devOnly) commande.devOnly = false;
				//pour bloquer l'utlisation de la commande en mp
				if (!commande.mp) commande.mp = false;
				
				//la categorie
				if (!commande.commandeGroupe) commande.category = dir === "../commands" ? "sans_categorie" : dir.toLowerCase();
				
				//les permissions (par défaut)
				if (!commande.userPermissions) commande.userPermissions = [];
				if (!commande.botPermissions) commande.botPermissions = [];
				commande.userPermissions.push("SendMessages");
				commande.botPermissions.push("SendMessages");
				
				//à faire : vérif taille description ?
				//upload dans le bot
				if (commande.commandeGroupe && dir !== "../commands") {
					commande.isCommandeGroupe = true;
					commande.options = [];
					const cmdGroupe = fs.readdirSync(`./interactions/commands/${dir}/`).filter((file) => file.endsWith(".js"));
					for (const subCommandeFile of cmdGroupe) {
						let subCommande = require(`../../interactions/commands/${dir}/${subCommandeFile}`);
						if (subCommande) {
							if (subCommande.name === commande.name || !subCommande.subCommande) continue;
							if (subCommande.name === undefined) {
								console.log(redBright.bold(`>> La commande dans commands/${dir === "../commands" ? "" : dir + "/"}${subCommandeFile} n'a pas de name !`));
								continue;
							}
							if (subCommande.description === undefined) {
								console.log(redBright.bold(`>> La commande dans commands/${dir === "../commands" ? "" : dir + "/"}${subCommandeFile} n'a pas de description !`));
								continue;
							}
							subCommande.type = 1;
							commande.options.push(subCommande);
							console.log(yellow(`  > ${commande.name} ${subCommande.name}`));
						}
					}
				} else {
					commande.isCommandeGroupe = false;
					console.log(yellow(`  > ${commande.name}`));
				}
				client.commands.set(commande.name, commande);
			}
			
		});
	});
};
