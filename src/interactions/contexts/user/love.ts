import { ContextMenu } from "@djs-core/runtime";
import { ApplicationCommandType } from "discord.js";

export default new ContextMenu()
	.withType(ApplicationCommandType.User)
	.run(async (interaction) => {
		if (
			interaction.channel &&
			"send" in interaction.channel &&
			typeof interaction.channel.send === "function"
		) {
			await interaction.channel.send(
				`${interaction.targetUser.username} loves you!`,
			);
		} else {
			await interaction.reply({
				content: "Could not send a message in this channel.",
				ephemeral: true,
			});
			return;
		}
		return interaction.reply({
			content: "I sent you a message",
			ephemeral: true,
		});
	});
