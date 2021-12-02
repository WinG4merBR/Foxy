const Canvas = require("canvas");

module.exports = class GenerateImage {
    constructor(client, user, data, width, height) {
        this.client = client;
        this.user = user;
        this.data = data;
        this.width = width;
        this.height = height;
    }

    async renderProfile() {
        var userAboutme = this.data.aboutme;
        if (!userAboutme) userAboutme = "Foxy é minha amiga (você pode alterar isso usando /aboutme)!";

        if (userAboutme.length > 85) {
            const aboutme = userAboutme.match(/.{1,95}/g);
            userAboutme = aboutme.join("\n");
        }

        const canvas = Canvas.createCanvas(this.width, this.height);
        const ctx = canvas.getContext("2d");
        const background = await Canvas.loadImage(`https://cdn.foxywebsite.ml/backgrounds/${this.data.background}`);

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.font = '70px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${this.user.username}`, canvas.width / 6.0, canvas.height / 9.5)

        ctx.font = '40px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`Reps: ${this.data.repCount} \nFoxCoins: ${this.data.balance}`, canvas.width / 1.5, canvas.height / 7.0);

        if (this.data.marriedWith) {
            const discordProfile = await this.client.users.fetch(this.data.marriedWith);
            ctx.font = '30px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`💍 Casado com: ${discordProfile.tag}`, canvas.width / 6.0, canvas.height / 6.0);
        }

        if (this.data.premium) {
            ctx.font = '30px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`🔑 Premium`, canvas.width / 6.0, canvas.height / 4.5);
        }

        ctx.font = ('30px sans-serif');
        ctx.fillStyle = '#ffffff';
        ctx.fillText(userAboutme, canvas.width / 55.0, canvas.height / 1.2);

        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(this.user.displayAvatarURL({ format: 'png' }));
        ctx.drawImage(avatar, 25, 25, 200, 200);

        const attachment = canvas.toBuffer();
        return attachment;
    }
}