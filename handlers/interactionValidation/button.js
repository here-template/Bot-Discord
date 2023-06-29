module.exports = (client, interaction) => {
	const button = client.buttons.get(interaction.customId);
	if (!button) return [false];
	//Vérifie si l'utilisateur est owner en cas de commande admin
	if (button.admin && !client.config.owner.includes(interaction.user.id)) {
		return [false, { content: "Vous n'êtes pas admin du bot !", ephemeral: true }];
	}
	return [true]
}