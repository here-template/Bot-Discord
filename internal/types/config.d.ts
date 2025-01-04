/**
 * Copyright (c) 2025 Cleboost & Youritch from Here-Template
 * External contributor can be found on the GitHub
 * Licence: on the GitHub
 */

// import { Snowflake } from "discord.js";

export default interface Config {
    // Pas sur de ce que je fais donc a revoir en voc discord 
    // permission: { 
    //     roles: {
    //         [roleName: string]: Snowflake;
    //     }
    //     categories: {
    //         [categoryName: string]: Snowflake;
    //     }
    // }
    logger?: {
        /**
         * Log all command executed
         * @default false
         * @type {boolean}
         */
        logCmd?: boolean; 
        /**
         * Log all button clicked
         * @default false
         * @type {boolean}
         */
        logBtn?: boolean;
        /**
         * Log all select menu selected
         * @default false
         * @type {boolean}
         */
        logSelect?: boolean;
        /**
         * Log all event handled created
         * @default false
         * @type {boolean}
         */
        logEvent?: boolean;
    }
}