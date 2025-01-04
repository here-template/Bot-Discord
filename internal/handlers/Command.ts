/**
 * Copyright (c) 2025 Cleboost & Youritch from Here-Template
 * External contributor can be found on the GitHub
 * Licence: on the GitHub
 */

import { Handler } from "./Handler";
import path from "path";
import fs from "node:fs";
import Command from "../class/interactions/Command";
import CommandGroup from "../class/interactions/CommandGroup";
import { Events, Interaction } from "discord.js";
import { underline } from "kolorist";

export default class CommandHandler extends Handler {
	async load() {
		/* eslint-disable no-async-promise-executor */
		return new Promise<void>(async (resolve) => {
			const commands = path.join(process.cwd(), "src", "interactions", "commands");
			for (const categories of fs.readdirSync(commands)) {
				for (const command of fs.readdirSync(path.join(commands, categories)).filter((file) => file.endsWith(".ts") || file.endsWith(".js"))) {
					const cmd = (await import(path.join(commands, categories, command))).default;
					if (cmd instanceof CommandGroup) continue;
					if (!(cmd instanceof Command)) {
						this.client.logger.error(`The command ${underline(`${categories}/${command}`)} is not correct!`);
						continue;
					}
					this.collection.set(cmd.name, cmd);
				}
			}
			resolve();
			this.event();
		});
	}

	async event() {
		this.client.on(Events.InteractionCreate, async (interaction: Interaction) => {
			if (!interaction.isCommand()) return;
			const command: Command = this.collection.get(interaction.commandName) as Command;
			if (!command) return;
			command.execute(this.client, interaction);
			if (this.client.config.logger?.logCmd) this.client.logger.info(`Commande ${underline(interaction.commandName)} par ${interaction.user.username} (${interaction.user.id})`);
		});
	}
}
