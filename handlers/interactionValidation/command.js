const {PermissionsBitField, Collection} = require("discord.js");
const cooldown = new Collection();

module.exports = (client, interaction) => {
	const cmd = client.commands.get(interaction.commandName);
	if (!cmd) return [false, { content: "Cette commande ne semble pas exister !", ephemeral: true }];
	//Vérifie si l'utilisateur est owner en cas de commande admin
	if (cmd.category === "admin" && !client.config. owner.includes(interaction.user.id)) {
		return [false, { content: "Vous êtes pas administrateur du bot !", ephemeral: true }];
	}
	//Vérifie si l'utilisateur est owner en cas de commande dev only
	if (cmd.devOnly && !client.config.dev.includes(interaction.user.id)) {
		return [false, { content: "Commande en développement !", ephemeral: true }];
	}
	//Vérifie les permissions :
	if (cmd.userPermissions || cmd.botPermissions) {
		//Vérifie les permissions du bot pour executer le code
		if (!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(cmd.botPermissions || []))) {
			return [false, { content: `Le bot a besoin des permissions suivante : \`${cmd.botPermissions.join(", ")}\``, ephemeral: true }];
		}
		//Vérifie les permissions du bot pour executer le code
		if (!interaction.guild.members.cache.get(interaction.user.id).permissions.has(PermissionsBitField.resolve(cmd.userPermissions || []))) {
			return [false, { content: `Vous avez besoin des permissions suivante : \`${cmd.userPermissions.join(", ")}\``, ephemeral: true }];
		}
	}
	//Execution vérification pour cooldown
	if (cmd.cooldown && !cmd.devOnly) {
		if (cooldown.has(`${cmd.name}${interaction.user.id}`)) {
			const t = Math.floor((cooldown.get(`${cmd.name}${interaction.user.id}`) - Date.now()) / 1000);
			return [false, { content: `Cette commande à un cooldown, il reste **${t}s** !`}];
		}
		cooldown.set(`${cmd.name}${interaction.user.id}`, Date.now() + cmd.cooldown);
		setTimeout(() => {
			cooldown.delete(`${cmd.name}${interaction.user.id}`);
		}, cmd.cooldown);
	}
	return [true, cmd.run];
}