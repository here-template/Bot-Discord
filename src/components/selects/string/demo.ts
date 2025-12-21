import { StringSelectMenu } from "@djs-core/runtime";

export default new StringSelectMenu()
	.addOptions([
		{
			label: "Option 1",
			value: "option1",
		},
		{
			label: "Option 2",
			value: "option2",
		},
	])
	.run(async (interaction) => {
		return interaction.reply({
			content: `You selected ${interaction.values[0]}`,
		});
	});
