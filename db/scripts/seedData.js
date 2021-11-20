var {ObjectId} = require('mongodb');

var _id= ObjectId('61992bb07c8a3d59861324c2');
var data = {
    'Adjectives':{
        '1':'Helpful',
        '2':'Friendly',
        '3':'Sarcastic',
        '4':'Funny',
        '5':'Intelligent'
    }
}
var mongoConnector = require('../services/connector.js');
var connector = new mongoConnector();

function main(){
   return connector.insert('seedData2',data,{_id:ObjectId('61992bb07c8a3d59861324c2')});
}
main();
