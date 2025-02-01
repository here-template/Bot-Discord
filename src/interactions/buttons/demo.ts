import { Button } from "djs-core";

export default new Button()
.setCustomId("demo")
.run((client, interaction) => {
    return interaction.reply({
        content: "Button handler demo"
    });
});