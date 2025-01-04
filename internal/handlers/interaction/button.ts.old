import {CustomClient} from "../../class/CustomClient";
import {
    ButtonInteraction,
    ChannelSelectMenuInteraction,
    RoleSelectMenuInteraction,
    StringSelectMenuInteraction,
    UserSelectMenuInteraction
} from "discord.js";
import {Button} from "../../interface/button";
import path from "node:path";

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient, interaction: ButtonInteraction | StringSelectMenuInteraction | RoleSelectMenuInteraction | UserSelectMenuInteraction | ChannelSelectMenuInteraction) => {
    if (!client.config) return interaction.reply({content: "Le bot n'est pas encore prêt !", ephemeral: true});
    if (interaction.isAnySelectMenu()) return import(path.join(__dirname, "select")).then((mod) => mod.default(client, interaction));

    const btn: Button = client.buttons?.get(interaction.customId) as Button
    if (!btn) {
        if (!client.config.config.checkCommandExists) return;
        return interaction.reply({
            content: "Ce bouton ne semble pas exister !",
            ephemeral: true
        });
    }

    if (btn.admin && !client.config.admin.includes(interaction.user.id)) return interaction.reply({
        content: "Vous n'avez pas la permission d'utiliser ce bouton !",
        ephemeral: true
    });

    btn.run(client, interaction);
}