/**
 * Copyright (c) 2025 Cleboost & Youritch from Here-Template
 * External contributor can be found on the GitHub
 * Licence: on the GitHub
 */

import { Collection } from "discord.js";
import { BotClient } from "../class/BotClient";

export class Handler {
	protected collection: Collection<unknown, unknown> = new Collection();
	client: BotClient;

	constructor(client: BotClient) {
		this.client = client;
	}

	async load(): Promise<void> {}
	async event(): Promise<void> {}
	getCollections() {
		return this.collection;
	}
}
