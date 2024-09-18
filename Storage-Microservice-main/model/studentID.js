const mongoose = require('mongoose');
const Connection = require('../database/storage');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    studentID: { type: String },
    count: { type: Number, default: 0 }
});

const StudentMap = Connection.studentListConnection.model('StudentMap', studentSchema);
module.exports = StudentMap;
