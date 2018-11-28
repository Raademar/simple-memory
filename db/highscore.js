const mongoose = require('mongoose')

// scoreSchema Schema
let scoreSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  score:{
    type: Number,
    required: true,
  }
})

let HighScore = module.exports = mongoose.model('HighScore', scoreSchema)