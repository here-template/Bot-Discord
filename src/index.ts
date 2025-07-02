import {BotClient} from 'djs-core';
import {config} from 'dotenv';
config();
const client = new BotClient();

// Import middlewares for demo
import commandMiddleware from "./middlewares/command.js";
import buttonMiddleware from "./middlewares/button.js";
import modalMiddleware from "./middlewares/modal.js";
import selectMiddleware from "./middlewares/select.js";
import cooldownMiddleware from "./middlewares/cooldown.js";
import analyticsMiddleware from "./middlewares/analytics.js";

// Register middlewares (order matters - analytics should run first, cooldown before command validation)
client.middlewares.push(analyticsMiddleware);  // Log everything first
client.middlewares.push(cooldownMiddleware);   // Check cooldowns
client.middlewares.push(commandMiddleware);    // General command validation
client.middlewares.push(buttonMiddleware);     // Button interaction middleware
client.middlewares.push(modalMiddleware);      // Modal submission middleware
client.middlewares.push(selectMiddleware);     // Select menu middleware

client.start(process.env.TOKEN);

// Export middlewares for external access
export {
    commandMiddleware,
    buttonMiddleware,
    modalMiddleware,
    selectMiddleware,
    cooldownMiddleware,
    analyticsMiddleware,
};