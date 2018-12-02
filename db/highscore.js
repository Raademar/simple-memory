const mongoose = require('mongoose')

// scoreSchema Schema
let scoreSchema = mongoose.Schema({
  player: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    required: true,
  }
})

let Highscore = module.exports = mongoose.model('Highscore', scoreSchema)