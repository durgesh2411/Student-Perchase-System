const mongoose = require('mongoose');
const Connection = require('../database/storage');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    studentID: { type: String },
    accNo: { type: String, required: true },
    age: { type: Number, required: true },
    accID: { type: String },
    monCredit: { type: Number },
    monDebit: { type: Number }
});

const Student = Connection.studentListConnection.model('Student', studentSchema);
module.exports = Student;
