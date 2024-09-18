const express = require('express');
const User = require('../model/Users');
const Transaction = require('../model/transaction');
const generator = require('../helper/generatorID');
const adminWare = require('../middleware/studentWare');
const {logRequests} = require('../helper/logsHelper');

const router = express.Router();

router.post('/transaction/made', async(req, res) => {
    try {
    const fromUser = await User.findOne({userID : req.body.sender});
    if(!fromUser)
        return res.status(503).send("Sender is not in the Database");
    const toUser = await User.findOne({userID : req.body.receiver});
    if(!toUser)
        return res.status(503).send("Receiver is not in the Database");
    const newTransaction = new Transaction({
        transactionID : generator.generateTransactionID(fromUser),
        transactionType : req.body.type,
        amount : req.body.amount,
        from : fromUser,
        to : toUser,
        time : new Date()
    });
    await newTransaction.save();
    await logRequests('POST', '/transaction/made', res);
    return res.status(200).send(`Transaction with the ${newTransaction.transactionID} ID complete !!`);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.get('/transaction/getAll', adminWare.constAdminSender, async(req, res) => {
    try {
    const data = await Transaction.find({});
    await logRequests('GET', '/transaction/getAll', res);
    res.status(200).json(data);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.post('/createUserID', async(req, res) => {
    try {
    const newUser = new User({
        name : req.body.name,
        userID : generator.generateUserID(req.body.name),
        studentID : req.body.studentID
    });
    await newUser.save();
    await logRequests('POST', '/createUserID', res);
    return res.sendStatus(200);
    } catch(e) {
        return res.status(400).send(e);
    }
});

module.exports = router;