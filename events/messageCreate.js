const config = require('../config/bot.json');
const prefix = config.prefix;
const ChatAPI = require('../tasks/chat/index.js');
var chatconfig = require('../config/api-config.json');
var chatapi = new ChatAPI(chatconfig);
const _ = require('lodash');
const users = {};
const Adjectives = {
    '1': 'Helpful',
    '2': 'Friendly',
    '3': 'Sarcastic',
    '4': 'Funny'
};
function help(message) {
    message.channel.send('Sure, what do want the help with?');
}
function defaultFunc(message) {
    message.channel.send('Invalid Command!');
}
function addChoices(startMessage) {
    var keys = Object.keys(Adjectives);
    console.log("🚀 ~ file: messageCreate.js ~ line 18 ~ addChoices ~ keys", keys)
    keys.forEach(function (k) {
        console.log("🚀 ~ file: messageCreate.js ~ line 18 ~ addChoices ~ k", k)
        startMessage = startMessage + '\n' + k + '. ' + Adjectives[k];
    })
    startMessage = startMessage + '\n Please Enter the choices seperated by ,\n Ex:2,3,4'
    return startMessage;
}
function sendUserMessage(message) {
    console.log("🚀 ~ file: messageCreate.js ~ line 30 ~ sendUserMessage ~ message", message.content)
    var msgArray = users[message.author]['chatHistory']?users[message.author]['chatHistory']:[];
    msgArray.push('user: '+message.content);
    var botDescription = users[message.author].botDescription;
    return chatapi.sendRequest(msgArray, botDescription).then(function(botResponse){
        console.log("🚀 ~ file: messageCreate.js ~ line 36 ~ returnchatapi.sendRequest ~ botResponse", botResponse)
        msgArray.push('AI: '+botResponse);
        users[message.author]['chatHistory'] = msgArray;
        return message.channel.send(botResponse);
    })
}
function start(message) {
    users[message.author] = { 'checkChoice': true };// first time add user to users
    var startMessage = 'Sure, Please select the Adjective to describe your bot personality ';
    startMessage = addChoices(startMessage)
    console.log("🚀 ~ file: messageCreate.js ~ line 25 ~ start ~ startMessage", startMessage)
    message.channel.send(startMessage);
}
function stop(message){
    delete users[message.author];
    return message.channel.send('Stopped the assitant. To start again use !start');
}
function chooseAdjectives(message) {
    var choices = message.content.split(',');
    var botDescription = 'The following is a conversation with an AI assistant. The assistant is '
    if (!choices) {
        return;
    }
    var userChoices = _.intersection(choices, Object.keys(Adjectives))
    var len = userChoices.length;
    userChoices.forEach(function (userChoice, index) {
        var adj = Adjectives[userChoice];
        if (index < (len - 1))
            botDescription += adj + ", ";
        else
            botDescription += adj + ".";
    });
    //second , adding assitant description to users
    users[message.author] = { 'checkChoice': false, 'session': true, 'botDescription': botDescription };
    return message.channel.send('Your Assitant is ready to chat.'+botDescription);
}
var functions = {
    // functions for each command
    'help': help,
    'default': defaultFunc,
    'start': start,
    'stop': stop
}
module.exports = {
    name: 'messageCreate',
    async execute(client, message) {
        var self = this;
        self.client = client;
        console.log("🚀 ~ file: messageCreate.js ~ line 6 ~ execute ~ message.author", message.author);
        console.log("🚀 ~ file: messageCreate.js ~ line 77 ~ execute ~ users[message.author]", users[message.author])
        if (users[message.author] && users[message.author].checkChoice) {
            return chooseAdjectives(message);
        }
        if (users[message.author] && users[message.author].session === true) {
            if(message.content === 'stop'){
                return stop(message);
            }
            return sendUserMessage(message);
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