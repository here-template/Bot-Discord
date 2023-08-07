const fs = require("fs");
const {greenBright, redBright, bold} = require("cli-color");
const selectType = {text: 3, user: 5, role: 6, mentionable: 7, channels: 8};

module.exports = (client) => {
	console.log(greenBright.underline("Selects chargés :"));
	const files = fs.readdirSync(`./interactions/selects/`).filter((file) => file.endsWith(".js"));
	//if (!files || files.length <= 0); //pk il est là ?
	files.forEach((file) => {
		const select = require(`../../interactions/selects/${file}`);
		if (select) {
			//si pas spécifié alors par defaut false
			if (!select.admin) {
				select.admin = false;
			}
			if (!select.type || !Object.keys(selectType).includes(select.type)) {
				return console.log(redBright.bold(`>>> ${select.customID} n'a pas de type défini !`));
			}
			console.log(greenBright(`  > ${select.customID} : ${select.type}`));
			select.type = selectType[select.type];
			client.selects.set(select.customID, select);
		}
	});
};
