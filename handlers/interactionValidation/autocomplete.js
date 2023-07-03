module.exports = (client, interaction) => {
	const cmd = client.commands.get(interaction.commandName);
	if (!cmd || !cmd.runAutocomplete) return [false];
	return [true,cmd.runAutocomplete]
}