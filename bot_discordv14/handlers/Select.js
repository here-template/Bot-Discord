const fs = require("fs");
const { greenBright } = require("cli-color");

module.exports = (client) => {
	console.log(greenBright.underline("Selects chargés :"));
	const files = fs.readdirSync(`./interactions/select/`).filter((file) => file.endsWith(".js"));
	if (!files || files.length <= 0);
	files.forEach((file) => {
		const select = require(`../interactions/select/${file}`);
		if (select) {
			//si pas spécifié alors par defaut false
			if (!select.admin) {
				select.admin = false;
			}
			client.select.set(select.customID, select);
			console.log(greenBright(`  > ${select.customID}`));
		}
	});
};
