const axios = require('axios');

// Function to create the log Requests...
async function logRequests(type, path, res) {
    const logData = {
        type : type,
        path : path,
        // Converting date to string format...
        time : new Date().toISOString()
    }
    try {
        console.log("log request start !!")
        // Using POST on deployed microservice url...
        await axios.post('https://storage-microservice-1.onrender.com/log', logData)
        .then(() => console.log("log request end !!"))
        .catch(error => console.error('Error while logging:', error));
    }
    catch(error) {
        res.send(error);
    }
}

module.exports = { logRequests }