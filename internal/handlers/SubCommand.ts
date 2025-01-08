/**
 * Copyright (c) 2025 Cleboost & Youritch from Here-Template
 * External contributor can be found on the GitHub
 * Licence: on the GitHub
 */

import { Handler } from "./Handler";
import path from "path";
import fs from "node:fs";
import SubCommandGroupe from "../class/interactions/SubCommandGroupe";
import { Events, Interaction, SlashCommandSubcommandBuilder } from "discord.js";
import SubCommand from "../class/interactions/SubCommand";

export default class SubCommandHandler extends Handler {
	// private middleware: Array<CommandMiddleware> = [];
	private subCommandGroupe: Array<SubCommandGroupe> = [];
	async load() {
		// this.middleware = this.client.middlewares.filter((middleware) => middleware instanceof CommandMiddleware) as Array<CommandMiddleware>;

		/* eslint-disable no-async-promise-executor */
		return new Promise<void>(async (resolve) => {
			const commands = path.join(process.cwd(), "src", "interactions", "commands");
			for (const categories of fs.readdirSync(commands)) {
				for (const command of fs.readdirSync(path.join(commands, categories)).filter((file) => file.endsWith(".ts") || file.endsWith(".js"))) {
					const cmd = (await import(path.join(commands, categories, command))).default;
					if (!(cmd instanceof SubCommandGroupe)) continue;
					if (!fs.existsSync(path.join(commands, categories, command))) return this.client.logger.error(`Command ${command} not found`);
					if (cmd.options.length === 0) return this.client.logger.error(`SubCommand ${command} has no options`);
					const subCommandPath = path.join(commands, categories, cmd.name);
					const subCommandFiles = fs.readdirSync(subCommandPath);
					for (const option of cmd.options as SlashCommandSubcommandBuilder[]) {
						if (!subCommandFiles.includes(option.name + ".ts")) {
							return this.client.logger.warn(`Subcommand ${option.name} for ${command} is missing`);
						}
						const subCmd = (await import(path.join(subCommandPath, option.name))).default;
						if (!(subCmd instanceof SubCommand)) return this.client.logger.error(`Subcommand ${option.name} for ${command} is not a SubCommand`);
						this.collection.set(`${cmd.name}.${option.name}`, subCmd);
					}
					this.subCommandGroupe.push(cmd);
				}
			}
			resolve();
			this.event();
		});
	}

	async getSubCommandGroupeDiscord() {
		return this.subCommandGroupe;
	}

	async event() {
		this.client.on(Events.InteractionCreate, async (interaction: Interaction) => {
			if (!interaction.isCommand()) return;
			if (interaction.isContextMenuCommand()) return;
			const subCommand: SubCommand | unknown = this.collection.get(`${interaction.commandName}.${interaction.options.getSubcommand()}`);
			if (!subCommand || !(subCommand instanceof SubCommand)) return this.client.logger.error(`SubCommand ${interaction.options.getSubcommand()} not found`);
			subCommand.execute(this.client, interaction);
		});
	}
}
