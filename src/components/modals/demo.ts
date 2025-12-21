import { Modal } from "@djs-core/runtime";
import {
	FileUploadBuilder,
	LabelBuilder,
	TextInputBuilder,
	TextInputStyle,
} from "discord.js";

export default new Modal()
	.setTitle("Demo")
	.addLabelComponents([
		new LabelBuilder()
			.setLabel("Name")
			.setDescription("Enter your name")
			.setTextInputComponent(
				new TextInputBuilder()
					.setCustomId("name")
					.setStyle(TextInputStyle.Short)
					.setRequired(true),
			),
		new LabelBuilder()
			.setLabel("Mom's picture")
			.setDescription("Send a cute picture of your mom")
			.setFileUploadComponent(
				new FileUploadBuilder().setCustomId("mom_picture").setRequired(true),
			),
	])
	.run(async (interaction) => {
		const uploadedFiles = interaction.fields.getUploadedFiles("mom_picture");
		const files = uploadedFiles ? Array.from(uploadedFiles.values()) : [];
		return interaction.reply({
			content: `Say Hello to : ${interaction.fields.getTextInputValue("name")}! I send you a picture of his mom :`,
			files,
		});
	});
