const express = require('express');
const studentMap = require('../model/studentID');
const student = require('../model/student');
const studentTrash = require('../model/studentTrash');
const {logRequests} = require('../helper/logsHelper');

const router = express.Router();

router.get('/find/id', async(req, res) => {
    try {
        const { name, password } = req.body; // Destructuring the request body
        if (!name || !password) {
            return res.status(400).send("Incomplete credentials sent!!");
        }
        // Await the findOne operation...
        let student = await studentMap.findOne({ name: name, password: password });
        if (!student) {
            return res.status(404).send("No such student found!!");
        } else {
            await logRequests('GET', '/find/id', res);
            return res.status(200).json({"studentID" : student.studentID}); // If student is found, send it back
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error"); // 500 for unexpected server errors
    }
});


router.get('/find/password', async(req, res) => {
    try{
        const id = req.body?.studentID;
        if(!id)   return res.status(400).send("No complete credentials send !!");
        // Asynchronous hence wait it for querying, otherwise will be null...
        let student = await studentMap.findOne({studentID : id});
        if(!student) {
            return res.status(503).json("No such student exists !!");
        }
        else {
            student.count = student.count + 1;
            // Keep the updated data...
            await student.save();
            await logRequests('GET', '/find/password', res);
            res.status(200).json({
                "name" : student.name,
                "password" : student.password
            });
        }
    }
    catch(error) {
        res.status(400).send(error);
    }
});

router.get('/find/query', async(req, res) => {
    try{
        const id = req.body?.studentID;
        if(!id)   return res.status(400).send("No complete credentials send !!");
        // Asynchronous hence wait it for querying, otherwise will be null...
        let student = await studentMap.findOne({studentID : id});
        if(!student) {
            return res.status(503).json("No such student exists !!");
        }
        else {
            await logRequests('GET', '/find/query', res);
            res.status(200).json({
                "studentID" : student.studentID,
                "count" : student.count
            });
        }
    }
    catch(error) {
        res.status(400).send(error);
    }
})

async function deleteThreeQueries() {
    try {
        console.log("Delete Three count function called !!");
        
        // Find all students with count > 3
        const found = await studentMap.find({ count: { $gt: 3 } });
        
        if (found.length > 0) {
            // Delete entries from studentMap where count > 3
            await studentMap.deleteMany({ count: { $gt: 3 } });
            
            // Iterate through each found student
            for (let i = 0; i < found.length; i++) {
                const studentDoc = found[i];
                const id = studentDoc.studentID; // Access studentID from each document
                
                // Find the student document in the student collection
                const stu = await student.findOne({ studentID: id });
                
                if (stu) {
                    // Insert the student document into the trash collection
                    await studentTrash.create(stu.toObject()); // Convert to plain JavaScript object
                    // Delete the student document from the student collection
                    await student.deleteOne({ studentID: id });
                }
            }
        }
        
        console.log("Entries moved to trash:", found);
    } catch (error) {
        console.log("Error:", error);
    }
}

setInterval(deleteThreeQueries, 60000); // Call every 1 minute...


module.exports = router;