module.exports = (client, interaction) => {
    const cmd = client.commands.get(interaction.commandName);
    if (cmd && cmd.isCommandeGroupe) {
        const subcmd = cmd.options.find(c => c.name === interaction.options.getSubcommand())
        if (!subcmd || !subcmd.runAutocomplete) return [false];
        return [true, subcmd.runAutocomplete];
    }
    if (!cmd || !cmd.runAutocomplete) return [false];
    return [true, cmd.runAutocomplete];
};