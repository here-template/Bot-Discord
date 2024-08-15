import {Client, Collection, GatewayIntentBits, Partials} from 'discord.js';
import {Config} from '../interface/config';
import Logger from './logger/Logger';
import {PrismaClient} from '../prisma/client';
// @ts-ignore
import configFile from '../config.json';

export class CustomClient extends Client {
    commands: Collection<unknown, unknown>;
    buttons: Collection<unknown, unknown>;
    selects: Collection<unknown, unknown>;
    modals: Collection<unknown, unknown>;
    contextMenus: Collection<unknown, unknown>;
    subCommands: Collection<unknown, unknown>;

    config: Config;
    logger: Logger;
    db: PrismaClient;

    constructor() {
        super({
            intents: [
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.DirectMessageTyping,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.GuildModeration,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildScheduledEvents,
                GatewayIntentBits.GuildScheduledEvents,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent
            ],
            partials: [Partials.Channel, Partials.User, Partials.Reaction, Partials.Message, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.ThreadMember]
        });
        this.commands = new Collection();
        this.buttons = new Collection();
        this.selects = new Collection();
        this.modals = new Collection();
        this.contextMenus = new Collection();
        this.subCommands = new Collection();

        this.logger = new Logger();
        this.config = configFile as Config;

        this.db = new PrismaClient();
    }
}