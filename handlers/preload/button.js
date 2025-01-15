const fs = require("fs");
const {cyan, redBright} = require("cli-color");

//const fileList = [];
const customIDList = [];

module.exports = (client) => {
	let dirs = fs.readdirSync("./interactions/buttons/");
	if (dirs.length === 0) return;
	console.log(cyan.underline("Buttons chargés :"));
	dirs = dirs.filter((file) => !file.includes("."));
	dirs.push("../buttons");
	dirs.forEach((dir) => {
		// Check if the file is not double loaded
		const files = fs.readdirSync(`./interactions/buttons/${dir}/`).filter((file) => file.endsWith(".js"));
		if (files.length === 0) return;
		console.log(cyan.bold(`> ${dir === "../buttons" ? "sans catégorie" : dir} :`));
		files.forEach((file) => {
			//if (fileList.includes(file)) console.log(redBright.bold(`>> Le button ${file} est déjà chargé ou un deuxième fichier button à le même nom dans le dossier ${dir} !`));
			//fileList.push(file);
			const button = require(`../../interactions/buttons/${dir}/${file}`);
			if (button) {
				// Check if the button customID is defined
				if (button.customID === undefined) return console.log(redBright.bold(`>> Le button dans ${file} n'a pas de customID !`));
				// Check if another button don't have the same customID
				if (customIDList.includes(button.customID)) return console.log(redBright.bold(`>> Le button avec comme id ${button.customID} est déjà chargé ou un doublon existe dans le fichier ${file} situé dans le dossier ${dir} !`));
				customIDList.push(button.customID);
				
				//Si admin et userOnly non défini, on les défini à false :
				if (!button.admin) button.admin = false;
				if (!button.userOnly) button.userOnly = false;
				
				button.category = dir === "../buttons" ? "sans_categorie" : dir.toLowerCase();
				console.log(cyan(`  > ${button.customID}`));
				if (dir !== "../buttons") button.customID = `${dir}:${button.customID}`;
				client.buttons.set(button.customID, button);
			}
		});
	});
};
