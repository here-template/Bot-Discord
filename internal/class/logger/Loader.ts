/**
 * Copyright (c) 2025 Cleboost & Youritch from Here-Template
 * External contributor can be found on the GitHub
 * Licence: Not curently licensed
 */

export default class Loader {
    private frame = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
    private text = "";
    private interval: NodeJS.Timeout | undefined;

    constructor() {
    }

    public start() {
        let i = 0;
        this.interval = setInterval(() => {
            process.stdout.write(`\r${this.frame[i++ % this.frame.length]} ${this.text}`);
        }, 100);
    }

    public stop() {
        clearInterval(this.interval);
        process.stdout.write(`\r`);
    }

    public setText(text: string) {
        this.text = text;
    }
}