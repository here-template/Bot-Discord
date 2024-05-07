
import {CommandInteractionOption, Interaction} from "discord.js";
import {CustomClient} from "../class/CustomClient";

interface Command {
    name: string;
    description: string;
    category?: string | "without category";
    commandeGroupe?: boolean | false;
    devOnly?: boolean | false;
    userPermissions?: string[];
    botPermissions?: string[];
    isCommandeGroupe?: boolean | false;
    subCommande?: boolean | false;
    mp?: boolean | false;
    cooldown?: number | 0;
    options?: CommandInteractionOption[];
    runInteraction: (client: CustomClient, interaction: Interaction) => void;
}