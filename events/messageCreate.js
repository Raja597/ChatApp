const config = require('../config/bot.json');
const prefix = config.prefix;
const _ = require('lodash');
const users = {};
const Adjectives = {
    '1':'Helpful',
    '2':'Friendly',
    '3':'Sarcastic',
    '4':'Funny'
};
function help(message) {
    message.channel.send('Sure, what do want the help with?');
}
function defaultFunc(message) {
    message.channel.send('Invalid Command!');
}
function addChoices(startMessage){
    var keys = Object.keys(Adjectives);
    console.log("🚀 ~ file: messageCreate.js ~ line 18 ~ addChoices ~ keys", keys)
    keys.forEach(function(k){
        console.log("🚀 ~ file: messageCreate.js ~ line 18 ~ addChoices ~ k", k)
        startMessage = startMessage+'\n' + k +'. '+ Adjectives[k];
    })
    return startMessage;
}
function start(message) {
    users[message.author] = { 'checkChoice': true };
    var startMessage = 'Sure, Please select the Adjective to describe your bot personality ';
    startMessage = addChoices(startMessage)
    console.log("🚀 ~ file: messageCreate.js ~ line 25 ~ start ~ startMessage", startMessage)
    message.channel.send(startMessage);
}
function chooseAdjectives(message){
    var choices = message.content.split(',');
    if(!choices){
        return;
    }
    var userChoices = _.intersection(choices,Object.keys(Adjectives))
    userChoices.forEach(function(userChoices){
       
    })

}
var functions = {
    'help': help,
    'default': defaultFunc,
    'start': start
}
module.exports = {
    name: 'messageCreate',
    async execute(client, message) {
        var self = this;
        self.client = client;
        console.log("🚀 ~ file: messageCreate.js ~ line 6 ~ execute ~ message.author", message.author);
        if (users[message.author] && users[message.author].checkChoice) {
            chooseAdjectives(message);
        }
        if (!message.content.startsWith(prefix) || message.author.bot) return
        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
        console.log("🚀 ~ file: messageCreate.js ~ line 12 ~ execute ~ command", command)
        if (functions[command]) {
            return functions[command](message);
        } else {
            return functions['default'](message);
        }
    },
};