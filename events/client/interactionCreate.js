const client = require("./../../index.js").client;
const {redBright, bold} = require("cli-color");
const debug = process.env.DEBUG === "true";
const interType = {
	2: require("../../handlers/interactionValidation/command.js"),
	3: require("../../handlers/interactionValidation/component.js"),//discord ne differencie pas les btns des selects
	4: require("../../handlers/interactionValidation/autocomplete.js"),
	5: require("../../handlers/interactionValidation/modal.js")
};

client.on("interactionCreate", async (interaction) => {
	const time = Date.now();
	/*if (debug) {
		console.log(interaction);//pas tres utile
	}*/
	if (interaction.user.bot) return console.log(`Le bot ${interaction.user.username} a tenté de faire une commande !`);
	const inter = await interType[interaction.type](client, interaction);
	if (!inter[0]) return interaction.reply(inter[1] ?? {
		content: "Cette action ne semble pas exister !",
		ephemeral: true
	});
	try {
		await inter[1](client, interaction);
		if (debug) console.log(`> ${Date.now() - time}ms`);
	} catch (err) {
		if (!err) return;
		console.log(redBright.bold(`>> Erreur dans ${interaction.commandName} :`));
		console.log(err);
		if (debug) console.log(`> ${Date.now() - time}ms`);
		if (Date.now() - time > 3000 && !interaction.deferred) console.log(redBright.bold(`/!\\ Cette interaction a mis plus de 3000ms (${Date.now() - time}ms)\nL'utilisation de "interaction.deferReply();" est conseiller.`));
		if (interaction.responded || interaction.replied || interaction.deferred) return interaction.editReply({content: "Une erreur c'est produite !"});
		return interaction.reply({content: "Une erreur c'est produite !", ephemeral: true});
	}
});
