import {ModalSubmitInteraction} from "discord.js";
import {CustomClient} from "../class/CustomClient";

interface Modal {
    customID: string;
    run: (client: CustomClient, interaction: ModalSubmitInteraction) => void;
}