const express =  require('express');
const mongoose = require('mongoose')
const multer = require('multer')
const router = require('express').Router();
const appRoutes  =  require("./routes/routes")
const cloudinary = require('cloudinary');
const { connectToDB } = require('./config/database_config');
const dbConnection = require('./config/database_config').connectToDB
const app = express();

app.use(express.json());

 connectToDB().then((result )=>{
    console.log("result ", result)
}).catch((error)=>{
    console.log("Error", error)
})

app.use(appRoutes)

app.get("/",()=>{
    console.log("connected")
})


app.listen(8000 , ()=>{
    console.log("listening on port 8000")
})