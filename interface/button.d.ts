import {ButtonInteraction} from "discord.js";
import {CustomClient} from "../class/CustomClient";

interface Button {
    customID: string;
    admin?: boolean | undefined;
    run: (client: CustomClient, interaction: ButtonInteraction) => void;
}