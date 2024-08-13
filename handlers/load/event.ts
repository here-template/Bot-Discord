import {CustomClient} from "../../class/CustomClient";
import * as fs from "node:fs";
import * as path from "node:path";

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient): Promise<void> => {
    return await new Promise<void>(async (resolve) => {
        for (const dirs of fs.readdirSync("./events/")) {
            const files = fs.readdirSync(`./events/${dirs}/`).filter((file) => file.endsWith(".ts"));
            for (const evt of files) {
                await import(path.join(__dirname, "..", "..", "events", dirs, evt)).then((mod) => mod.default(client));
            }
        }
        resolve();
    });
}