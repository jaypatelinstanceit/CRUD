//imports
const crypto = require('crypto')

class IISMethods {

    generateuuid() {
        return crypto.randomUUID()  
    }

    getdatetimestr() {
        return new Date()
            .toISOString()
            .replace(/T/, " ") // replace T with a space
            .replace(/\..+/, "")
    }
    
}

//exports
module.exports = IISMethods
