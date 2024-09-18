const Mongoose = require("mongoose");

const trash = require('../database/storage');

// Defining the student Schema for the database...

const StudentTrashSchema = new Mongoose.Schema({
    name : {type : String, required : true},
    password : {type : String, required : true},
    studentID : {type : String},
    accNo : {type : String, required : true},
    age : {type : Number, required : true},
    accID : {type : String},
    monCredit : {type : Number},
    monDebit : {type : Number},
});

// Mongoose Schema imported...

const trashStudent = trash.trashConnection.model('studentbin', StudentTrashSchema);
module.exports = trashStudent;