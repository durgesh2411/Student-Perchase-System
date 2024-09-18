const Mongoose = require('mongoose');

const Connection = require('../database/transaction');

const storeSchema = new Mongoose.Schema({
    product : {type : "String", required : true},
    totalCost : {type : "Number", required : true},
    cost : {type : []}
});

const stores = Connection.storeConnection.model('stores', storeSchema);
module.exports = stores;