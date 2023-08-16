const fs = require("fs");
const {black, redBright} = require("cli-color");

module.exports = (client) => {
	console.log(black.underline("Modals chargés :"));
	const files = fs.readdirSync(`./interactions/modals/`).filter((file) => file.endsWith(".js"));
	if (!files || files.length <= 0) ;
	files.forEach((file) => {
		const modal = require(`../../interactions/modals/${file}`);
		if (modal) {
			if (modal.customID === undefined) return console.log(redBright.bold(`>> Le modal dans ${file} n'a pas de customID !`));
			//si pas spécifié alors par defaut false
			if (!modal.admin) {
				modal.admin = false;
			}
			client.modals.set(modal.customID, modal);
			console.log(black(`  > ${modal.customID}`));
		}
	});
};
