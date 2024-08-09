import {
    AutocompleteInteraction,
    ButtonInteraction, ChannelSelectMenuInteraction,
    CommandInteraction,
    Events,
    ModalSubmitInteraction, RoleSelectMenuInteraction,
    StringSelectMenuInteraction, UserSelectMenuInteraction
} from "discord.js";
import {CustomClient} from "../../class/CustomClient";

const interactionTypes: Record<number, Function> = {
    1: async () => console.log("Interaction de type ping"),
    2: async (client: CustomClient, interaction: CommandInteraction) => (await import("../../handlers/interaction/command")).default(client, interaction),
    3: async (client: CustomClient, interaction: ButtonInteraction | StringSelectMenuInteraction | RoleSelectMenuInteraction | UserSelectMenuInteraction | ChannelSelectMenuInteraction) => (await import("../../handlers/interaction/button")).default(client, interaction),
    4: async (client: CustomClient, interaction: AutocompleteInteraction) => (await import("../../handlers/interaction/autocomplete")).default(client, interaction),
    5: async (client: CustomClient, interaction: ModalSubmitInteraction) => (await import("../../handlers/interaction/modals")).default(client, interaction),
};

// noinspection JSUnusedGlobalSymbols
export default async (client: CustomClient) => {
    client.on(Events.InteractionCreate, async (interaction) => {
        if (interaction.user.bot) return console.log(`Le bot ${interaction.user.username} a essayé de faire une interaction !`);
        if (client.config === undefined) return console.log("Le client n'a pas encore chargé la configuration !");

        await interactionTypes[interaction.type as number](client, interaction);

        // if (!inter[0]) return interaction.reply(inter[1] ?? {
        //     content: "Cette action ne semble pas exister !",
        //     ephemeral: true
        // });
        // if (!inter[0] && !interaction.isAutocomplete()) return interaction.reply(inter[1] ?? {
        //     content: "Cette action ne semble pas exister !",
        //     ephemeral: true
        // });
        // try {
        //     await inter[1](client, interaction);
        //     if (debug) console.log(`> ${Date.now() - interaction.createdTimestamp}ms`);
        // } catch (err) {
        // if (!err) return;
        // console.log(redBright.bold(`>> Erreur dans ${interaction.commandName ?? interaction.customId ?? "inconue"} :`));
        // console.log(err);
        // let cmdPing = "";
        // if (interaction.isChatInputCommand() && interaction.commandName != undefined) {
        //     cmdPing = ` (</${interaction.commandName}:${client.application.commands.cache.find((x) => x.name === interaction.command.name).id}>)`;
        //     if (interaction.options._subcommand ?? false) cmdPing = ` (</${interaction.command.name} ${interaction.options.getSubcommand()}:${client.application.commands.cache.find((x) => x.name === interaction.command.name).id}>)`;
        // }
        // if (debug) console.log(`> ${Date.now() - interaction.createdTimestamp}ms`);
        // if (Date.now() - interaction.createdTimestamp > 3000 && !interaction.deferred) console.log(redBright.bold(`/!\\ Cette interaction a mis plus de 3000ms (${Date.now() - interaction.createdTimestamp}ms)\nL'utilisation de "interaction.deferReply();" est conseiller.`));
        // if (interaction.responded || interaction.replied || interaction.deferred) return interaction.editReply({content: "Une erreur s'est produite !" + cmdPing});
        // return interaction?.reply({content: "Une erreur s'est produite !" + cmdPing, ephemeral: true});
    });
}