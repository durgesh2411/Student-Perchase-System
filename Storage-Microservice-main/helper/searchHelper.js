const Logs = require('../model/logs');
const LogsTrash = require('../model/logsTrash');
const Student = require('../model/student');
const StudentTrash = require('../model/studentTrash');

async function logSearch(query, res) {
    try {
        const found = await Logs.find({logtype : query});
        const foundTrash = await LogsTrash.find({logtype : query});
        return {
            "logs" : found,
            "bin" : foundTrash
        };
    } catch (error) {
        res.send(error);
    }
}

async function studentSearch(query, res) {
    try {
        const student = await Student.find({studentID : query});
        const studentTrash = await StudentTrash.find({studentID : query});
        return {
            "studentList" : student,
            "bin" : studentTrash
        }
    } catch (error) {
        res.send(error);
    }
}

module.exports = {logSearch, studentSearch};