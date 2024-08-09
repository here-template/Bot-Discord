import {
    AutocompleteInteraction,
    CommandInteraction,
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder
} from "discord.js";
import {CustomClient} from "../class/CustomClient";

interface CommandBase {
    command: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
    data: {
        category?: string;
        devOnly?: boolean;
        cooldown?: number;
    };
}

interface Command extends CommandBase {
    command: SlashCommandBuilder;
    run: (client: CustomClient, interaction: CommandInteraction) => any;
    runAutocomplete?: (client: CustomClient, interaction: AutocompleteInteraction) => any;
}

interface SubCommand extends CommandBase {
    command: SlashCommandSubcommandsOnlyBuilder;
    data: CommandBase["data"] & { subCommand: true };
}

interface SubCommandRun {
    run: (client: CustomClient, interaction: CommandInteraction) => any;
    runAutocomplete?: (client: CustomClient, interaction: AutocompleteInteraction) => any;
}