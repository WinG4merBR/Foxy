import Command from "../../structures/command/BaseCommand";
import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

export default class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            description: "Use this command to get help",
            category: "utils",
            dev: false,
            data: new SlashCommandBuilder()
                .setName("help")
                .setDescription("[Utils] Use this command to get help")
                .addSubcommand(command => command.setName("commands").setDescription("[Utils] List all commands"))
                .addSubcommand(command => command.setName("bot").setDescription("[Utils] List bot information"))
        });
    }

    async execute(interaction, t): Promise<void> {
        const subcommand = interaction.options.getSubcommand();

        switch (subcommand) {
            case "commands": {
                const embed = new MessageEmbed()
                    .setTitle(t("commands:help.commands.title"))
                    .addFields(
                        { name: `<:foxydaily:915736630495686696> ${t('commands:help.commands.category.economy')} (${this.getSize("economy")})`, value: this.getCategory("economy"), inline: true },
                        { name: `<:DiscordStaff:731947814246154240> ${t('commands:help.commands.category.social')} (${this.getSize("social")})`, value: this.getCategory("social"), inline: true },
                        { name: `<:DiscordBoost:723225840548184195> ${t('commands:help.commands.category.rp')} (${this.getSize("actions")})`, value: this.getCategory("actions"), inline: true },
                        { name: `<a:a_bongocat:768500700551315487> ${t('commands:help.commands.category.image')} (${this.getSize("image")})`, value: this.getCategory("image"), inline: true },
                        { name: `:robot: | ${t('commands:help.commands.category.misc')} (${this.getSize("misc")})`, value: this.getCategory("misc"), inline: true },
                        { name: `<:cute_yay:901111399328124928> ${t('commands:help.commands.category.fun')} (${this.getSize("fun")})`, value: this.getCategory("fun"), inline: true },
                        { name: `<:DiscordStaff:731947814246154240> ${t('commands:help.commands.category.utils')} (${this.getSize("utils")})`, value: this.getCategory("utils"), inline: true },
                    )

                await interaction.reply({ embeds: [embed] });
                break;
            }

            case "bot": {
                const embed = new MessageEmbed()
                    .setColor('#7289da')
                    .setTitle(t('commands:help.bot.title'))
                    .setDescription(t('commands:help.bot.description', { user: interaction.user.username }))
                    .setThumbnail(this.client.user.displayAvatarURL({ dynamic: true, size: 2048, format: 'png' }))
                    .addField(t('commands:help.bot.fields.list.title'), t('commands:help.bot.fields.list.value'))
                    .addField(t('commands:help.bot.fields.guild'), 'https://discord.gg/W6XtYyqKkg')
                    .addField(t('commands:help.bot.fields.privacy'), 'https://foxywebsite.xyz/privacy')
                    .addField(t('commands:help.bot.fields.website'), 'https://foxywebsite.xyz/');

                await interaction.reply({ embeds: [embed] });
            }
        }
    }

    getCategory(category) {
        return this.client.commands.filter(c => c.config.category === category).map(c => `\`${c.config.name}\``).join(", ");
    }

    getSize(category) {
        return this.client.commands.filter(c => c.config.category === category).size;
    }
}