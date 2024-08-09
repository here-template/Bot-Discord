import {CustomClient} from "../../class/CustomClient";
import {
    ChannelSelectMenuInteraction,
    RoleSelectMenuInteraction,
    StringSelectMenuInteraction,
    UserSelectMenuInteraction
} from "discord.js";
import {Select} from "../../interface/select";

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient, interaction: StringSelectMenuInteraction | RoleSelectMenuInteraction | UserSelectMenuInteraction | ChannelSelectMenuInteraction) => {
    if (!client.config) return interaction.reply({content: "Le bot n'est pas encore prêt !", ephemeral: true});

    const type = (interaction: StringSelectMenuInteraction | RoleSelectMenuInteraction | UserSelectMenuInteraction | ChannelSelectMenuInteraction) => {
        if (interaction instanceof StringSelectMenuInteraction) return "string";
        if (interaction instanceof RoleSelectMenuInteraction) return "role";
        if (interaction instanceof UserSelectMenuInteraction) return "user";
        return "channel";
    }

    console.log(type(interaction) + ":" + interaction.customId)

    const select: Select = client.selects?.get(type(interaction) + ":" + interaction.customId) as Select
    if (!select) {
        if (!client.config.config.checkCommandExists) return;
        return interaction.reply({
            content: "Cette action ne semble pas exister !",
            ephemeral: true
        });
    }

    select.run(client, interaction);
}