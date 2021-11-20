const {MongoClient} = require('mongodb');
const _ = require('lodash');
const Promise = require('bluebird');
const dbConfig = require('../config/config.json');
const {dbName,password} = dbConfig;
var uri = dbConfig.monogUrl.replace('password',password).replace('dbName',dbName);
function mongoConnector(){
     this.client = new MongoClient(uri);
}
mongoConnector.prototype.connectToDB = function(){
    var client = this.client;
    return client.connect();
}

mongoConnector.prototype.createCollection = function(collectionName){
    var self = this;
    var client = self.client;
    return self.connectToDB().then(function(){
        return client.db().createCollection(collectionName);
    }).then(function(){
        console.log("created collection: ", collectionName);
        return client.close();
    })
}

mongoConnector.prototype.insert = function(collectionName,data,matchCnd){
    var self = this;
    var client = self.client;
    var updateSet = {$set:data};
    return self.connectToDB().then(function(){
        return client.db().collection(collectionName).findOneAndUpdate(matchCnd,updateSet);
    }).then(function(){
        console.log('inserted data');
        return client.close();
    })

}

module.exports = mongoConnector;
