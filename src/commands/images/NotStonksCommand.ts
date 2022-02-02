import Command from '../../structures/BaseCommand';
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageAttachment } from 'discord.js';
import * as Canvas from 'canvas';

export default class NotStonks extends Command {
    constructor(client) {
        super(client, {
            name: "notstonks",
            description: "Get a not stonks image",
            category: "image",
            dev: false,
            data: new SlashCommandBuilder()
                .setName("notstonks")
                .setDescription("[🖼 Image] Get a not stonks image")
                .addStringOption(option => option.setName("text").setDescription("The text").setRequired(true))
        });
    }

    async execute(interaction, t) {
        const string = interaction.options.getString("text");
        const canvas = Canvas.createCanvas(800, 600);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage('https://foxywebsite.xyz/api/memes/notstonks.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.font = '40px sans-serif';
        ctx.fillStyle = '#000000';
        ctx.fillText(`${string}`, canvas.width / 13.1, canvas.height / 14.1);

        ctx.beginPath();
        ctx.arc(125, 125, 100, 6, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const attachment = new MessageAttachment(canvas.toBuffer(), 'notstonks.png');

        await interaction.editReply({ files: [attachment] });
    }
}