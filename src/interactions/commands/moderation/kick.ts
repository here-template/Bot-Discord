import { Command } from "@djs-core/runtime";
import { PermissionFlagsBits } from "discord.js";

export default new Command()
	.setDescription("Kick a member from the server")
	.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
	.addUserOption((option) =>
		option.setName("user").setDescription("The user to kick").setRequired(true),
	)
	.addStringOption((option) =>
		option
			.setName("reason")
			.setDescription("The reason for the kick")
			.setRequired(false),
	)
	.run(async (interaction) => {
		const user = interaction.options.getUser("user");
		const reason = interaction.options.getString("reason");

		if (!user)
			return interaction.reply({ content: "User not found", ephemeral: true });
		const member = interaction.guild?.members.cache.get(user.id);
		if (!member)
			return interaction.reply({
				content: "Member not found",
				ephemeral: true,
			});
		await member.kick(reason || "Kicked by the server");

		return interaction.reply({
			content: `Kicked ${user.username} from the server`,
			ephemeral: true,
		});
	});
