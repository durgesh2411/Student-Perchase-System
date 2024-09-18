const adminQueue = require("../model/adminQueue");

function adminSender(req, res, next) {
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

async function adminVoter(req, res, next) {
    const name = req.body?.auth?.name;
    if(!name)   return res.status(400).json({"error" : "Missing Query Parameters !!"});
    const adminName = await adminQueue.findOne({name : name});
    if(!adminName)  return res.status(400).json({"error" : "bad request !!"});
    else next();
}

module.exports = {adminSender, adminVoter};