const { DB } = require('./DB'); // Ensure you're destructuring correctly
const Config = require('./Config');

class DBconfig extends DB {
    constructor(connect = false) {
        super(); // Call the parent class constructor

        if (connect) {
            const configInstance = new Config(); // Rename to avoid shadowing

            this.DBType = configInstance.getDBType();
            this.DBName = configInstance.getDBName();
            this.DBUser = configInstance.getDBUser();
            this.DBHost = configInstance.getDBHost();
            this.DBPass = configInstance.getDBPass();
            this.DBPort = configInstance.getDBPort();

            // Establish the connection
            this.connect(connect);
        }
    }
}

module.exports = DBconfig;
