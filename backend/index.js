const express = require("express");
const app = express();
const router = require('./routes/index.js')
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');


app.use(express.json());
app.use('/user',router);
app.use(cors())



mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("db success");
    app.listen(process.env.PORT,()=>{
        console.log("running");
    })
}).catch((e)=>{
       console.log(e);
})




