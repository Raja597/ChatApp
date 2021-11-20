var config = require('./config/api-config.json');
const ChatAPI = require('./tasks/chat');
console.log('staring')
var chatapi = new ChatAPI(config);
chatapi.sendRequest();
console.log("ending")
