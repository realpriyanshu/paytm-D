const mongoose = require('mongoose');
const { number } = require('zod');



const paySchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required :true
    }
})

const AccountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance :{
        type: Number,
        required:true
    }
});
const Account = mongoose.model('Account',AccountSchema);
 const DbSchema = new mongoose.model("paytmSchema" , paySchema);
 module.exports = {DbSchema ,Account}; // For CommonJS

