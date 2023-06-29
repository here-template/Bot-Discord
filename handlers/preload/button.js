const fs = require("fs");
const { cyan } = require("cli-color");

module.exports = (client) => {
	console.log(cyan.underline("Buttons chargés :"));
	const files = fs.readdirSync(`./interactions/buttons/`).filter((file) => file.endsWith(".js"));
	console.log(files);
	if (!files || files.length <= 0);
	files.forEach((file) => {
		const button = require(`../../interactions/buttons/${file}`);
		if (button) {
			//si pas spécifié alors par defaut false
			if (!button.admin) {
				button.admin = false;
			}
			client.buttons.set(button.customID, button);
			console.log(cyan(`  > ${button.customID}`));
		}
	});
};
