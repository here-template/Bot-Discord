import { Command } from "@djs-core/runtime";

export default new Command()
	.setDescription("Ping the bot")
	.run(async (interaction) => {
		await interaction.reply({
			content: `Pong! ${interaction.client.ws.ping}ms`,
		});
	});
