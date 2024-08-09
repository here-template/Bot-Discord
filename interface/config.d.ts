import {Snowflake} from "discord.js";

export interface Config {
    owner: [Snowflake];
    dev: [Snowflake];
    config: {
        checkCommandExists: boolean;
    }
}