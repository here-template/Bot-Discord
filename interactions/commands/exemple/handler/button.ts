import {CustomClient} from "../../../../class/CustomClient";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction} from "discord.js";

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient, interaction: CommandInteraction) => {
    const testButton = new ButtonBuilder()
        .setCustomId("exemple:test")
        .setLabel("Test")
        .setStyle(ButtonStyle.Primary);

    const components = new ActionRowBuilder<ButtonBuilder>().addComponents(testButton);

    return interaction.reply({
        content: "Test",
        components: [components],
    });
}