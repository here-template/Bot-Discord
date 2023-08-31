const fs = require("fs");
const {cyan, redBright} = require("cli-color");

module.exports = (client) => {
	console.log(cyan.underline("Buttons chargés :"));
	let dirs = fs.readdirSync("./interactions/buttons/").filter((file) => !file.includes("."));
	dirs.push("../buttons");
	dirs.forEach((dir) => {
		const files = fs.readdirSync(`./interactions/buttons/${dir}/`).filter((file) => file.endsWith(".js"));
		if (files.length !== 0) console.log(cyan.bold(`> ${dir === "../buttons" ? "sans catégorie" : dir} :`));
		files.forEach((file) => {
			const button = require(`../../interactions/buttons/${dir}/${file}`);
			if (button) {
				if (button.customID === undefined) return console.log(redBright.bold(`>> Le button dans ${file} n'a pas de customID !`));
				//si pas spécifié alors par defaut false
				if (!button.admin) button.admin = false;
				if (!button.userOnly) button.userOnly = false;
				
				
				button.category = dir === "../buttons" ? "sans_categorie" : dir.toLowerCase();
				console.log(cyan(`  > ${button.customID}`));
				if (dir !== "../buttons") button.customID = `${dir}:${button.customID}`;
				client.buttons.set(button.customID, button);
			}
		});
	});
};
