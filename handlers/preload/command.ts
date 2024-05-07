import {CustomClient} from "../../class/CustomClient";
import {redBright, yellow} from "cli-color";
import * as fs from "node:fs";
import {Command} from "../../interface/command";

export default async (client: CustomClient) => {
    return new Promise<void>(async (resolve) => {
        let dirs = fs.readdirSync("./interactions/commands/");
        if (dirs.length === 0) return;
        console.log(yellow.underline("Commands loaded:"));
        dirs = dirs.filter((file) => !file.includes("."));
        dirs.push("../commands");
        for (const dir of dirs) {
            const files = fs.readdirSync(`./interactions/commands/${dir}/`).filter((file) => file.endsWith(".ts"));
            if (files.length === 0) continue;
            console.log(yellow.bold(`> ${dir === "../commands" ? "without category" : dir}`));
            for (const file of files) {
                const commande: Command = await import(`../../interactions/buttons/${dir}/${file}`).then((e) => e.default);
                if (commande && !commande.subCommande) {
                    if (!verifCmdParam(commande, dir, file)) continue;
                    if (commande.cooldown) {
                        commande.cooldown *= 1000;
                        if (commande.cooldown > 2147483646) commande.cooldown = 2147483646; // Max cooldown
                    }

                    if (!commande.devOnly) commande.devOnly = false;
                    if (!commande.mp) commande.mp = false;


                    if (commande.category === "") commande.category = "sans_categorie";
                    if (!commande.commandeGroupe) commande.category = dir === "../commands" ? "sans_categorie" : dir.toLowerCase();

                    if (!commande.userPermissions) commande.userPermissions = [];
                    if (!commande.botPermissions) commande.botPermissions = [];
                    commande.userPermissions.push("SendMessages");
                    commande.botPermissions.push("SendMessages");


                    if (commande.commandeGroupe && dir !== "../commands") {
                        commande.isCommandeGroupe = true;
                        commande.options = [];
                        console.log(yellow(`(${commande.category})`));
                        const cmdGroupe = fs.readdirSync(`./interactions/commands/${dir}/`).filter((file) => file.endsWith(".js"));
                        for (const subCommandeFile of cmdGroupe) {
                            let subCommande = require(`../../interactions/commands/${dir}/${subCommandeFile}`);
                            if (subCommande) {
                                if (subCommande.name === commande.name || !subCommande.subCommande) continue;
                                if (!verifCmdParam(subCommande, dir, subCommandeFile)) continue;
                                subCommande.type = 1;
                                commande.options.push(subCommande);
                                console.log(yellow(`  > ${commande.name} ${subCommande.name}`));
                            }
                        }
                    } else {
                        commande.isCommandeGroupe = false;
                        console.log(yellow(`  > ${commande.name}`));
                    }
                    // @ts-ignore
                    client.commands.set(commande.name, commande);
                }
            }
        }
        return resolve();
    });
}

function verifCmdParam(commande: Command, dir: string, file: string): boolean {
    if (commande.name === undefined || commande.name.length === 0) {
        console.log(redBright.bold(`>> La commande dans commandes/${dir === "../commands" ? "" : dir + "/"}${file} n'a pas de name !`));
        return false;
    }
    if (commande.description === undefined || commande.description.length === 0) {
        console.log(redBright.bold(`>> La commande dans commandes/${dir === "../commands" ? "" : dir + "/"}${file} n'a pas de description !`));
        return false;
    }
    //verification de la taille des name et description
    if (commande.name.length > 32) {
        console.log(redBright.bold(`>> La commande dans commandes/${dir === "../commands" ? "" : dir + "/"}${file} a un nom de plus de 32 caractères (${commande.name.length}/32) !`));
        return false;
    }
    if (commande.description.length > 100) {
        console.log(redBright.bold(`>> La commande dans commandes/${dir === "../commands" ? "" : dir + "/"}${file} a une description de plus de 100 caractères (${commande.description.length}/100) !`));
        return false;
    }
    return true;
}