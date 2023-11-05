const fs = require("fs");
const {greenBright, redBright, bold} = require("cli-color");
const selectType = {text: 3, user: 5, role: 6, mentionable: 7, channels: 8};

//const fileList = [];
const customIDList = [];

module.exports = (client) => {
	const files = fs.readdirSync(`./interactions/selects/`).filter((file) => file.endsWith(".js"));
	if (files.length === 0) return;
	console.log(greenBright.underline("Selects chargés :"));
	files.forEach((file) => {
		//if (fileList.includes(file)) console.log(redBright.bold(`>> Le select ${file} est déjà chargé, ou un deuxième fichier select à le même nom !`));
		//fileList.push(file);
		const select = require(`../../interactions/selects/${file}`);
		if (select) {
			// Check if customID is defined
			if (select.customID === undefined) return console.log(redBright.bold(`>> Le select dans ${file} n'a pas de customID !`));
			// Check if customID is already used
			if (customIDList.includes(select.customID)) return console.log(redBright.bold(`>> Le select avec comme id ${select.customID} est déjà chargé ou un doublon existe dans le fichier ${file} !`));
			customIDList.push(select.customID);
			// If not defined define to false
			if (!select.admin) {
				select.admin = false;
			}
			if (!select.type || !Object.keys(selectType).includes(select.type)) {
				return console.log(redBright.bold(`>>> ${select.customID} n'a pas de type défini !`));
			}
			console.log(greenBright(`  > ${select.customID} : ${select.type}`));
			select.type = selectType[select.type];
			
			//upload dans le bot
			client.selects.set(select.customID, select);
		}
	});
};
