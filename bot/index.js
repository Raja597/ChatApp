// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('../config/bot.json');
const fs = require('fs');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.DIRECT_MESSAGES,Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_VOICE_STATES] });
const eventFiles = fs.readdirSync('../events').filter(file => file.endsWith('.js'));

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});
for (const file of eventFiles) {
	const event = require(`../events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(client,...args));
	}
}
// Login to Discord with your client's token
client.login(token);