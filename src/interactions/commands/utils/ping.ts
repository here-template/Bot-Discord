import { EmbedBuilder } from "discord.js";
import { Command } from "djs-core";

export default new Command()
	.setName("ping")
	.setDescription("Get the bot latency")
	.run((client, interaction) => {
		return interaction.reply({
			embeds: [
				new EmbedBuilder().setTitle("Pong!").addFields([
					{
						name: "Latency",
						value: `${Date.now() - interaction.createdTimestamp}ms`,
					},
					{
						name: "API Latency",
						value: `${client.ws.ping}ms`,
					},
				]),
			],
		});
	});
