import {CustomClient} from "../../class/CustomClient";
import {blueBright, redBright} from "cli-color";
import * as fs from "node:fs";
import {Command, SubCommand} from "../../interface/command";
import Loader from "../../class/logger/Loader";
import {AsciiTree} from "oo-ascii-tree";

export default async function loadCommand(client: CustomClient, loader: Loader, tree: AsciiTree): Promise<void> {
    return await new Promise<void>(async (resolve) => {
        let dirs = fs.readdirSync("./interactions/commands/");
        if (dirs.length === 0) return resolve();
        dirs = dirs.filter((file) => !file.includes("."));
        dirs.push("../commands");
        const cathTree: [AsciiTree] = [new AsciiTree("Commands")];
        for (const dir of dirs) {
            const files = fs.readdirSync(`./interactions/commands/${dir}/`).filter((file) => file.endsWith(".ts"));
            if (files.length === 0) continue;
            const commandTree: [AsciiTree] = [new AsciiTree(dir)];
            for (const file of files) {
                const commande: Command = await import(`../../interactions/commands/${dir}/${file}`).then((e) => e.default);
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
                        loader.setText(`Loading of ${commande.name} groupe`);
                        const cmdGroupe = fs.readdirSync(`interactions/commands/${dir}/`).filter((file) => file.endsWith(".ts"));
                        const subCommandTree: [AsciiTree] = [new AsciiTree(commande.name)];
                        for (const subCommandeFile of cmdGroupe) {
                            let subCommande: SubCommand = await import(`../../interactions/commands/${dir}/${subCommandeFile}`).then((e) => e.default);
                            if (subCommande) {
                                if (subCommande.name === commande.name || !subCommande.subCommande) continue;
                                if (!verifCmdParam(subCommande, dir, subCommandeFile)) continue;
                                subCommande.type = 1;
                                commande.options.push(subCommande);
                                loader.setText(`Loading of ${commande.name} ${subCommande.name}`);
                                subCommandTree.push(new AsciiTree(subCommande.name));
                            }
                        }
                        commandTree.push(new AsciiTree(blueBright.bgBlue(commande.name), ...subCommandTree.slice(1)));
                    } else {
                        commandTree.push(new AsciiTree(blueBright(commande.name)));
                        commande.isCommandeGroupe = false;
                        loader.setText(`Loading of ${commande.name}`);
                    }
                    // @ts-ignore
                    client.commands.set(commande.name, commande);
                }
            }
            if (commandTree.length > 1) {
                cathTree.push(new AsciiTree(blueBright.underline(dir === "../commands" ? "sans catégorie" : dir), ...commandTree.slice(1)));
            }
        }
        if (cathTree.length > 1) {
            tree.add(new AsciiTree(blueBright.underline.italic("Commands"), ...cathTree.slice(1)));
        }
        return resolve();
    });
}

function verifCmdParam(commande: Command | SubCommand, dir: string, file: string): boolean {
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