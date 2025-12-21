import { Command } from "@djs-core/runtime";
import { PermissionFlagsBits } from "discord.js";

export default new Command()
	.setDescription("Ban a member from the server")
	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
	.addUserOption((option) =>
		option.setName("user").setDescription("The user to ban").setRequired(true),
	)
	.addStringOption((option) =>
		option
			.setName("reason")
			.setDescription("The reason for the ban")
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
		await member.ban({ reason: reason || "Banned by the server" });

		return interaction.reply({
			content: `Banned ${user.username} from the server for ${reason || "no reason"}`,
			ephemeral: true,
		});
	});
