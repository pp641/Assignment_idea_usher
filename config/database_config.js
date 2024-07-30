const mongoose = require('mongoose');
const {MongoClient} = require('mongodb')
const url = 'mongodb+srv://prajjwalpandey641:8BSjr0Uab4zUOGw6@cluster0.ypyvsdp.mongodb.net/'

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