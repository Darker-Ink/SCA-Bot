const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
    name: "minecraft",
    description: "Finds out if a minecraft username is in the group or not",
    usage: "check minecraft <username>",
    example: "check minecraft DarkerInk",
    requiredPermissions: [],
    checks: [{
        check: (message, args) => args.length > 0,
        error: "You need to provide a username to check."
    }],
    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {

        const username = args[0];

        const userData = client.parsed.find(d => d.username === username);

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
            const embed = new EmbedBuilder()
                .setTitle(`User Found!`)
                .setDescription(`This user is in the group.\n\nTheir Discord is <@${userData.authorId}>`)
                .setColor(Colors.Green)
                .setTimestamp()

            message.reply({ embeds: [embed] });
        }

    },
}