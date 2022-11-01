const config = require('../../config.json')
const chalk = require("chalk");
const Minecraft = require('../utils/Minecraft');

/**
 * @param {import('../utils/Cache')} cache
 * @param {import('discord.js').Message[][]} messages 
 */
const messageDataParser = async (cache, messages, c) => {

    const keys = await cache._redis.keys('data:*');
    const parsedData = [];

    for (const key of keys) {
        const data = await cache._redis.get(key);

        const parsed = JSON.parse(data);

        parsedData.push(parsed);
    }

    c.parsed = parsedData;


    for (const messageArray of messages) {
        for (const message of messageArray.values()) {
            if (message.author.bot) continue;

            const messageData = {
                messageId: String(message.id),
                authorId: message.author.id,
                username: message.content,
            }

            const data = parsedData.find(d => d.username === messageData.username);

            if (data) continue;
            
            const usrEx = await Minecraft.userExists(messageData.username);

            if (!usrEx.exists) {
                await message.delete();
                console.log(chalk.red(`Deleted message from ${messageData.username} as they don't exist.`));
            } else {
                await cache.set(`data:${messageData.messageId}`, JSON.stringify(messageData));
                console.log(chalk.green(`Added data for ${messageData.username}`));
            }

        }
    }
}


module.exports = {
    event: "ready",
    /**
     * @param {import('discord.js').Client} client 
     */
    run: async (client) => {
        console.log(`${chalk.green("Connected")} ${chalk.cyan("Bot")} ${chalk.blue(`${client.user.tag} Is Ready!`)}`);
        
        /**
         * @type {import('../utils/Cache')}
         */
        const cache = await client.cache.connect();
        console.log(`${chalk.green("Connected")} ${chalk.cyan("Redis")} ${chalk.blue("Cache Connected!")}`);

        const usrChannel = client.channels.cache.get(config.discord.username);

        if (!usrChannel) {
            console.warn(`${chalk.yellow("Warning")} ${chalk.cyan("Username")} ${chalk.blue("Channel Not Found!")}`);
        } else {

            const messages = [
                await usrChannel.messages.fetch({ limit: 100 }),
            ]

            while(messages[messages.length - 1].size === 100) {
                const lastMessage = messages[messages.length - 1].last();

                if (messages[messages.length - 1].size !== 100) break;
                if (!lastMessage) break;

                messages.push(await usrChannel.messages.fetch({ limit: 100, before: lastMessage.id }));
            }

            messageDataParser(cache, messages, client);
        }
    }
}
