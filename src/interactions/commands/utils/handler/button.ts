import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { SubCommand } from "djs-core";

export default new SubCommand()
.run((client, interaction) => {
    return interaction.reply({
        content: "Button handler demo", 
        components: [new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder().setCustomId("demo").setLabel("Demo").setStyle(ButtonStyle.Success))]
    });
});