const express = require('express');
const jwt = require('jsonwebtoken');

//  IN THE MIDDLE WARE THE TOKEN IS DESTRUCTURED AND THE USER id IS FETCHED FROM IT THEN THE POST OR GET ROUTE FETCH THE USER DATA FROM IT 

// Middleware function to authenticate users
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization; // Extract the `Authorization` header from the request

    // Check if the `Authorization` header exists and starts with 'Bearer'
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({}); // Respond with a 403 status if the token is missing or invalid
    }

    // Extract the token from the `Authorization` header
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token using the secret key from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user ID to the request object for further processing
        req.userId = decoded.userId;

        // Call the `next` function to proceed to the next middleware or route handler
        next();
    } catch (e) {
        // Handle invalid or expired tokens
        return res.status(403).json({});
    }
};

// Export the middleware function to be used in other parts of the application
module.exports = {
    authMiddleware
};
