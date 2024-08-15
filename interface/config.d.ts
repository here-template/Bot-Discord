import {Snowflake} from "discord.js";

export interface Config {
    admin: [Snowflake];
    dev: [Snowflake];
    config: {
        checkCommandExists: boolean;
    },
    adminCategory: Array<string>; // Category name
}