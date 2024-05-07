import {CustomClient} from "../../class/CustomClient";
import {blue, blueBright, yellowBright} from "cli-color";
import * as fs from "node:fs";
import Loader from "../../class/logger/Loader";
import {AsciiTree} from "oo-ascii-tree";

export default async function loadEvent(client: CustomClient, loader: Loader, tree: AsciiTree): Promise<void> {
    return await new Promise<void>(async (resolve) => {
        const dirTree: [AsciiTree] = [new AsciiTree("Events")];
        for (const dirs of fs.readdirSync("./events/")) {
            const files = fs.readdirSync(`./events/${dirs}/`).filter((file) => file.endsWith(".ts"));
            const eventTree: [AsciiTree] = [new AsciiTree(dirs)];
            for (const evt of files) {
                await import(`../../events/${dirs}/${evt}`).then((e) => {
                    e.default(client);
                    eventTree.push(new AsciiTree(yellowBright(evt)));
                });
            }
            dirTree.push(new AsciiTree(yellowBright.underline(dirs), ...eventTree.slice(1)));
        }
        tree.add(new AsciiTree(yellowBright.underline.italic("Events"), ...dirTree.slice(1)));

        resolve();
    });
}