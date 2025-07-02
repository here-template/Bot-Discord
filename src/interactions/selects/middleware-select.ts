import { SelectMenu } from "djs-core";

export default new SelectMenu()
.setCustomId("middleware-select")
.run((client, interaction) => {
    const selectedValues = interaction.values;
    const selectedLabels = selectedValues.map(value => {
        switch(value) {
            case "normal": return "Normal Option";
            case "admin-option": return "Admin Option";
            case "multi1": return "Multiple Options";
            case "multi2": return "More Options";
            case "multi3": return "Even More";
            case "multi4": return "Too Many";
            default: return value;
        }
    });

    return interaction.reply({
        content: `📋 Select menu processed successfully!\n\n**Selected options:**\n${selectedLabels.map(label => `• ${label}`).join('\n')}\n\nThis interaction passed through all middleware checks!`,
        ephemeral: true
    });
});