module.exports = (client, interaction) => {
	if (interaction.isButton()) {
		const button = client.buttons.get(interaction.customId);
		if (!button) return [false];
		//Vérifie si l'utilisateur est owner en cas de commande admin
		if (button.admin && !client.config.owner.includes(interaction.user.id)) {
			return [false, {content: "Vous n'êtes pas admin du bot !", ephemeral: true}];
		}
		if (button.userOnly && interaction.user.id !== interaction.message.interaction.user.id) return [false, {
			content: "Vous n'êtes pas originaire de cette commande !",
			ephemeral: true
		}];
		return [true, button.runInteraction];
	}
	//#########################
	const select = client.selects.get(interaction.customId);
	if (!select) return [false];
	//Vérifie si l'utilisateur est owner en cas de commande admin
	if (select.admin && !client.config.owner.includes(interaction.user.id)) {
		return [false, {content: "Vous n'êtes pas admin du bot !", ephemeral: true}];
	}
	return [true, select.runInteraction];
};