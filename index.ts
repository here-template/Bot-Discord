/**
 * Copyright (c) 2025 Cleboost & Youritch from Here-Template
 * External contributor can be found on the GitHub
 * Licence: on the GitHub
 */

import { BotClient } from "./internal/class/BotClient";
import dotenv from "dotenv";

dotenv.config();

const client = new BotClient();

export { client };

client.start(process.env.TOKEN);