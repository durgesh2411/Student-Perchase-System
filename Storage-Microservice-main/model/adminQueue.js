const Mongoose = require('mongoose');
const adminDB = require('../database/storage');

const adminQueueSchema = new Mongoose.Schema({
    name : {type : String, required : true},
    password : {type : String, required : true},
    votes : {type : Number},
    voters : {type : []}
});

const adminQueues = adminDB.adminConnection.model('adminQueue', adminQueueSchema);
module.exports = adminQueues;