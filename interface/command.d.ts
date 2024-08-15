import {
    AutocompleteInteraction,
    ChatInputCommandInteraction,
    CommandInteractionOptionResolver,
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder
} from 'discord.js';
import {CustomClient} from '../class/CustomClient';

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
    run: (client: CustomClient, interaction: ChatInputCommandInteraction) => any;
    runAutocomplete?: (client: CustomClient, interaction: AutocompleteInteraction) => any;
}

interface SubCommand extends CommandBase {
    command: SlashCommandSubcommandsOnlyBuilder;
    data: CommandBase['data'] & { subCommand: true };
}

interface SubCommandRun{
    run: (client: CustomClient, interaction: ChatInputCommandInteraction) => any;
    runAutocomplete?: (client: CustomClient, interaction: AutocompleteInteraction) => any;
    data: CommandBase['data'];
}

declare module 'discord.js' {
    interface CommandInteraction {
        options: CommandInteractionOptionResolver;
    }
}
