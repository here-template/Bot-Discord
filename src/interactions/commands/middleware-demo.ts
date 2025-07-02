import { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { Command } from "djs-core";

export default new Command()
	.setName("middleware-demo")
	.setDescription("Demonstrate middleware functionality")
	.run((client, interaction) => {
		const selectMenu = new StringSelectMenuBuilder()
			.setCustomId("middleware-select")
			.setPlaceholder("Select an option to test middleware")
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel("Normal Option")
					.setDescription("This option should work for everyone")
					.setValue("normal"),
				new StringSelectMenuOptionBuilder()
					.setLabel("Admin Option")
					.setDescription("This option requires admin permissions")
					.setValue("admin-option"),
				new StringSelectMenuOptionBuilder()
					.setLabel("Multiple Options")
					.setDescription("Select this and others to test validation")
					.setValue("multi1"),
				new StringSelectMenuOptionBuilder()
					.setLabel("More Options")
					.setDescription("Additional option for testing")
					.setValue("multi2"),
				new StringSelectMenuOptionBuilder()
					.setLabel("Even More")
					.setDescription("Test selection limit")
					.setValue("multi3"),
				new StringSelectMenuOptionBuilder()
					.setLabel("Too Many")
					.setDescription("This should trigger validation")
					.setValue("multi4")
			)
			.setMaxValues(5);

		const buttons = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setCustomId("middleware-normal")
					.setLabel("Normal Button")
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId("admin-only")
					.setLabel("Admin Only")
					.setStyle(ButtonStyle.Danger)
			);

		const selectRow = new ActionRowBuilder<StringSelectMenuBuilder>()
			.addComponents(selectMenu);

		return interaction.reply({
			content: "🛠️ **Middleware Demo**\n\nTry the buttons and select menu below to see how middlewares work:\n\n" +
					"• **Normal Button**: Should work for everyone\n" +
					"• **Admin Only Button**: Requires administrator permissions\n" +
					"• **Select Menu**: Try selecting different options, including admin-only ones\n" +
					"• **Multiple Selections**: Select more than 3 options to test validation\n\n" +
					"Check the console logs to see middleware activity!",
			components: [buttons, selectRow],
			ephemeral: false
		});
	});