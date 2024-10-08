import {
    ContextMenuCommandBuilder,
    MessageContextMenuCommandInteraction,
    UserContextMenuCommandInteraction
} from "discord.js";
import {CustomClient} from "../class/CustomClient";

interface Context {
    command: ContextMenuCommandBuilder
    run(client: CustomClient, interaction: UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction): any
}