import SubCommandGroupe from "../../../../internal/class/interactions/SubCommandGroupe";

export default new SubCommandGroupe()
    .setName("sub")
    .setDescription("User command")
    .addSubcommand((subcommand) =>
        subcommand.setName("show")
            .setDescription("Show user")
            .addUserOption((option) =>
                option.setName("user").setDescription("The user to show").setRequired(true)
            )
    )