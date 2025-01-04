/**
 * Copyright (c) 2025 Cleboost & Youritch from Here-Template
 * External contributor can be found on the GitHub
 * Licence: Not curently licensed
 */

import { Client, GatewayIntentBits, Partials } from "discord.js";
import CommandHandler from "../handlers/Command";
import Command from "./interactions/Command";

export class BotClient extends Client {
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
				GatewayIntentBits.MessageContent,
			],
			partials: [Partials.Channel, Partials.User, Partials.Reaction, Partials.Message, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.ThreadMember],
		});
	}

	async start(token: unknown): Promise<void> {
		if (!token) {
			throw new Error("Token must be provided");
		}

		if (typeof token !== "string") {
			throw new Error("Token must be a string");
		}

		const handlers = [import("../handlers/Command")];

		let commandHandler: undefined | CommandHandler = undefined;
		await Promise.all(handlers).then((modules) => {
			modules.forEach((handlerModule) => {
				const HandlerClass = handlerModule.default;
				const handlerInstance = new HandlerClass(this);
				handlerInstance.load();
				if (handlerInstance instanceof CommandHandler) commandHandler = handlerInstance;
			});
		});

		console.log("All handlers loaded successfully");
		await this.login(token).catch((error) => {
			if ((error as { code?: string }).code === "TokenInvalid") {
				console.log("Token invalid");
			}
			process.exit(1);
		});

		this.once("ready", () => {
			console.log("Bot is ready");
			const commandsList = commandHandler?.getCollections().map((command) => (command as Command).getDiscordCommand());
			this.application?.commands
				.set(commandsList as unknown as Command[])
				.catch((error) => {
					console.log("Error while sending commands to Discord", error);
					process.exit(1);
				});
		});
	}
}
