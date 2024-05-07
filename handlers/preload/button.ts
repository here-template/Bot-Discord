import {CustomClient} from "../../class/CustomClient";
import * as fs from "node:fs";
import {cyan, redBright} from "cli-color";
import {Buttons} from "../../interface/buttons";

const customIDList: string[] = [];

//Todo: Add a check for the customID
//Todo: Add tree print
export default async function loadButton(client: CustomClient) {
    return await new Promise<void>(async (resolve) => {
        let dirs = fs.readdirSync("./interactions/buttons");
        if (dirs.length === 0) return resolve();
        console.log(cyan.underline("Buttons loaded:"));
        dirs.filter((file) => ! file.includes("."));
        dirs.push("../buttons");
        for (const dir of dirs) {
            const files = fs.readdirSync(`./interactions/buttons/${dir}`).filter((file) => file.endsWith(".ts"));
            if (files.length === 0) continue;
            console.log(cyan.bold(`> ${dir === "../buttons" ? "without category" : dir}`));
            for (const file of files) {
                const button: Buttons = await import(`../../interactions/buttons/${dir}/${file}`).then((e) => e.default);
                if (button) {
                    if (button.customID === undefined) return console.log(redBright.bold(`>> The button ${file} has no customID !`));
                    if (customIDList.includes(button.customID)) return console.log(redBright.bold(`>> The customID ${button.customID} is already used !`));
                    customIDList.push(button.customID);

                    if (!button.admin) button.admin = false;
                    if (!button.userOnly) button.userOnly = false;

                    button.category = dir === "../buttons" ? "without category" : dir.toLowerCase();
                    console.log(cyan(`  > ${button.customID}`));
                    if (dir !== "../buttons") button.customID = `${dir.toLowerCase()}:${button.customID}`;
                    // @ts-ignore
                    client.buttons.set(button.customID, button);
                }
            }
        }
        resolve();
    })

}