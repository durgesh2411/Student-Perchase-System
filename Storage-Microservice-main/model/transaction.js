const Mongoose = require('mongoose');

const Connection = require('../database/transaction');

const storeSchema = new Mongoose.Schema({
    transactionID : {type : String, required : true},
    transactionType : {type : "String", required : true},
    amount : {type : Number, required : true},
    from : {type : "String", required : true},
    to : {type : "String", required : true},
    time : {type : "Date", required : true}
});

const stores = Connection.historyConnection.model('history', storeSchema);
module.exports = stores;