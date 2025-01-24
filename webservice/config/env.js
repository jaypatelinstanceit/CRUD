const dotenv = require('dotenv');

// Load .env file variables into process.env
dotenv.config();

const requiredVariables = ['PORT', 'MONGO_URI', 'JWT_SECRET'];

requiredVariables.forEach((varName) => {
    if (!process.env[varName]) {
        console.error(`Missing required environment variable: ${varName}`);
        process.exit(1); // Exit the process with failure
    }
});

module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
};
