module.exports = (client, interaction) => {
	const modal = client.modals.get(interaction.customId);
	if (!modal) return [false];
	//Vérifie si l'utilisateur est owner en cas de commande admin
	if (modal.admin && !client.config.owner.includes(interaction.user.id)) {
		return [false, {content: "Vous n'êtes pas admin du bot !", ephemeral: true}];
	}
	return [true, modal.runInteraction];
};