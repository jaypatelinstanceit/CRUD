//Config.js
class Config {  // Config class to manage the environment variables for the application
    constructor() {  // constructor to initialize the environment variables for the application
        this.servermode = process.env.SERVER_MODE || 'dev'; // 'dev', 'uat', 'prod'
        this.DBType = process.env.DB_TYPE || 'MONGODB';
        this.DBName = process.env.DB_NAME || 'CRUD220125'; // Updated database name
        this.DBUser = process.env.DB_USER || '';
        this.DBHost = process.env.DB_HOST || '127.0.0.1';
        this.DBPass = process.env.DB_PASS || '';
        this.DBPort = process.env.DB_PORT || '27017';
    }


    getServerMode() { // getServerMode function to return the server mode
        return this.servermode;
    }

    getDBType() {
        return this.DBType;
    }

    getDBName() {
        return this.DBName;
    }

    getDBUser() {
        return this.DBUser;
    }

    getDBHost() {
        return this.DBHost;
    }

    getDBPass() {
        return this.DBPass;
    }

    getDBPort() {
        return this.DBPort;
    }

    getErrmsg() {
        return { // Error messages for invalid environment variables
            serverMode: "Server mode must be one of 'dev', 'uat', or 'prod'", // Updated error message for server mode if invalid
            dbConfig: "Database configuration is invalid", // Updated error message for database configuration if invalid
        };
    }
}

module.exports = Config; // Export the Config class for use in other modules

    // constructor() {
    //     this.servermode = process.env.SERVER_MODE || 'dev'; // 'dev', 'uat', 'prod'
    //     this.DBType = process.env.DB_TYPE || 'MONGODB';
    //     this.DBName = process.env.DB_NAME || 'myDatabase';
    //     this.DBUser = process.env.DB_USER || '';
    //     this.DBHost = process.env.DB_HOST || '127.0.0.1';
    //     this.DBPass = process.env.DB_PASS || '';
    //     this.DBPort = process.env.DB_PORT || '27017';
    // }