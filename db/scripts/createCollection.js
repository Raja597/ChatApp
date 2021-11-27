var mongoConnector = require('../services/connector.js');
var connector = new mongoConnector();
var Promise = require('bluebird');
var collections = [
   'seedData',
   'chatHistory'
]
function main(){
   var promises = [];
   collections.forEach(function(collectionName){
      promises.push(connector.createCollection(collectionName));
   })
   return Promise.all(promises,function(p1,p2){
      console.log('created new collections')
      return;
   })
}
main();