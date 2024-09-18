const express = require('express');
const adminQueue = require('../model/adminQueue');
const admin = require('../model/admin');
const middleware = require('../middleware/studentWare');
const adminWare = require('../middleware/adminWare');
const Student = require('../model/student');
const {logRequests} = require('../helper/logsHelper');

const router = express.Router();

router.post('/admin/addQueue', adminWare.adminSender, async(req, res) => {
    try{
        const name = req.body.newAdmin.name;
        const password = req.body.newAdmin.password;
        const adQueue = await adminQueue.findOne({name : name, password : password});
        if(adQueue)
            return res.status(400).send("Duplicate Entries not allowed !!");
        const newAdminQueue = new adminQueue({
            name : name,
            password : password,
            votes : 0,
            voters : []
        });
        const data = await newAdminQueue.save();
        await logRequests('POST', '/admin/addQueue', res);
        res.status(200).json(data);
    }
    catch(e) {console.log(e);}
});

router.post('/admin/add', adminWare.adminSender, async(req, res) => {
    try {
        const adname = req.body?.adminName;
        const duplicate = admin.findOne({name : adname});
        if(!duplicate)
            return res.status(400).send("Duplicate Entries not allowed !!");
        const newAdmin = new admin({
            name : adname
        });
        await newAdmin.save();
        await logRequests('POST', '/admin/add', res);
        res.status(200).send(`New Admin as ${adname} created !!`);
    }
    catch(e) {res.status(400).send(e);}
})

router.post('/admin/vote', adminWare.adminVoter, async(req, res) => {
    try {
        const name = req.body.newAdmin.name;
        const studentID = req.body.newAdmin.studentID;
        const adname = req.body.auth.name;
        let neta = await adminQueue.findOne({name : adname});
        if(!neta)   return res.status(400).send("Admin not present in the Queue");
        console.log("Admin found in Queue !!");
        let stu = await Student.findOne({studentID : studentID});
        if(!stu)    return res.status(400).send("Student not found in the Storage !!");
        neta.votes = neta.votes + 1;
        neta.voters.push(studentID);
        await neta.save();
        await logRequests('POST', '/admin/vote', res);
        res.status(200).send(`${neta.name} admin voted by ${name}`);
    }
    catch(e) {console.log("Error in voting : "+e);}
});

router.get('/admin/getQueueAll', middleware.adminSender, async(req, res) => {
    try{
        const data = await adminQueue.find();
        await logRequests('GET', '/admin/getQueueAll', res);
        res.status(200).json(data);
    }
    catch(e) {console.log(e);}
});

router.get('/admin/getAll', middleware.constAdminSender, async(req, res) => {
    try{
        const data = await admin.find();
        await logRequests('GET', '/admin/getAll', res);
        res.status(200).json(data);
    }
    catch(e) {console.log(e);}
});

async function updateAdmin() {
    try {
        const majorNeta = await adminQueue.find({ votes: { $gt : 2 } });
        if (majorNeta.length > 0) {
            for (let i = 0; i < majorNeta.length; i++) {
                const neta = majorNeta[i];
                const newAdmin = new admin({
                    name: neta.name
                });
                await newAdmin.save();
                console.log(`Admin saved: ${neta.name}`);
            }
            const res = await adminQueue.deleteMany({ votes: { $gt: 2 } });
            console.log(`Entries became admin: ${res.deletedCount}`);
        }
        else console.log("No admin change !!");
    } catch (e) {
        console.error("Error in updateAdmin:", e);
    }
}


setInterval(updateAdmin, 60000);

module.exports = router;