const express = require('express');
const { Account } = require('../Models/model');
const { default: mongoose } = require('mongoose');
const { authMiddleware } = require('../middleware');
const router = express.Router();

// Route to check the balance of a user's account
router.get('/balance', authMiddleware, async (req, res) => {
    // Find the account associated with the authenticated user
    const account = await Account.findOne({
        userId: req.userId
    });

    // Respond with the balance of the account
    res.status(200).json({
        balance: account.balance
    });
});

// Route to transfer money from one account to another
router.post('/transfer', async (req, res) => {
    // Start a new session for transaction management

    //why we need i session because sometimes in between the operation got stuck so sometimes the payment will get transfered without even 
    // amount deducted thats why we are using session so it will complete the whole operation or will cancel the whole operation
    
    const session = await mongoose.startSession();
    session.startSession();

    // Extracting amount and recipient's userId from the request body
    const { amount, to } = req.body;

    // Find the sender's account using the authenticated user's ID
    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    // Check if the sender's account exists and has sufficient balance
    if (!account || account.balance < amount) {
        await session.abortTransaction(); // Abort the transaction if validation fails
        return res.status(400).json({
            msg: "insufficient balance"
        });
    }

    // Find the recipient's account using their userId
    const toAccount = await Account.findOne({
        userId: to
    });

    // Check if the recipient's account exists
    if (!toAccount) {
        await session.abortTransaction(); // Abort the transaction if validation fails
        return res.status(400).json({
            msg: "invalid account"
        });
    }

    // Deduct the transfer amount from the sender's account balance
    await Account.updateOne(
        { userId: req.userId },
        {
            $inc: {
                balance: -amount // Decrease the balance by the transfer amount
            }
        }
    ).session(session);

    // Add the transfer amount to the recipient's account balance
    await Account.updateOne(
        { userId: to },
        {
            $inc: {
                balance: amount // Increase the balance by the transfer amount
            }
        }
    ).session(session);

    // Commit the transaction after successful updates
    await session.commitTransaction();

    // Respond with a success message
    res.json({
        message: "Transfer successful"
    });
});

// Export the router to be used in other parts of the application
module.exports = router;
