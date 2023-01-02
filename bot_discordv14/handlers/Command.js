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
			//Je laisse au besoin (c'est pour preremplir les ficheir des cdm)
			/*let cmds = require('./../data/textes/commandes.json');
			cmds[command.name]={
				fr: {
					name: "",
					description: ""
				},
				en: {
					name: command.name,
					description: command.description
				}
			};
			fs.writeFileSync('./data/textes/commandes.json', JSON.stringify(cmds));
			if (command.options) {
				for (const i in command.options) {
					let opts = require('./../data/textes/options.json');
					opts[command.options[i].name]={
						fr: {
							name: "",
							description: "."
						},
						en: {
							name: command.options[i].name,
							description: command.options[i].description
						}
					};
					fs.writeFileSync('./data/textes/options.json', JSON.stringify(opts));
				}
			}*/
			//commands : 
			command.description=require('./../data/textes/commandes.json')[command.name].en.description;
			command.name_localizations=noramlise(require('./../data/textes/commandes.json')[command.name],'name');
			command.description_localizations=noramlise(require('./../data/textes/commandes.json')[command.name],'description');
			//options :
			if (command.options) {
				for (const i in command.options) {
					command.options[i].description = require('./../data/textes/options.json')[command.options[i].name].en.description;
					command.options[i].name_localizations=noramlise(require('./../data/textes/options.json')[command.options[i].name],'name');
					command.options[i].description_localizations=noramlise(require('./../data/textes/options.json')[command.options[i].name],'description');
				}
			}
			if (command.category==='base') {
				if (!command.level) {
					command.level=0;
				};
			};
			//upload dans le bot
	        client.commands.set(command.name, command);
	        console.log(yellow("  > " + command.name));
	      }
	    });
	  });
};

function noramlise(json,part) {
	let r={};
	for (const i in Object.keys(json)) {
		if (Object.keys(json)[i]!='en') {
			r[Object.keys(json)[i]]=json[Object.keys(json)[i]][part];
		}
	}
	return r;
}
