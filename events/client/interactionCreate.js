const { InteractionType, Collection, PermissionsBitField } = require("discord.js");
const client = require("./../../index.js").client;
const config = client.config;
const cooldown = new Collection();
const clc = require("cli-color");

client.on("interactionCreate", async (interaction) => {
	if (interaction.user.bot) return console.log(`Le bot ${interaction.user.username} a tenté de faire une commande !`);
	// Vérifie si l'interaction est une commande
	if (interaction.type === InteractionType.ApplicationCommand) {
		//#########################################################################################################
		const cmd = client.commands.get(interaction.commandName);
		if (!cmd) return;
		//Vérifie si l'utilisateur est owner en cas de commande admin
		if (cmd.category === "admin" && !config.owner.includes(interaction.user.id)) {
			return interaction.reply({ content: "Vous êtes pas administrateur du bot !", ephemeral: true });
		}
		//Vérifie si l'utilisateur est owner en cas de commande dev only
		if (cmd.devOnly && !config.dev.includes(interaction.user.id)) {
			return interaction.reply({ content: "Commande en développement !", ephemeral: true });
		}
		//Vérifie les permissions :
		if (cmd.userPermissions || cmd.botPermissions) {
			//Vérifie les permissions du bot pour executer le code
			if (!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(cmd.botPermissions || []))) {
				return interaction.reply({ content: `Le bot a besoin des permissions suivante : \`${cmd.botPermissions.join(", ")}\``, ephemeral: true });
			}
			//Vérifie les permissions du bot pour executer le code
			if (!interaction.guild.members.cache.get(interaction.user.id).permissions.has(PermissionsBitField.resolve(cmd.userPermissions || []))) {
				return interaction.reply({ content: `Vous avez besoin des permissions suivante : \`${cmd.userPermissions.join(", ")}\``, ephemeral: true });
			}
		}
		//Execution vérification pour coldown
		if (cmd.cooldown && !cmd.devOnly) {
			if (cooldown.has(`${cmd.name}${interaction.user.id}`)) {
				const t = Math.floor((cooldown.get(`${cmd.name}${interaction.user.id}`) - Date.now()) / 1000);
				return interaction.reply({ content: `Cette commande à un cooldown, il reste **${t}s** !`});
			}
			cooldown.set(`${cmd.name}${interaction.user.id}`, Date.now() + cmd.cooldown);
			setTimeout(() => {
				cooldown.delete(`${cmd.name}${interaction.user.id}`);
			}, cmd.cooldown);
		}
		//Execute le code de la commande
		try {
			return cmd.run(client, interaction);
		} catch (err) {
			if (!err) return;
			console.log(clc.redBright.bold(`>> Erreur dans ${interaction.commandName} :`));
			console.log(err);
			return interaction.reply({ content: "il ya une une erreur !", ephemeral: true });
		}
		//#########################################################################################################
		//auto complete
	} else if (interaction.type === 4) {
		const cmd = client.commands.get(interaction.commandName);
		if (!cmd || !cmd.runAutocomplete) return;
		else return cmd.runAutocomplete(client, interaction);
		//buttons :
	} else if (interaction.isButton()) {
		const button = client.btn.get(interaction.customId);
		if (!button) return;
		//Vérifie si l'utilisateur est owner en cas de commande admin
		if (button.admin && !config.owner.includes(interaction.user.id)) {
			return interaction.reply({ content: "Vous n'etes pas admin du bot !", ephemeral: true });
		}
		return button.runInteraction(client, interaction);
		//selects
	} else if (interaction.isSelectMenu()) {
		const selectMenu = client.select.get(interaction.customId);
		if (!selectMenu) return;
		//Vérifie si l'utilisateur est owner en cas de commande admin
		if (selectMenu.admin && !config.owner.includes(interaction.user.id)) {
			return interaction.reply({ content: "Vous n'etes pas admin du bot !", ephemeral: true });
		}
		return selectMenu.runInteraction(client, interaction);
		//modal
	} else if (interaction.isModalSubmit()) {
		const modal = client.modal.get(interaction.customId);
		if (!modal) return;
		//Vérifie si l'utilisateur est owner en cas de commande admin
		if (modal.admin && !config.owner.includes(interaction.user.id)) {
			return interaction.reply({ content: "Vous n'etes pas admin du bot !", ephemeral: true });
		}
		return modal.runInteraction(client, interaction);
	}
	return interaction.reply({ content: "Il y a une une erreur !", ephemeral: true });
});
