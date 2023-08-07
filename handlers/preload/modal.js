const fs = require("fs");
const {black} = require("cli-color");

module.exports = (client) => {
	console.log(black.underline("Modals chargés :"));
	const files = fs.readdirSync(`./interactions/modals/`).filter((file) => file.endsWith(".js"));
	if (!files || files.length <= 0) ;
	files.forEach((file) => {
		const modal = require(`../../interactions/modals/${file}`);
		if (modal) {
			//si pas spécifié alors par defaut false
			if (!modal.admin) {
				modal.admin = false;
			}
			client.modals.set(modal.customID, modal);
			console.log(black(`  > ${modal.customID}`));
		}
	});
};
