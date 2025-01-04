/**
 * Copyright (c) 2025 Cleboost & Youritch from Here-Template
 * External contributor can be found on the GitHub
 * Licence: on the GitHub
 */

import {white,bgBlue, bgGreen, bgRed} from 'kolorist';

export class Logger {
    success(message: string): void {
        console.log(bgGreen(white(' ✔ ')) + ' ' + message);
    }
    info(message: string): void {
        console.log(bgBlue(white(' ℹ ')) + ' ' + message);
    }
    error(message: string): void {
        console.log(bgRed(white(' ✖ ')) + ' ' + message);
    }
}