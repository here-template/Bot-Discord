import {CustomClient} from '../../class/CustomClient';
import {Command, SubCommand, SubCommandRun} from '../../interface/command';
import {CommandInteraction, Interaction} from 'discord.js';
import fs from 'fs';
import path from 'path';

let cooldown: Array<{ commandName: string, time: Date }>;

// @ts-ignore
export default async (client: CustomClient, interaction: CommandInteraction | any): any => {
    if (!client.config) return interaction.reply({content: 'Le bot n\'est pas encore prêt !', ephemeral: true});
    if (interaction.isContextMenuCommand()) return import(path.join(__dirname, 'context')).then((mod) => mod.default(client, interaction));

    const cmd: Command | SubCommand = client.commands?.get(interaction.commandName) as Command | SubCommand;
    if (!cmd) {
        if (!client.config.config.checkCommandExists) return;
        return interaction.reply({
            content: 'Cette commande ne semble pas exister !',
            ephemeral: true
        });
    }

    if (cmd.data.devOnly && !client.config.dev.includes(interaction.user.id)) return interaction.reply({
        content: 'Cette commande est réservé au développeur !',
        ephemeral: true
    });

    if (client.config.adminCategory.includes(cmd.data.category as string) && !client.config.admin.includes(interaction.user.id)) return interaction.reply({
        content: 'Vous n\'avez pas la permission d\'utiliser cette commande !',
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
    const subCmd: SubCommandRun = client.subCommands.get(`${cmd.command.name}:${subCmdName}`) as SubCommandRun;


    if (!subCmd) {
        if (!fs.existsSync(path.join('interactions', 'commands', cmd.data.category as string, interaction.commandName))) fs.mkdirSync(path.join('interactions', 'commands', cmd.data.category as string, interaction.commandName), {recursive: true});
        fs.copyFileSync(path.join('template', 'subCommand.temp'), path.join('interactions', 'commands', cmd.data.category as string, interaction.commandName, `${subCmdName}.ts`), fs.constants.COPYFILE_EXCL);
        return interaction.reply({
            content: `Cette subCommand n'existe pas, je viens de la créer pour vous ! (${subCmdName})\nVeuillez la compléter avant de l'utiliser !`,
            ephemeral: true
        })
    }

    return subCmd.run(client, interaction);
}

function isSubCommand(cmd: Command | SubCommand): cmd is SubCommand {
    return (cmd as SubCommand).data.subCommand;
}