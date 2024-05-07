import {Interaction} from "discord.js";
import {CustomClient} from "../class/CustomClient";

interface Buttons {
    customID: string;
    category: string;
    admin?: boolean | false;
    userOnly?: boolean | false;
    runInteraction: (client: CustomClient, interaction: Interaction) => void;
}