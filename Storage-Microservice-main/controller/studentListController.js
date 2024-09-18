const express = require('express');
const Student = require('../model/student');
const StudentMap = require('../model/studentID');
const middleware = require('../middleware/studentWare');
const { logRequests } = require('../helper/logsHelper');
const adminWare = require('../middleware/adminWare');
const { default: axios } = require('axios');
const generator = require('../helper/generatorID');

const router = express.Router();

router.get('/student/getOwn', middleware.studentSender, async (req, res) => {
    try {
        const stuId = req.body?.studentID;
        const dataJSON = await Student.findOne({ studentID: stuId });
        await logRequests('GET', '/student/getOwn', res);
        res.send(`${dataJSON.name} with ID ${dataJSON.studentID} and age ${dataJSON.age} is present in Storage !!`);
    } catch (e) {
        console.log("Error : " + e);
        res.status(500).send("Database connection failed !!");
    }
});

router.get('/student/getAll', middleware.constAdminSender, async (req, res) => {
    try {
        const data = await Student.find(); // Fetching student data
        await logRequests('GET', '/student/getAll', res); // Logging request
        res.send(data); // Sending back the student data
    } catch (error) {
        console.log(error);
        res.status(500).send("Database connection failed !!");
    }
});


router.post('/student/add', async (req, res) => {
    try {
        const dataBody = req.body;
        const studentData = new Student({
            name: dataBody.name,
            password: dataBody.password,
            accNo: dataBody.accNo,
            age: dataBody.age,
            studentID: generator.generateStudentID(dataBody.name) || undefined,
            accID: generator.generateAccID(dataBody.accNo) || undefined,
            monCredit: dataBody.monCredit || undefined,
            monDebit: dataBody.monDebit || undefined,
        });

        const studentMapData = new StudentMap({
            name: dataBody.name,
            password: dataBody.password,
            studentID: generator.generateStudentID(dataBody.name),
            count: 0
        });

        await axios.post('http://localhost:8000/createUserId', {
            name : studentData.name,
            studentID : studentData.studentID
        });

        await studentData.save();
        await studentMapData.save();
        await logRequests('POST', '/student/add', res);

        res.sendStatus(200);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Database connection or saving failed');
    }
});

router.delete('/student/clear', middleware.adminSender, async (req, res) => {
    try {
        const result = await Student.deleteMany({});
        const result1 = await StudentMap.deleteMany({});
        await logRequests('DELETE', '/student/clear', res);
        res.status(200).send(`${result.deletedCount} students and ${result1.deletedCount} passwords cleared from database !!`);
    } catch (error) {
        console.log("Error :" + error);
        res.status(500).send("Database Error !!");
    }
});

module.exports = router;
