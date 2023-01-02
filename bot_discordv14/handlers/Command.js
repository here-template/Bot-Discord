const { yellow } = require("cli-color");
const fs = require("fs");

module.exports = (client) => {
	console.log(yellow.underline("Commandes chargées :"));
	  fs.readdirSync("./commands/").forEach((dir) => {
	    const files = fs
	      .readdirSync(`./commands/${dir}/`)
	      .filter((file) => file.endsWith(".js"));
	
	    files.forEach((file) => {
	      let command = require(`../commands/${dir}/${file}`);
	      if (command) {
			if (command.cooldown) {
				command.cooldown*=1000;
				if (command.cooldown>2147483646) {
					command.cooldown=2147483647;//ne peut pas dépasser cette valeur
				};
			};
			//upload dans le bot
	        client.commands.set(command.name, command);
	        console.log(yellow("  > " + command.name));
	      }
	    });
	  });
};
