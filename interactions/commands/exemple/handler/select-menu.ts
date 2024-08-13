import {CustomClient} from "../../../../class/CustomClient";
import {
    ActionRowBuilder,
    ButtonStyle,
    CommandInteraction,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} from "discord.js";

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient, interaction: CommandInteraction) => {
    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId("test")
        .addOptions([
            new StringSelectMenuOptionBuilder()
                .setLabel("Test")
                .setValue("test")
                .setEmoji("🔴"),
            new StringSelectMenuOptionBuilder()
                .setLabel("Test 2")
                .setValue("test2")
                .setEmoji("🔵")
        ])
        .setPlaceholder("Test")

    const components = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);

    return interaction.reply({
        content: "Test",
        components: [components],
    });
}