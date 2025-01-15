const {blue} = require("cli-color");
const fs = require("fs");

module.exports = (client) => {
	console.log(blue.underline("Evenements chargés :"));
	fs.readdirSync("./events/").forEach((dirs) => {
		const files = fs.readdirSync(`./events/${dirs}/`).filter((file) => file.endsWith(".js"));
		
		files.forEach((evt) => {
			require(`../../events/${dirs}/${evt}`);
			console.log(blue(`  > ${evt}`));
		});
	});
};
