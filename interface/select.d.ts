import {
    ChannelSelectMenuInteraction,
    RoleSelectMenuInteraction,
    StringSelectMenuInteraction,
    UserSelectMenuInteraction
} from "discord.js";
import {CustomClient} from "../class/CustomClient";

interface Select {
    customID: string;
    run: (client: CustomClient, interaction: StringSelectMenuInteraction | RoleSelectMenuInteraction | UserSelectMenuInteraction | ChannelSelectMenuInteraction) => void;
}