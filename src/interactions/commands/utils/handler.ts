import { SubCommandGroup } from "djs-core";

export default new SubCommandGroup()
.setName("handler")
.setDescription("Demo of the handler command")
.addSubcommand(command => command
    .setName("button")
    .setDescription("Demo of the button handler")
)