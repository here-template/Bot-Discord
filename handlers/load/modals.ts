import {CustomClient} from "../../class/CustomClient";
import path from "node:path";
import fs from "node:fs";

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient): Promise<void> => {
    return await new Promise<void>(async (resolve) => {
        const basePath = path.join("interactions", "modals");
        for (const file of fs.readdirSync(basePath).filter(f => f.endsWith(".ts"))) {
            const modal = (await import(path.join(__dirname, "..", "..", basePath, file))).default;
            if (!modal.customID) {
                console.log(`The modal ${file} has no customID`);
                continue;
            }

            client.modals?.set(modal.customID, modal);
        }
        resolve();
    });
}