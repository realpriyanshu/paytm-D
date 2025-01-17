const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const { DbSchema, Account } = require("../Models/model.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const z = require("zod");
const { authMiddleware } = require("../middleware.js");

// Validation schema for user signup input
const validateZ = z.object({
  firstName: z.string(),  // First name must be a string
  lastName: z.string(),   // Last name must be a string
  password: z.string(),   // Password must be a string
  username: z.string().email(), // Username must be a valid email
});

// Validation schema for user sign-in input
const signInZ = z.object({
  username: z.string().email(), // Username must be a valid email
  password: z.string(),         // Password must be a string
});

// Validation schema for updating user details
const updateBody = z.object({
  password: z.string().optional(),  // Password is optional
  firstName: z.string().optional(), // First name is optional
  lastName: z.string().optional(),  // Last name is optional
});

// Route for user signup
Router.post("/signup", async (req, res) => {
  const userPay = req.body;

  // Validate user input
  const resp = validateZ.safeParse(userPay);
  if (!resp.success) {
    return res.json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  // Check if the username already exists in the database
  const existingUser = await DbSchema.findOne({
    username: resp.data.username,
  });
  if (existingUser) {
    return res.json({
      msg: "User already exists",
    });
  }

  // Create a new user object
  const user = {
    firstName: resp.data.firstName,
    lastName: resp.data.lastName,
    password: resp.data.password,
    username: resp.data.username,
  };

  // Save the user in the database
  const create = await DbSchema.create(user);
  const user_id = create._id;

  // Create an account for the user with an initial random balance
  await Account.create({
    userId :user_id,
    balance: 1 + Math.random() * 10000,
  });

  // Generate a JWT token for the user
  const token = jwt.sign(
    {
      userId: user_id,
    },
    process.env.JWT_SECRET
  );

  // Respond with success message and token
  res.json({
    message: "User created successfully",
    token: token,
  });
});

// Route for user sign-in
Router.post("/signin", async (req, res) => {
  // Validate user input
  const resp = signInZ.safeParse(req.body);

  // Find user credentials in the database
  const credentials = await DbSchema.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (credentials) {
    console.log(credentials._id);
    // Generate a JWT token for authenticated user
    const token = jwt.sign(
      {
        user_id: credentials._id,
      },
      process.env.JWT_SECRET
    );

    // Respond with success message and token
    res.json({
      msg: "Logged in successfully",
      token: token,
    });
    return;

  } else {
    // Respond with error message if user doesn't exist
    res.json({
      msg: "User doesn't exist",
    });
  }
});

// Route to get all users
Router.get("/", async (req, res) => {
  const users = await DbSchema.find(); // Fetch all users from the database

  // Respond with the list of users
  res.json(users);
});



// Route to get filtered users based on query
Router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || ""; // Get filter query parameter

  // Search for users matching the filter in their first or last name
  const users = await DbSchema.find({
    $or: [
      {
        firstName: {
          "$regex": filter, // Partial match on first name
        },
      },
      {
        lastName: {
          "$regex": filter, // Partial match on last name
        },
      },
    ],
  });

  // Respond with filtered user data
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

// Route to edit user details
Router.put("/edit", authMiddleware, async (req, res) => {
  // Validate the update request body
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(403).json({
      msg: "Input error",
    });
  }

  const { id } = req.params; // Get user ID from request parameters
  const userPay = req.body;

  // Validate the updated user input
  const resp = validateZ.safeParse(userPay);
  if (!resp.success) {
    return res.json({
      msg: "Check your input",
    });
  }

  // Update the user details in the database
  const result = await DbSchema.updateOne({ id: req.userId }, req.body);

  // Respond with success message
  res.json({
    msg: "Updated successfully",
  });
});

// Export the router to be used in other parts of the application
module.exports = Router;
