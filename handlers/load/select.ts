import {CustomClient} from "../../class/CustomClient";
import path from "node:path";
import fs from "node:fs";
import { Select } from "../../interface/select";

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient): Promise<void> => {
    return await new Promise<void>(async (resolve) => {
        const basePath = path.join("interactions", "selects");
        for (const type of fs.readdirSync(basePath)) {
            for (const file of fs.readdirSync(path.join(__dirname, "..", "..", basePath, type)).filter(f => f.endsWith(".ts"))) {
                const select: Select = require(path.join(__dirname, "..", "..", basePath, type, file)).default;
                if (!select.customID) {
                    console.log(`The select ${type+"/"+file} has no customID`);
                    continue;
                }

                client.selects?.set(type+":"+select.customID, select);
            }
        }

        resolve();
    });
}