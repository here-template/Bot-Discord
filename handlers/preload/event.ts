import {CustomClient} from "../../class/CustomClient";
import {blue} from "cli-color";
import * as fs from "node:fs";

export default async (client: CustomClient) => {
    console.log(blue.underline("Events loaded:"));
    for (const dirs of fs.readdirSync("./events/")) {
        const files = fs.readdirSync(`./events/${dirs}/`).filter((file) => file.endsWith(".ts"));
        for (const evt of files) {
            await import(`../../events/${dirs}/${evt}`).then((e) => {
                e.default(client);
                console.log(blue(`  > ${evt}`));
            });
        }
    }
}