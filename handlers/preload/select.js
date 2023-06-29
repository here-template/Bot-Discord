const fs = require("fs");
const { greenBright, redBright, bold } = require("cli-color");

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
			if (!select.type) {
				return console.log(redBright.bold(`>>> ${select.customID} n'a pas de type`))
			}
			client.selects.set(select.customID, select);
			console.log(greenBright(`  > ${select.customID}`));
		}
	});
};
