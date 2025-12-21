import demo from "@components/selects/string/demo";
import { Command } from "@djs-core/runtime";
import { ActionRowBuilder, type StringSelectMenuBuilder } from "discord.js";

export default new Command()
	.setDescription("Handle a select")
	.run(async (interaction) => {
		return interaction.reply({
			content: "Select handled",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(demo),
			],
		});
	});
