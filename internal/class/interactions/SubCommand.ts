/**
 * Copyright (c) 2025 Cleboost & Youritch from Here-Template
 * External contributor can be found on the GitHub
 * Licence: on the GitHub
 */

import { ChatInputCommandInteraction, CommandInteraction } from "discord.js";
import { BotClient } from "../BotClient";

type SubCommandRunFn = (client: BotClient, interaction: ChatInputCommandInteraction) => unknown;

export default class SubCommand {
	private runFn?: SubCommandRunFn;

	run(fn: SubCommandRunFn) {
		this.runFn = fn;
		return this;
	}

	execute(client: BotClient, interaction: CommandInteraction) {
		if (this.runFn && interaction instanceof ChatInputCommandInteraction) {
			return this.runFn(client, interaction);
		}
		if (interaction instanceof CommandInteraction) {
			return interaction.reply("Aucune action définie");
		}
	}
}
