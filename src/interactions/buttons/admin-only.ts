import { Button } from "djs-core";

export default new Button()
.setCustomId("admin-only")
.run((client, interaction) => {
    return interaction.reply({
        content: "🔐 Admin button clicked! You have the required permissions.",
        ephemeral: true
    });
});