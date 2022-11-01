const config = require('../../../config.json');
const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
    name: "minecraft",
    description: "Removes a minecraft username from the group",
    usage: "remove minecraft <username>",
    example: "remove minecraft DarkerInk",
    requiredPermissions: [],
    checks: [{
        check: (message, args) => args.length > 0,
        error: "You need to provide a username to remove."
    }],
    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {

        const username = args[0];

        const userData = client.parsed.find(d => d.username === username);

        console.log(userData);

        if (!userData) {
            const embed = new EmbedBuilder()
                .setTitle(`User Not Found!`)
                .setDescription(`This user is not in the group.`)
                .setColor(Colors.Red)
                .setTimestamp()
                .setFooter({
                    text: 'be careful..'
                })

            message.reply({ embeds: [embed] });
        } else {
            const usrChannel = client.channels.cache.get(config.discord.username);

            client.parsed = client.parsed.filter(d => d.authorId !== userData.authorId);

            await client.cache.delete('data', userData.messageId)

            const msg = await usrChannel.messages.fetch(userData.messageId);

            await msg.delete();
        }

    },
}