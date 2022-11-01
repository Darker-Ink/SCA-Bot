const config = require('../../../config.json');
const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
    name: "discord",
    description: "Removes a discord user from the group",
    usage: "remove discord <discordid>",
    example: "remove discord 379781622704111626",
    requiredPermissions: [],
    checks: [{
        check: (message, args) => args.length > 0,
        error: "You need to provide a id to remove."
    }],
    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {

        console.log('Discord')

        const id = args[0];

        const userData = client.parsed.filter(d => d.authorId === id);

        if (userData.length === 0) {
            const embed = new EmbedBuilder()
                .setTitle(`User Not Found...`)
                .setDescription(`There is no minecraft usernames linked to this discord id.`)
                .setColor(Colors.Red)
                .setTimestamp()
                .setFooter({
                    text: 'be careful..'
                })

            message.reply({ embeds: [embed] });
        } else {
            const usrChannel = client.channels.cache.get(config.discord.username);
            client.parsed = client.parsed.filter(d => d.authorId !== id);

            for (const dd of userData) {
                await client.cache.delete('data', dd.messageId)

                const msg = await usrChannel.messages.fetch(dd.messageId);

                await msg.delete();
            }

        }

    },
}