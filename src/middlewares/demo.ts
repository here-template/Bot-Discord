import ComandMiddleware from "../../internal/class/middlewares/CommandMiddleware";

export default new ComandMiddleware().run((interaction) => {
	if (interaction.commandName === "ping") return true;
	console.log(interaction.member?.roles);
	interaction.reply("You don't have the permission to use this command");
	return false
})
