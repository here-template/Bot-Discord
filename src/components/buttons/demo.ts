import { Button } from "@djs-core/runtime";
import { ButtonStyle } from "discord.js";

export default new Button()
	.setLabel("Demo")
	.setStyle(ButtonStyle.Primary)
	.run(async (interaction) => {
		await interaction.reply("Hello, world!");
	});
