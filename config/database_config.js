const dotenv = require('dotenv').config()
const mongoose = require('mongoose');
const url = process.env.MONGO_URI

const connectToDB = async () => {
try {
    mongoose.connect(url).then(()=>{
        console.log("connection successful")
    }).catch((err)=>{
        console.log("connection failed")
    })
} catch(error){
    throw Error(error)
}
}


module.exports = {connectToDB}