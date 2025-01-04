/**
 * Copyright (c) 2025 Cleboost & Youritch from Here-Template
 * External contributor can be found on the GitHub
 * Licence: on the GitHub
 */

import { SlashCommandBuilder } from "discord.js";

export default class SubCommandGroupe extends SlashCommandBuilder {
	constructor() {
		super();
	}

	getDiscordCommand() {
		return this.toJSON();
	}
}
