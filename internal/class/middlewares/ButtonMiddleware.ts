/**
 * Copyright (c) 2025 Cleboost & Youritch from Here-Template
 * External contributor can be found on the GitHub
 * Licence: on the GitHub
 */

import { ButtonInteraction } from "discord.js";

export default class ButtonMiddleware {
    private fn: (interaction: ButtonInteraction) => void = () => {};
    constructor() {}

    run(fn: (interaction: ButtonInteraction) => void) {
        this.fn = fn;
        return this;
    }

    execute(interaction: ButtonInteraction) {
        return this.fn(interaction);
    }
}