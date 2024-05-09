// Import required modules
const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mysqlPool = require('./config/db');
const studentRoutes = require("./routes/studentRoutes");

// Configure dotenv
dotenv.config();

// Create Express app
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(morgan("dev")); // Log HTTP requests

// Define routes
app.use('/api/v1/student', studentRoutes); // Student routes
app.get('/test', (req, res) => {
    res.status(200).send('<h1>Welcome</h1>');
});

// Define port
const PORT = process.env.PORT;

// Function to start the server
async function startServer() {
    try {
        // Check MySQL connection
        await mysqlPool.query("SELECT 1");
        console.log("Database is Connected");

        // Start listening
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to MySQL:", error);
    }
}

// Start the server
startServer();
