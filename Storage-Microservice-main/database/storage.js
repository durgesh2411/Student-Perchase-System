const mongoose = require('mongoose');

const adminConnection = mongoose.createConnection('mongodb+srv://root:root@storage.a9sgi.mongodb.net/adminStore');
const studentListConnection = mongoose.createConnection('mongodb+srv://root:root@storage.a9sgi.mongodb.net/studentList');
const trashConnection = mongoose.createConnection('mongodb+srv://root:root@storage.a9sgi.mongodb.net/trash');

module.exports = {adminConnection, studentListConnection, trashConnection};