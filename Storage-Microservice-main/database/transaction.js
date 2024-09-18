const mongoose = require('mongoose');

const storeConnection = mongoose.createConnection('mongodb+srv://root:root@transactions.a9sgi.mongodb.net/stores');
const historyConnection = mongoose.createConnection('mongodb+srv://root:root@transactions.a9sgi.mongodb.net/history');

module.exports = {storeConnection, historyConnection};