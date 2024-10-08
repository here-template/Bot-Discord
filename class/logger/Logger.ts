export default class Logger {
    constructor() {
    }

    public log(message: string) {
        //if first line in console
        if (!process.stdout.isTTY) process.stdout.write('\n');
        process.stdout.write(`${message}`);
    }

    public clearLastLine() {
        process.stdout.write('\x1B[0G\x1B[2K');
    }

    public clearConsole() {
        process.stdout.write('\x1Bc');
    }
}