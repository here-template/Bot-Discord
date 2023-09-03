const fs = require("fs");
const {black, redBright} = require("cli-color");

//const fileList = [];
const customIDList = [];

module.exports = (client) => {
	const files = fs.readdirSync(`./interactions/modals/`).filter((file) => file.endsWith(".js"));
	if (files.length === 0) return;
	console.log(black.underline("Modals chargés :"));
	files.forEach((file) => {
		//if (fileList.includes(file)) console.log(redBright.bold(`>> Le modal ${file} est déjà chargé, ou un deuxième fichier modal à le même nom !`));
		//fileList.push(file);
		const modal = require(`../../interactions/modals/${file}`);
		if (modal) {
			// Check if customID is defined
			if (modal.customID === undefined) return console.log(redBright.bold(`>> Le modal dans ${file} n'a pas de customID !`));
			// Check if customID is already used
			if (customIDList.includes(modal.customID)) return console.log(redBright.bold(`>> Le modal avec comme id ${modal.customID} est déjà chargé ou un doublon existe dans le fichier ${file} !`));
			customIDList.push(modal.customID);
			//si pas spécifié alors par defaut false
			if (!modal.admin) modal.admin = false;
			
			//upload dans le bot
			client.modals.set(modal.customID, modal);
			console.log(black(`  > ${modal.customID}`));
		}
	});
};
