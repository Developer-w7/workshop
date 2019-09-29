const mongoose = require('mongoose')
const url = process.env.MONGODB_URI || "mongodb+srv://dbroot:dbroot@cluster0-rhzba.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async() =>{
    await  mongoose.connect(url, {
        useNewUrlParser: true ,
        useUnifiedTopology: true
        }) 
        console.log("connection successful");
}

module.exports = connectDB;