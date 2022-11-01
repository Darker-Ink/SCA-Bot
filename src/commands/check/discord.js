const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
    name: "discord",
    description: "Finds out if a discord id is in the group or not",
    usage: "check discord <discordid>",
    example: "check discord 379781622704111626",
    requiredPermissions: [],
    checks: [{
        check: (message, args) => args.length > 0,
        error: "You need to provide a id to check."
    }],
    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {

        const id = args[0];

        const userData = client.parsed.filter(d => d.authorId === id);

        if (userData.length === 0) {
            const embed = new EmbedBuilder()
                .setTitle(`User Not Found...`)
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
                .setDescription(`This user is in the group.\n\nTheir Minecraft usernames are:\n\n${userData.map(d => d.username).join(", ")}`)
                .setColor(Colors.Green)
                .setTimestamp()

            message.reply({ embeds: [embed] });
        }

    },
}