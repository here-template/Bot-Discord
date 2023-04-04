const { CommandInteraction, Client, EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const commandFolder = readdirSync("./commands");

module.exports = {
	name: "help",
	options: [
		{
			name: "commande",
			description: "La commande dont vous voulez voire les informations.",
			type: 3,
			required: false,
			autocomplete: true,
		},
	],
	description: "Une commande d'aide, avec la liste des commandes et leurs spécifités.",
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	run: async (client, interaction) => {
		const cmdName = interaction.options.getString("commande");
		if (!cmdName) {
			const noArgsEmbed = new EmbedBuilder().setColor("#E53935").addFields([{ name: "La liste des commandes :", value: "Une liste de toutes les catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez `/help <command>`" }]);

			for (const category of commandFolder) {
				if (category != "admin"  || client.config.owner.includes(interaction.user.id)) {
					noArgsEmbed.addFields([
						{
							name: `__> ${category.replace(/(^\w|\s\w)/g, (firstLetter) => firstLetter.toUpperCase())} :__`,
							value: `\`/${client.commands
								.filter((cmd) => cmd.category == category.toLowerCase())
								.map((cmd) => cmd.name)
								.join(", /")}\``,
						},
					]);
				}
			}
			return interaction.reply({ embeds: [noArgsEmbed] });
		}
		const cmd = client.commands.get(cmdName);
		if (!cmd) return interaction.reply({ content: "Ce n'est pas une commade !", ephemeral: true });
		//usage :
		let usage = "/" + cmd.name, opts = "";
		if (cmd.options) {
			for (const i in cmd.options) {
				usage += " " + (cmd.options[i].required ? "<" : "[") + cmd.options[i].name + (cmd.options[i].required ? ">" : "]");
				opts += cmd.options[i].name + " : " + cmd.options[i].description + "\n";
			}
		}
		//embed :
		const embed = new EmbedBuilder()
			.setTitle(`${"Information sur la commande :"} \`/${cmd.name}\``)
			.setDescription(`${cmd.description}`)
			.addFields([{ name: "Information : ", value: `\`\`\`yml\nCategorie : ${cmd.category}\nUsage : ${usage}\`\`\`` }])
			.setColor("#EF6C00")
			.setFooter({ text: "💭 <> = obligatoire et [] = optionnel" });
		if (cmd.options) {
			embed.addFields({ name: "Les options de la commande :", value: `\`\`\`yml\n${opts}\`\`\`` });
		}
		interaction.reply({ embeds: [embed] });
	},

	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */

	runAutocomplete: async (client, interaction) => {
		const focusedOptions = interaction.options.getFocused(true);
		let choices = client.commands?.map((c) => {
			if (c.category != "admin") {
				return c.name;
			}
			return;
		});
		//vire les undefined
		choices = choices.filter((c) => c);
		if (!choices) return;
		const filtered = choices.filter((c) => c.includes(focusedOptions.value.toLowerCase()));
		const filterLimite = filtered.slice(0, 15);
		await interaction.respond(filterLimite.map((c) => ({ name: c, value: c })));
	},
};
