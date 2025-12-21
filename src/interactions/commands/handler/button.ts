import demo from "@components/buttons/demo";
import { Command } from "@djs-core/runtime";
import { ActionRowBuilder, type ButtonBuilder } from "discord.js";

export default new Command()
	.setDescription("Handle a button")
	.run(async (interaction) => {
		return interaction.reply({
			content: "Button handled",
			components: [new ActionRowBuilder<ButtonBuilder>().addComponents(demo)],
		});
	});
