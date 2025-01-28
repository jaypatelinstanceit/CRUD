// DB.js
const Config = require('./Config'); // Ensure no circular dependency
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // JWT module to generate and verify tokens
const fs = require('fs');  // File system module
const path = require('path'); // Path module
import { IISMethods } from './init';
import _IISMethods from "./IISMethods.js"
var privateKEY = fs.readFileSync("./config/private.key", "utf8")
var publicKEY = fs.readFileSync("./config/public.key", "utf8")

class DB {
    // Initialize the database configuration parameters to null values by default 
    constructor() {
        this.DBName = null;
        this.DBUser = null;
        this.DBHost = null;
        this.DBPass = null;
        this.DBPort = null;
        this.DBType = null;
    }

    // Connect to the database based on the configuration
    async connect(isMainDB) {
        const configInstance = new Config(); // Rename to avoid shadowing

        try {
            if (this.DBType === "MONGODB") {
                let connectionString = `mongodb://${this.DBHost}:${this.DBPort}/${this.DBName}`;

                if (configInstance.servermode === "prod" || configInstance.servermode === "uat") {
                    connectionString = `mongodb+srv://${this.DBUser}:${this.DBPass}@${this.DBHost}/${this.DBName}`;
                }

                await mongoose.connect(connectionString, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    retryWrites: true,
                    readPreference: "nearest",
                });

                console.log(`MongoDB ${this.DBName} connected successfully!`);

                if (isMainDB) {
                    const { MongoClient } = require('mongodb');
                    const client = new MongoClient(connectionString);
                    await client.connect();
                    global.dbclient = client;
                }
            } else {
                throw new Error("Unsupported DB Type");
            }
        } catch (error) {
            console.error("Failed to connect to MongoDB:", error.message);
            process.exit(1);
        }
    }

    // Generate a new JWT token using the private key
    getjwt = async ({
        domainname = "",
        uid = "",
        unqkey = "",
        iss = "",
        useragent = "",
        aud = "",
        exph = "10hrs"
    }) => {
        const IISMethods = new _IISMethods();

        if (!iss || !uid || !unqkey || !useragent) {
            throw new Error('Missing required parameters');
        }

    // Payload
        const payload = {
            uid,
            unqkey,
            useragent,
            ...(domainname && { domainname }) // Add domainname to the payload if it exists (optional)
        };

    // Signing Options
        const signOptions = {
            issuer: iss,
            audience: aud,
            expiresIn: exph,
            algorithm: "RS256"
        };

        const tokenExpiry = {
            unqkey,
            uid,
            iss,
            useragent,
            exp: exph
        };

        try {
            const token = jwt.sign(payload, privateKEY, signOptions);
            return { token, tokenExpiry };
        } catch (error) {
            throw new Error(`JWT Generation failed: ${error.message}`);
        }
    
    } // End of getJWT

}

// Load the private and public keys
const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8');
const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, 'public.key'), 'utf8');









// Centralized CRUD function
const executeData = async (operation, ObjModel, data, insertlog = false, dependency = []) => {
    try {
        switch (operation) {
            case 'i': // Insert
                if (insertlog) {
                    console.log('Inserting data with log enabled'); // Log the insert operation
                }
                const newRecord = new ObjModel(data); // Create a new record
                await newRecord.validateSync(); // Validate the record by calling the validateSync method which returns the validation result by synchronously executing the validation rules for the record
                await newRecord.save(); // Save the record to the database
                return { message: 'Insert operation successful', data: newRecord }; // Return a success message along with the inserted record

            case 'u': // Update
                if (!data._id) {
                    throw new Error('Missing ID for update operation');
                }
                const updatedRecord = await ObjModel.findByIdAndUpdate( // Find the record by ID and update it
                    data._id, // ID of the record to update
                    data, // Data to update
                    { runValidators: true, new: true } // Options to run validators and return the updated record
                );
                return { message: 'Update operation successful', data: updatedRecord }; // Return a success message along with the updated record

            case 'd': // Delete
                if (dependency.length > 0) { // Check if there are dependencies
                    for (const dep of dependency) { // Iterate over the dependencies    
                        const dependentData = await dep.ObjModel.find(dep.criteria); // Find the dependent data
                        if (dependentData.length > 0) {    // Check if there are dependent data
                            throw new Error('Delete operation failed due to dependencies.'); // Throw an error if there are dependencies
                        }
                    }
                }
                if (!data._id) {
                    throw new Error('Missing ID for delete operation');  // Throw an error if the ID is missing
                }
                await ObjModel.findByIdAndDelete(data._id); // Find the record by ID and delete it
                return { message: 'Delete operation successful' }; // Return a success message

            case 'r': // Read
                const records = await ObjModel.find(data.query, data.fields); // Find records based on the query and fields
                return { message: 'Read operation successful', data: records }; // Return a success message along with the records

            default:
                throw new Error('Invalid operation type'); // Throw an error for invalid operation type
        }
    } catch (err) {
        throw new Error(`Error in CRUD operation: ${err.message}`);     // Throw an error for any other errors
    }
};




// Verify a JWT token using the public key
const vallidateJWT = (token) => {
    try {
        return jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });  // Verify the token using the public key
    } catch (err) {
        console.error('Token verification failed:', err);
        throw err;
    }
};

module.exports = { DB, executeData, getJWT, vallidateJWT }; // Export the function for use in other files