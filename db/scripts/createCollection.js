var mongoConnector = require('../services/connector.js');
var connector = new mongoConnector();

function main(){
   return connector.createCollection('seedData2');
}
main();