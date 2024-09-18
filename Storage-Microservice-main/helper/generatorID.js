function generateTransactionID(fromUser) {
    let ID = "";
    for(let i = 0; i < 15; i++)
        ID += ""+Math.floor(Math.random()*10);
    ID += fromUser
    return ID;
}

function generateUserID(user) {
    let ID = "";
    for(let i = 0; i < user.length; i++) {
        if(user.charAt(i) == ' ')   break;
        ID += user.charAt(i);
    }
    for(let i = 0; i < 4; i++)
        ID += ""+Math.floor(Math.random()*10);
    return ID;
}

function generateStudentID(name) {
    name = name.padEnd(4, ' '); // Pad the name if it's shorter than 4 characters...

    // Extract the first four characters...
    const chars = name.slice(0, 4);

    // Convert each character to ASCII code...
    const asciiValues = chars.split('').map(char => char.charCodeAt(0));

    // Define the polynomial base and modulus...
    const p = 31; // A commonly used prime number for polynomial hashing...
    const m = 10000; // Modulus to keep the result within 4 digits...

    // Perform polynomial hashing...
    let hash = 0;
    for (let i = 0; i < asciiValues.length; i++) {
        hash = (hash * p + asciiValues[i]) % m;
    }

    // Ensure the hash is a 4-digit number...
    hash = Math.abs(hash); // Use absolute value to avoid negative numbers...
    hash = hash.toString().padStart(4, '0'); // Pad with leading zeros if necessary...

    return hash;
}

function generateAccID(accNo) {
    const chars = accNo.slice(accNo.length-4);    // Take last four digits of the accNo as ID...
    return chars.toString();    // Convert it to string and return it...
}


module.exports = {generateTransactionID, generateUserID, generateStudentID, generateAccID};