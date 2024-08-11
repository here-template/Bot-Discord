import {Client, Collection, GatewayIntentBits, Partials} from 'discord.js';
import {Config} from '../interface/config';
import Logger from './logger/Logger';
import {PrismaClient} from '@prisma/client';

export class CustomClient extends Client {
    commands: Collection<unknown, unknown> | undefined;
    buttons: Collection<unknown, unknown> | undefined;
    selects: Collection<unknown, unknown> | undefined;
    modals: Collection<unknown, unknown> | undefined;
    contextMenus: Collection<unknown, unknown> | undefined;
    config: Config | undefined;
    logger: Logger | undefined;
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
        this.db = new PrismaClient();
    }
}