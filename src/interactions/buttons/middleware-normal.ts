import { Button } from "djs-core";

export default new Button()
.setCustomId("middleware-normal")
.run((client, interaction) => {
    return interaction.reply({
        content: "✅ Normal button clicked! This passed through all middlewares.",
        ephemeral: true
    });
});