import {CustomClient} from "../../class/CustomClient";
import {Command, SubCommand} from "../../interface/command";
import {CommandInteraction} from "discord.js";
import * as fs from "node:fs";
import * as path from "node:path";

let cooldown: Array<{ commandName: string, time: Date }>

// @ts-ignore
export default async (client: CustomClient, interaction: CommandInteraction | any): any => {
    if (!client.config) return interaction.reply({content: "Le bot n'est pas encore prêt !", ephemeral: true});
    if (interaction.isContextMenuCommand()) return import(path.join(__dirname, "context")).then((mod) => mod.default(client, interaction));

    const cmd: Command | SubCommand = client.commands?.get(interaction.commandName) as Command | SubCommand;
    if (!cmd) {
        if (!client.config.config.checkCommandExists) return;
        return interaction.reply({
            content: "Cette commande ne semble pas exister !",
            ephemeral: true
        });
    }

    if (cmd.data.devOnly && !client.config.dev.includes(interaction.user.id)) return interaction.reply({
        content: "Cette commande est réservé au développeur !",
        ephemeral: true
    });
    if (cmd.data.category === "admin" && !client.config.owner.includes(interaction.user.id)) return interaction.reply({
        content: "Vous n'avez pas les permissions pour faire cette commande !",
        ephemeral: true
    });
    if (cmd.data.cooldown && !cmd.data.devOnly) {
        cooldown = cooldown.filter(c => c.time > new Date());
        if (cooldown.find(c => c.commandName === cmd.command.name && c.time > new Date())) {
            const t = Math.floor((cooldown.find(c => c.commandName === cmd.command.name)?.time.getTime() || 0) / 1000);
            return interaction.reply({content: `Cette commande à un cooldown, il reste <t:${t}:R> !`, ephemeral: true});
        }
        cooldown.push({commandName: cmd.command.name, time: new Date(Date.now() + cmd.data.cooldown)});
    }

    if (!isSubCommand(cmd)) return cmd.run(client, interaction);

    const subCmdName: string = interaction.options.getSubcommand();
    if (!subCmdName) return interaction.reply({content: "Cette commande ne semble pas exister !", ephemeral: true});

    const pathToSubCmd: string = path.join("interactions", "commands", cmd.data.category as string, interaction.commandName, `${subCmdName}.ts`);
    if (!fs.existsSync(pathToSubCmd)) return interaction.reply({
        content: `Cette commande existe mais n'as pas de code attaché, vérifiez que le fichier \`${pathToSubCmd}\` existe !`,
        ephemeral: true
    });

    return import(path.join("..", "..", pathToSubCmd)).then((mod) => mod.run(client, interaction));
}

function isSubCommand(cmd: Command | SubCommand): cmd is SubCommand {
    return (cmd as SubCommand).data.subCommand;
}