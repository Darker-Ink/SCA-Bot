const chalk = require("chalk");
const path = require("node:path");
const fs = require("node:fs");


/**
 * @param {import('discord.js').Client} client 
 */
const eventLoader = (client) => {
    const eventsFolder = path.join(__dirname, "..", "events");
    const events = fs.readdirSync(eventsFolder).filter(file => file.endsWith(".js"));

    for (const event of events) {
        const eventFile = require(`${eventsFolder}/${event}`);
        client.on(eventFile.event, (...args) => eventFile.run(client, ...args));
        console.log(`${chalk.green("Loaded")} ${chalk.cyan("Event")} ${chalk.blue(eventFile.event)}`);
    }
}

module.exports = eventLoader;