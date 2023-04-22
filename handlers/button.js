const fs = require("fs");
const { cyan } = require("cli-color");

module.exports = (client) => {
	console.log(cyan.underline("Buttons chargés :"));
	const files = fs.readdirSync(`./interactions/button/`).filter((file) => file.endsWith(".js"));
	if (!files || files.length <= 0);
	files.forEach((file) => {
		const button = require(`../interactions/button/${file}`);
		if (button) {
			//si pas spécifié alors par defaut false
			if (!button.admin) {
				button.admin = false;
			}
			client.btn.set(button.customID, button);
			console.log(cyan(`  > ${button.customID}`));
		}
	});
};
