const { MessageEmbed } = require("discord.js");

module.exports = class InteractionCreate {
    constructor(client) {
        this.client = client;
    }

    async run(interaction) {
        if (!interaction.isCommand()) return;
        const command = this.client.commands.get(interaction.commandName);

        function FoxyHandler() {
            if (command.config.dev && !this.client.config.devs.includes(interaction.user.id)) return interaction.reply(`<:Error:718944903886930013> | ${interaction.author} Você não tem permissão para fazer isso! <:meow_thumbsup:768292477555572736>`);

            new Promise((res, rej) => {
                try {
                    command.execute(interaction)
                } catch(e) {
                    const errorEmbed = new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Erro ao executar comando!")
                    .setDescription(`\ \ \`\`\`js\n${e}\n\`\`\``)
                    interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                }
            })
        }

        try {
            const document = await this.client.database.getDocument(interaction.user.id);

            if (document.isBanned) {
                const bannedEmbed = new MessageEmbed()
                    .setTitle('Você foi banido(a) :DiscordBan:')
                    .setColor("RED")
                    .setDescription('Você foi banido(a) de usar a Foxy em qualquer servidor no Discord! \n Caso seu ban foi injusto (o que eu acho muito difícil) você pode solicitar seu unban no meu [servidor de suporte](https://gg/kFZzmpD) \n **Leia os termos em** [Termos de uso](https://foxywebsite.ml/tos.html)')
                    .addFields(
                        { name: "Motivo do Ban:", value: document.banReason, inline: true }
                    )
                return interaction.reply({ embeds: [bannedEmbed] });
            }

            FoxyHandler();
        } catch (err) {
            return interaction.reply({ content: `Ocorreu um erro ao executar esse comando! Erro: ${err}`, ephemeral: true });
        }
    }
}