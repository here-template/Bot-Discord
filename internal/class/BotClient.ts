/**
 * Copyright (c) 2025 Cleboost & Youritch from Here-Template
 * External contributor can be found on the GitHub
 * Licence: on the GitHub
 */

import { Client, GatewayIntentBits, Partials } from "discord.js";
import CommandHandler from "../handlers/Command";
import Command from "./interactions/Command";
import { Logger } from "./Logger";
import Config from "../types/config";
import configFile from "../../config";
import ComandMiddleware from "./middlewares/CommandMiddleware";
import ButtonMiddleware from "./middlewares/ButtonMiddleware";
import fs from "node:fs";
import path from "path";

export class BotClient extends Client {
	logger: Logger = new Logger();
	config: Config = configFile;
	middlewares: Array<ComandMiddleware | ButtonMiddleware> = [];
	constructor() {
		super({
			intents: [
				GatewayIntentBits.DirectMessageReactions,
				GatewayIntentBits.DirectMessageTyping,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.GuildModeration,
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

		await fs.promises
			.readdir(path.join(process.cwd(), "src", "middlewares"))
			.then(async (files) => {
				for (const file of files) {
					if (!file.endsWith(".ts") && !file.endsWith(".js")) {
						this.logger.warn(`The file ${file} is not a middleware`);
						return;
					}
					const middleware = (await import(path.join(process.cwd(), "src", "middlewares", file))).default;
					if (!(middleware instanceof ComandMiddleware) && !(middleware instanceof ButtonMiddleware)) {
						this.logger.error(`The middleware ${file} is not correct!`);
						return;
					}
					this.middlewares.push(middleware);
				}
			})
			.then(() => {
				if (this.middlewares.length === 0) return
				this.logger.info("All middlewares loaded successfully");
			})
			.catch((error) => {
				this.logger.error(`Error loading middlewares: ${error.message}`);
			});

		let commandHandler: undefined | CommandHandler = undefined;
		await Promise.all(handlers).then((modules) => {
			modules.forEach((handlerModule) => {
				const HandlerClass = handlerModule.default;
				const handlerInstance = new HandlerClass(this);
				handlerInstance.load();
				if (handlerInstance instanceof CommandHandler) commandHandler = handlerInstance;
			});
		});

		this.logger.info("All handlers loaded successfully");
		await this.login(token).catch((error) => {
			if ((error as { code?: string }).code === "TokenInvalid") {
				this.logger.error("Invalid token provided, please check your token (bot suhut down)");
			}
			process.exit(1);
		});

		this.once("ready", () => {
			const commandsList = commandHandler?.getCollections().map((command) => (command as Command).getDiscordCommand());
			this.application?.commands.set(commandsList as unknown as Command[]).catch(() => {
				this.logger.error("Error while sending commands to Discord");
				process.exit(1);
			});
			this.logger.success("Bot is ready");
		});
	}
}
