const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

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

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('views', './views') // specify the views directory
app.set('view engine', 'pug') // register the template engine
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index')
})

let Highscore = require('./db/highscore')

async function getEasyHighscores() {
  const easyHighscores = await Highscore
    .find({ level : 'easy' })
    .sort('score')
  if(!easyHighscores) {
    console.log('No Moods registered.')
  }
  return easyHighscores
}
async function getMediumHighscores() {
  const mediumHighscores = await Highscore
    .find({ level : 'medium' })
    .sort('score')
  if(!mediumHighscores) {
    console.log('No Moods registered.')
  }
  return mediumHighscores
}
async function getHardHighscores() {
  const hardHighscores = await Highscore
    .find({ level : 'hard' })
    .sort('score')
  if(!hardHighscores) {
    console.log('No Moods registered.')
  }
  return hardHighscores
}
async function getRedonkHighscores() {
  const redonkHighscores = await Highscore
    .find({ level : 'redonk' })
    .sort('score')
  if(!redonkHighscores) {
    console.log('No Moods registered.')
  }
  return redonkHighscores
}

app.get('/highscore', async(req, res) => {
try {
	let easyHighscores = await getEasyHighscores() || []
	let mediumHighscores = await getMediumHighscores() || []
	let hardHighscores = await getHardHighscores() || []
  let redonkHighscores = await getRedonkHighscores() || []
	res.render('highscore', {
    highscores: {easy: easyHighscores, medium: mediumHighscores, hard: hardHighscores, redonk: redonkHighscores}
  
	})
} catch(err) {
	res.send('No highscores found')
	}
})


app.post('/db', (req, res) => {
  let highScore = new Highscore({
    player: req.body.player,
    score: req.body.score,
    level: req.body.level
  })
  highScore.save()
  .then(response => {
    console.log(`${response} saved to database`)
    res.send(response)
  })
  .catch(error => {
    console.log(error, 'not working.. this far')
    res.status(400).send('unable to save to database.')
  })
})

app.listen(3000, () => console.log('listening on port 3000!'))
