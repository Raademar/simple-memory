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


async function getHighscores() {
  const highscores = await Mood
		.find({ player : player})
		.populate('highscores', 'player')
    .select('player score')
  if(!highscores) {
    console.log('No Moods registered.')
  }
  return highscores
}

app.get('/highscore', async(req, res) => {
try {
	let highscores = await getHighscores()
	res.render('highscore', {
		highscores: highscores
	})
} catch(err) {
	res.send('No highscores found')
	}
})

let Highscore = require('./db/highscore')
app.post('/db', (req, res) => {
  let highScore = new Highscore({
    player: req.body.player,
    score: req.body.score
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
