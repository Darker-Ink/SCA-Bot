const { Client, Collection, GatewayIntentBits } = require("discord.js");
const config = require("../config.json");
const Cache = require("./utils/Cache");
const commandLoader = require("./utils/commandLoader");
const eventLoader = require("./utils/eventLoader");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    allowedMentions: {
        parse: ["users"],
    },
})

client.commands = new Collection();
client.cache = new Cache(config.redis.host, config.redis.port, config.redis.username, config.redis.password, 0)
client.parsed = null;


commandLoader(client);
eventLoader(client);

process.on("unhandledRejection", err => {
    console.error("Unhandled promise rejection", err);
})

process.on("uncaughtException", err => {
    console.error("Uncaught exception", err);
})

client.login(config.bot.token);