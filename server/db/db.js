//db.js
require('dotenv').config()
const mongoose = require("mongoose")

const url = process.env.DB_URL

mongoose.connect(url, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'blogs'
}).then(() =>{
    console.log("database connected")
}).catch((error)=>{
    console.error("Connection error", error)
})

module.exports = mongoose