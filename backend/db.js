const mongoose = require('mongoose')
const uri = "mongodb://localhost:27017/learncloud"

const connectToDb = async()=>{
    await mongoose.connect(uri)
    console.log('connected to db')
}

module.exports = connectToDb