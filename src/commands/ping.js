const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Get the bot's ping",
    usage: "ping",
    example: "ping",
    requiredPermissions: [],
    checks: [],
    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        const embed = new EmbedBuilder()
            .setTitle(`${client.user.username}'s Ping`)
            .setDescription(`API Latency: ${client.ws.ping}ms`)
            .setColor(Colors.Blue)
            .setTimestamp()

        message.reply({ embeds: [embed] });
    },
}