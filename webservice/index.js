// index.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const DBConfig = require('./config/DBconfig');
const authRoutes = require('./router');

// Log to verify the required modules are loaded
console.log("Modules loaded: express, body-parser, dotenv, DBConfig, authRoutes");

// Load environment variables
dotenv.config();
console.log("Environment variables loaded");

// Validate required environment variables
const { PORT } = require('./config/env');
console.log(`Server will attempt to run on PORT: ${PORT}`);

// Initialize Express app
const app = express();
console.log("Express app initialized");

// Middleware for JSON parsing 
app.use(bodyParser.json());
console.log("Middleware for JSON parsing added");

// Connect to Database
console.log("Initializing database connection...");
const dbConfig = new DBConfig(true);
console.log("Database configuration initialized");

// Routes
app.use('/api/auth', authRoutes);
console.log("Routes for /api/auth initialized");

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Error encountered:", err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'An unexpected error occurred',
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
