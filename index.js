const express =  require('express');
require("dotenv").config()
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const router = require('express').Router();
const appRoutes  =  require("./routes/routes")
const cloudinary = require('cloudinary');
const { connectToDB } = require('./config/database_config');
const dbConnection = require('./config/database_config').connectToDB
const app = express();
app.use(cors())
app.use(express.json());

connectToDB().then((result )=>{
    console.log("result ", result)
}).catch((error)=>{
    console.log("Error", error)
})


app.use("/api" , appRoutes)



app.listen(process.env.PORT || 8000 , ()=>{
    console.log("listening on port 8000")
})