/**
 * Copyright (c) 2025 Cleboost & Youritch from Here-Template
 * External contributor can be found on the GitHub
 * Licence: Not curently licensed
 */

import { BotClient } from "./class/BotClient";
import dotenv from "dotenv";

dotenv.config();

const client = new BotClient();

export { client };

client.start(process.env.TOKEN);