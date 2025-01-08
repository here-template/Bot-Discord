import { BotClient } from "djs-core";
import { config } from "dotenv";

config(); // Load the .env file

const client = new BotClient() // Create a new instance of the client (djs core custom client class)
client.start(process.env.TOKEN);  // Start the client with the token from the .env file

export default client; // Export the client for general use
