const Mongoose = require('mongoose');

const Connection = require('../database/transaction');

const userSchema = new Mongoose.Schema({
    name : {type : String, required : true},
    userID : {type : String, required : true},
    studentID : {type : String, required : true}
});

const stores = Connection.storeConnection.model('userData', userSchema);
module.exports = stores;