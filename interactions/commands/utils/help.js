const {ChatInputCommandInteraction, Client, EmbedBuilder} = require("discord.js");
const {readdirSync} = require("fs");
let dirsCategory = readdirSync("./interactions/commands/").filter((file) => !file.includes("."));
dirsCategory.push("../commands");
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
	description: "Une commande d'aide, avec la liste des commandes et leurs spécificités.",
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	runInteraction: async (client, interaction) => {
		const cmdName = interaction.options.getString("commande");
		if (!cmdName) {
			const noArgsEmbed = new EmbedBuilder().setColor("#E53935").addFields([{
				name: "La liste des commandes :",
				value: "Une liste de toutes les catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez `/help <command>`",
			}]);
			for (let category of dirsCategory) {
				if (category !== "admin" || client.config.owner.includes(interaction.user.id)) {
					if (category === "../commands") category = "sans_categorie";
					const cmdsUtilisable = client.commands.filter((cmd) => cmd.category === category.toLowerCase()).map((cmd) => `</${cmd.name}:${client.application.commands.cache.find((x) => x.name === cmd.name).id}>`).join(", ");
					noArgsEmbed.addFields([
						{
							name: `__> ${(category !== "sans_categorie" ? category : "sans catégorie").replace(/(^\w|\s\w)/g, (firstLetter) => firstLetter.toUpperCase())} :__`,
							value: `${cmdsUtilisable === "" ? "Pas de commande" : cmdsUtilisable}`,
						},
					]);
				}
			}
			return interaction.reply({embeds: [noArgsEmbed]});
		}
		const cmd = client.commands.get(cmdName);
		if (!cmd) return interaction.reply({
			content: `:x: \`${cmdName}\` n\'est pas une commande valide !`,
			ephemeral: true
		});
		//usage :
		let usage = `/${cmdName}`,
			opts = "";
		if (cmd.options) {
			for (const i in cmd.options) {
				usage += ` ${(cmd.options[i].required ? "<" : "[")}${cmd.options[i].name}${(cmd.options[i].required ? ">" : "]")}`;
				opts += cmd.options[i].name + " : " + cmd.options[i].description + "\n";
			}
		}
		const cmdId = client.application.commands.cache.find(x => x.name === cmdName).id;
		//embed :
		const embed = new EmbedBuilder()
			.setTitle(`"Information sur la commande :" </${cmdName}:${cmdId}>`)
			.setDescription(cmd.description)
			.addFields([{
				name: "Information : ",
				value: `\`\`\`yml\nCatégorie : ${cmd.category !== "sans_categorie" ? cmd.category : "sans catégorie"}\nUsage : ${usage}\`\`\``
			}])
			.setColor("#EF6C00")
			.setFooter({text: "💭 <> = obligatoire et [] = optionnel"});
		if (cmd.options) {
			embed.addFields({name: "Les options de la commande :", value: `\`\`\`yml\n${opts}\`\`\``});
		}
		interaction.reply({embeds: [embed]});
	},
	
	/**
	 * @param {AutocompleteInteraction} interaction
	 * @param {Client} client
	 */
	
	runAutocomplete: async (client, interaction) => {
		const focusedOptions = interaction.options.getFocused(true);
		let choices = client.commands?.map((c) => {
			if (c.category !== "admin" || client.config.owner.includes(interaction.user.id)) {
				return c.name;
			}
			
		});
		//vire les undefined
		choices = choices.filter((c) => c);
		if (!choices) return;
		const filtered = choices.filter((c) => c.includes(focusedOptions.value.toLowerCase()));
		const filterLimite = filtered.slice(0, 15);
		await interaction.respond(filterLimite.map((c) => ({name: `/${c}`, value: c})));
	},
};
