const express = require('express');
const middleware = require('../middleware/studentWare');
const helper = require('../helper/searchHelper');

const router = express.Router();

router.get('/search/logs', middleware.constAdminSender, async (req, res) => {
    try {
        const type = req.body.type;
        const result = await helper.logSearch(type, res);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/search/student', middleware.constAdminSender, async(req, res) => {
    try {
        const studentID = req.body.studentID;
        const result = await helper.studentSearch(studentID, res);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;