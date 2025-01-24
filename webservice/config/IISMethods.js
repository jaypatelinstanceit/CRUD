//imports
const crypto = require('crypto')


function generateuuid() {
    return crypto.randomUUID()  
}

//exports
module.exports = {
    generateuuid
}
