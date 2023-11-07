const {client} = require("./../../index.js");
const {redBright} = require("cli-color");
const debug = process.env.DEBUG === "true";
const interType = {
	2: require("../../handlers/interactionValidation/command.js"),
	3: require("../../handlers/interactionValidation/component.js"),//Discord ne differencie pas les btns des selects
	4: require("../../handlers/interactionValidation/autocomplete.js"),
	5: require("../../handlers/interactionValidation/modal.js")
};
const {Events} = require("discord.js");

client.on(Events.InteractionCreate, async (interaction) => {
	if (interaction.user.bot) return console.log(`Le bot ${interaction.user.username} a tenté de faire une commande !`);
	const inter = await interType[interaction.type](client, interaction);
	if (!inter[0]) return interaction.reply(inter[1] ?? {
		content: "Cette action ne semble pas exister !",
		ephemeral: true
	});
	try {
		await inter[1](client, interaction);
		if (debug) console.log(`> ${Date.now() - interaction.createdTimestamp}ms`);
	} catch (err) {
		if (!err) return;
		console.log(redBright.bold(`>> Erreur dans ${interaction.commandName ?? interaction.customId ?? "inconue"} :`));
		console.log(err);
		let cmdPing = "";
		if (interaction.isChatInputCommand() && interaction.commandName != undefined) {
			cmdPing = ` (</${interaction.commandName}:${client.application.commands.cache.find((x) => x.name === interaction.command.name).id}>)`;
			if (interaction.options._subcommand ?? false) cmdPing = ` (</${interaction.command.name} ${interaction.options.getSubcommand()}:${client.application.commands.cache.find((x) => x.name === interaction.command.name).id}>)`;
		}
		if (debug) console.log(`> ${Date.now() - interaction.createdTimestamp}ms`);
		if (Date.now() - interaction.createdTimestamp > 3000 && !interaction.deferred) console.log(redBright.bold(`/!\\ Cette interaction a mis plus de 3000ms (${Date.now() - interaction.createdTimestamp}ms)\nL'utilisation de "interaction.deferReply();" est conseiller.`));
		if (interaction.responded || interaction.replied || interaction.deferred) return interaction.editReply({content: "Une erreur s'est produite !" + cmdPing});
		return interaction.reply({content: "Une erreur s'est produite !" + cmdPing, ephemeral: true});
	}
});
