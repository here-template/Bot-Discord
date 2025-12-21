import { ContextMenu } from "@djs-core/runtime";
import { ApplicationCommandType } from "discord.js";

export default new ContextMenu()
	.withType(ApplicationCommandType.Message)
	.run(async (interaction) => {
		await interaction.targetMessage.react("👍");
		return interaction.reply({
			content: "I like this message",
			ephemeral: true,
		});
	});
