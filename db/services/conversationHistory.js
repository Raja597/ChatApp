var mongoConnector = require('./connector.js');
var connector = new mongoConnector();
var collectionName = 'chatHistory';

function chatHistoryAPI() {

}

chatHistoryAPI.prototype.getUserMessages = function (userId) {
    var matchCnd = { _id: userId };
    return connector.find(collectionName, matchCnd);
}
chatHistoryAPI.prototype.insertMessages = function(userId,userMessage,botMessage,userId){
    var data = {
        _id: "u-"+userId,
        userId: userId,
        userMessage: userMessage,
        botMessage: botMessage,
        createdOn: new Date()
    }
    return connector.insertOne(collectionName,data)
}