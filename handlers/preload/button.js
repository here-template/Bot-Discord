const fs = require("fs");
const {cyan} = require("cli-color");

module.exports = (client) => {
	console.log(cyan.underline("Buttons chargés :"));
	let dirs = fs.readdirSync("./interactions/buttons/").filter((file) => !file.includes("."));
	dirs.push("../buttons");
	dirs.forEach((dir) => {
		const files = fs.readdirSync(`./interactions/buttons/${dir}/`).filter((file) => file.endsWith(".js"));
		console.log(cyan.bold(`> ${dir === "../buttons" ? "sans categorie" : dir} :`));
		files.forEach((file) => {
			const button = require(`../../interactions/buttons/${dir}/${file}`);
			if (button) {
				//si pas spécifié alors par defaut false
				if (!button.admin) button.admin = false;
				if (!button.userOnly) button.userOnly = false;
				button.category = dir === "../buttons" ? "sans" : dir;
				
				client.buttons.set(button.customID, button);
				console.log(cyan(`  > ${button.customID}`));
			}
		});
	});
};
