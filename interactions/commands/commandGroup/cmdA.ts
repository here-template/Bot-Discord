import {CustomClient} from "../../../class/CustomClient";
import {ChatInputCommandInteraction} from "discord.js";

export default {
    name: "a",
    description: "Exemple de structure de commande (ici avec toute les options).",
    subCommande: true,

    runInteraction: async (client: CustomClient, interaction: ChatInputCommandInteraction) => {
        return interaction.reply({content: "Vous avez utilisé l'option **A** !!"});
    }
}