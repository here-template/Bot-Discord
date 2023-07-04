const client = require("./../../index.js").client;
const {redBright, bold} = require("cli-color");
const interType = {
	2: require("../../handlers/interactionValidation/command.js"),
	3: require("../../handlers/interactionValidation/component.js"),//discord ne differencie pas les btns des selects
	4: require("../../handlers/interactionValidation/autocomplete.js"),
	5: require("../../handlers/interactionValidation/modal.js")
};
client.on("interactionCreate", async (interaction) => {
	console.log(interaction.type);
	if (interaction.user.bot) return console.log(`Le bot ${interaction.user.username} a tenté de faire une commande !`);
	const inter = interType[interaction.type](client, interaction);
	console.log(inter);
	if (!inter[0]) return interaction.reply(inter[1] ?? {
		content: "Cette action ne semble pas exister !",
		ephemeral: true
	});
	try {
		return await inter[1](client, interaction);
	} catch (err) {
		if (!err) return;
		console.log(redBright.bold(`>> Erreur dans ${interaction.commandName} :`));
		console.log(err);
		return interaction.reply({content: "Une erreur c'est produite !", ephemeral: true});
	}
});
