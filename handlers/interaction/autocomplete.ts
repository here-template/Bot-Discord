import {CustomClient} from "../../class/CustomClient";
import {AutocompleteInteraction} from "discord.js";
import {Command, SubCommand, SubCommandRun} from "../../interface/command";
import path from "node:path";

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient, interaction: AutocompleteInteraction) => {
    if (!client.config) return interaction.respond([{name: "Le client n'est pas pret", value: "Erreur client"}])

    const cmd: Command | SubCommand = client.commands?.get(interaction.commandName) as Command | SubCommand;
    if (!cmd) return interaction.respond([{name: "Commande introuvable", value: "Erreur"}]);

    if (!isSubCommand(cmd)) {
        if (typeof cmd.runAutocomplete !== "function") return interaction.respond([{name: "Autocomplete activé mais function manquante", value: "Erreur"}]);
        return cmd.runAutocomplete(client, interaction);
    }

    const subCmdName: string = interaction.options.getSubcommand();
    if (!subCmdName) return interaction.respond([{name: "Sous-commande introuvable", value: "Erreur"}]);
    const subCmd: SubCommandRun = client.subCommands.get(`${cmd.command.name}:${subCmdName}`) as SubCommandRun;
    if (!subCmd) return interaction.respond([{name: "Sous-commande introuvable", value: "Erreur"}]);

    if (typeof subCmd.runAutocomplete !== "function") {
        console.log(`>> La SubCommand ${cmd.data.category}/${subCmdName} n'as pas de fonction runAutocomplete !`);
        return interaction.respond([{name: "Sous-commande incorrecte", value: "Erreur"}])
    }

    return subCmd.runAutocomplete(client, interaction);


    // return import(path.join(__dirname, "..", "..", "interactions", "commands", cmd.data.category as string, interaction.commandName, `${subCmdName}.ts`)).then(mod => mod.default).then((mod: SubCommandRun) => {
    //     if (typeof mod.runAutocomplete !== "function") return interaction.respond([{name: "Autocomplete activé mais function manquante", value: "Erreur"}]);
    //     return mod.runAutocomplete(client, interaction);
    // });
}

function isSubCommand(cmd: Command | SubCommand): cmd is SubCommand {
    return (cmd as SubCommand).data.subCommand;
}