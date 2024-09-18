const Mongoose = require('mongoose');

const Connect = require('../database/storage');

const adminSchema = new Mongoose.Schema({
    name : {type : String, required : true}
});

const adminss = Connect.adminConnection.model('admins', adminSchema);
module.exports = adminss;