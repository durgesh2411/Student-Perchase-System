// import mongoose...

const Mongoose = require('mongoose');
const Connection = require('../database/storage');

// Define the log Schema...

const logSchema = new Mongoose.Schema({
    log : {type : "String", required : true},
    time : {type : "String", required : true},
    logtype : {type : "String", required : true}
});

// Document named as log(s)...

const LogsTrash = Connection.trashConnection.model("log", logSchema);
module.exports = LogsTrash;