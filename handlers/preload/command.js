const {yellow, redBright} = require("cli-color");
const fs = require("fs");

//const listFile = [];
const listNameCommand = [];

module.exports = (client) => {
	let dirs = fs.readdirSync("./interactions/commands/");
	if (dirs.length === 0) return;
	console.log(yellow.underline("Commandes chargées :"));
	dirs = dirs.filter((file) => !file.includes("."));
	dirs.push("../commands");
	dirs.forEach((dir) => {
		// Check if the file is not double loaded
		const files = fs.readdirSync(`./interactions/commands/${dir}/`).filter((file) => file.endsWith(".js"));
		if (files.length === 0) return;
		console.log(yellow.bold(`> ${dir === "../commands" ? "sans catégorie" : dir} :`));
		files.forEach((file) => {
			let commande = require(`../../interactions/commands/${dir}/${file}`);
			if (commande && !commande.subCommande) {
				if (!verifCmdPAram(commande, dir, file)) return;
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
				if (commande.category === "") commande.category = "sans_categorie";
				if (!commande.commandeGroupe) commande.category = dir === "../commands" ? "sans_categorie" : dir.toLowerCase();
				//les permissions (par défaut)
				if (!commande.userPermissions) commande.userPermissions = [];
				if (!commande.botPermissions) commande.botPermissions = [];
				commande.userPermissions.push("SendMessages");
				commande.botPermissions.push("SendMessages");
				
				//upload dans le bot
				if (commande.commandeGroupe && dir !== "../commands") {
					commande.isCommandeGroupe = true;
					commande.options = [];
					console.log(yellow(`(${commande.category})`));
					const cmdGroupe = fs.readdirSync(`./interactions/commands/${dir}/`).filter((file) => file.endsWith(".js"));
					for (const subCommandeFile of cmdGroupe) {
						let subCommande = require(`../../interactions/commands/${dir}/${subCommandeFile}`);
						if (subCommande) {
							if (subCommande.name === commande.name || !subCommande.subCommande) continue;
							if (!verifCmdPAram(subCommande, dir, subCommandeFile)) continue;
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

function verifCmdPAram(commande, dir, file) {
	//verification de la presence d'un name et description
	if (commande.name === undefined || commande.name.length === 0) {
		console.log(redBright.bold(`>> La commande dans commandes/${dir === "../commands" ? "" : dir + "/"}${file} n'a pas de name !`));
		return false;
	}
	if (commande.description === undefined || commande.description.length === 0) {
		console.log(redBright.bold(`>> La commande dans commandes/${dir === "../commands" ? "" : dir + "/"}${file} n'a pas de description !`));
		return false;
	}
	//verification de la taille des name et description
	if (commande.name.length > 32) {
		console.log(redBright.bold(`>> La commande dans commandes/${dir === "../commands" ? "" : dir + "/"}${file} a un nom de plus de 32 caractères (${commande.name.length}/32) !`));
		return false;
	}
	if (commande.description.length > 100) {
		console.log(redBright.bold(`>> La commande dans commandes/${dir === "../commands" ? "" : dir + "/"}${file} a une description de plus de 100 caractères (${commande.description.length}/100) !`));
		return false;
	}
	return true;
}