const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()
const url = process.env.MONGOLAB_URI
mongoose.connect(url, (err, res) => {
  if(err) {
    console.log(err)
  } else {
    console.log('connected to db!')
  }
})
const db = mongoose.connection

// Check for connection
db.once('open', () => {
  console.log('connected to MongoDB')
})

db.on('error', (err) => {
  console.log(err)
})

const app = express()

app.listen(3000, () => console.log('listening on port 3000!'))