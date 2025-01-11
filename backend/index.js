const express = require("express");
const app = express();
const userRouter = require('./routes/index.js'); // Importing user-related routes
const AccountRouter = require('./routes/accounts.js'); // Importing account-related routes
const mongoose = require('mongoose'); // Importing Mongoose for database connection
require('dotenv').config(); // Loading environment variables from a `.env` file
const cors = require('cors'); // Importing CORS middleware to handle cross-origin requests

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to define route for user-related operations
app.use('/user', userRouter);

// Middleware to define route for account-related operations
app.use('/account', AccountRouter);

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Connecting to MongoDB database
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("db success"); // Log success message upon successful database connection

        // Start the server and listen on the specified port from environment variables
        app.listen(process.env.PORT, () => {
            console.log("running"); // Log message when the server is up and running
        });
    })
    .catch((e) => {
        console.log(e); // Log the error message if the database connection fails
    });
