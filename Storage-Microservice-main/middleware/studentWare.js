const student = require('../model/student');
const admin = require('../model/admin');

function adminSender(req, res, next) {
    const admin = req.query?.name; // Extract 'name' from query params
    const id = req.query?.id;      // Extract 'id' from query params
  
    // Check if the required query parameters are present
    if (!admin || !id) {
      return res.status(400).json({ error: "Missing query parameters" }); // 400 Bad Request if missing
    }
  
    // Checking for valid admin credentials
    if ((admin === "Vishu Kalier" && id === "18082003") || (admin === "Durgesh Singh" && id === "24112001")) {
      next(); // Valid credentials, proceed
    } else {
      return res.status(403).json({ error: "Access denied: Invalid Credentials" }); // 403 Forbidden if invalid
    }
}

  

function adminSenderAuth(req, res, next) {
    // Ensure that req.query exists and contains the necessary properties...
    const admin = req.body?.auth?.name;
    const id = req.body?.auth?.id;

    if (!admin || !id) {
        return res.status(400).json({ error: "Missing query parameters" });
    }

    // Checking if admin...
    if (admin === "Vishu Kalier" && id === "18082003") {
        next(); // Move to the function call (middleware passed)...
    }
    else if(admin === "Durgesh Singh" && id === "24112001") {
        next();     // Move to the function call (middleware passed)...
    }
    else {
        // Otherwise mark as access denied...
        res.status(403).json({ error: "Access denied: Invalid Credentials !!" });
    }
}

async function studentSender(req, res, next) {
    // Ensure that req.query exists and contains the necessary properties...
    const studentId = req.body.studentID;
    if (!studentId)     // If the studentID is not present...
        return res.status(400).send("Missing studentID query parameter");
    let stu = await student.findOne({ studentID: studentId });
    if (stu) {
        next();     // Pass the next function...
    } else {
        res.status(503).send("Not Found !!");
    }
}

async function constAdminSender(req, res, next) {
    const name = req.query.name;
    const found = await admin.findOne({name : name});
    if(!found)
        return res.status(400).send("Not found as Admin !!");
    else next();
}

// Importing the Middleware...
module.exports = {adminSender, studentSender, constAdminSender, adminSenderAuth};
