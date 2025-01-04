/**
 * Copyright (c) 2025 Cleboost & Youritch from Here-Template
 * External contributor can be found on the GitHub
 * Licence: on the GitHub
 */

import { ChatInputCommandInteraction } from "discord.js";

/**
 * fn
 * @type {Function} - Function to execute
 * @param {CommandInteraction} interaction - The interaction to check
 * @returns {boolean} - Return true if accepted event, false otherwise
 * @public
 */

type fn = (interaction: ChatInputCommandInteraction) => boolean;

export default class ComandMiddleware {
	private fn: fn | null = null;
	constructor() {}

	run(fn: fn) {
		this.fn = fn;
		return this;
	}

	/**
	 * @private
	 * DO NOT USE 
	 * Internal method to execute the function
	 */
	execute(interaction: ChatInputCommandInteraction) {
		if (this.fn) {
			return this.fn(interaction);
		}
		return true;
	}
}
