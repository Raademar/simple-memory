const body = document.body
const cardContainer = document.querySelector('.card-container')
const goblin = document.querySelector('.goblin')
const highscoreMessage = document.querySelector('.message')
const win = document.querySelector('.win')
const clickCounter = document.querySelector('.click-counter')
const topHeader = document.querySelector('.top-header')
const resetButton = document.querySelector('.reset-button')
let childNodes
let sortedArr
let userPickedLevel
let activeLevelToSave
let colorSwitchInterval
let shuffleTheCards
const levels = [...document.querySelectorAll('button')]
const easy = document.querySelector('.easy-button')
const medium = document.querySelector('.medium-button')
const hard = document.querySelector('.hard-button')
const redonk = document.querySelector('.redonk-button')
const home = document.querySelector('.home-button')
const saveHighScoreButton = document.querySelector('.save-button')
const levelsObject = {
  easy: {
    array: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
  },
  medium: {
    array: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12]
  },
  hard: {
    array: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16]
  },
  redonk: {
    array: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16]
  }
}
const redonkColorArray = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#f1c40f', '#e67e22', '#e74c3c']


let counter = 0
let tries = 0
let previousTarget = 0
let pickedCards = []
const matchedPairs = []
let player

function generateRandomNumb(array) {
  let numLeft = array.length
  let trade
  let currIndex

  while (numLeft) {
    // Pick a remaining number from the array
    currIndex = Math.floor(Math.random() * numLeft--)
    // Swap with current element
    trade = array[numLeft]
    array[numLeft] = array[currIndex]
    array[currIndex] = trade
  }
  return array
}

const assignValuesToCards = (array) => {
  array.forEach((num) => {
    let card = document.createElement('div')
    card.classList.add('card')
    card.classList.add('unmatched-card')
    card.dataset.value = num
    cardContainer.appendChild(card)
  })
}

// Function for clearing cards when the click counter is two.
const clearCards = (arr) => {
  arr.forEach(item => item.textContent = '')
  pickedCards = []
}

const cardsMatch = (arr) => {
  let first = arr[0]
  let second = arr[1]
  if (first === second) {
    return true
  }
  return false
}

// Here we loop throught each item in the given array.
// Set the matched variable to the value the matched cards have.
// We then splice the main array at the index of the matched card.
// Will run it twice to remove both cards.
const removeMatches = (arr) => {
  let matched = arr.map(function(item) {
    return parseInt(item.dataset.value)
  }).indexOf(matchedPairs[0][0])
  arr[matched].classList.remove('unmatched-card')
  arr.splice(matched, 1)
  return arr
}

// Shuffle the values of the cards in live game.
const redonkRandomizer = (arr) => {
  let rand = Math.floor((Math.random() * arr.length) + 0)
  generateRandomNumb(arr)
  arr.forEach((card) => {
    const newNum = arr[rand].dataset.value
    const replaceNum = card.dataset.value
    // Swap values of cards.
    card.dataset.value = newNum
    arr[rand].dataset.value = replaceNum

  })
  const gnome = new Audio('../assets/gnome.mp3')
  goblin.classList.add('visible')
  gnome.play()
  setTimeout(() => {
    goblin.classList.remove('visible')
  }, 2500)
}

const redonkColorSwitch = (arr, colorArr) => {
  let rand = Math.floor((Math.random() * arr.length) + 0)
  let colorRand = Math.floor((Math.random() * colorArr.length) + 0)
  if (childNodes.length === 0) {
    clearInterval(colorSwitchInterval)
  } else {
    arr[rand].style.background = colorArr[colorRand]
  }
}

// Init click handler function on the parent element so it saves after we remove the child nodes during reset of the game.
const clickHandler = (e) => {
  if (e.target.matches('.unmatched-card') && counter < 2 && previousTarget != e.target) {

    ++counter
    ++tries
    topHeader.textContent = 'Pick another card..'
    e.target.textContent = e.target.dataset.value
    pickedCards.push(parseInt(e.target.dataset.value))

    clickCounter.textContent = `You have clicked ${tries} times.`

    if (counter == 2 && !cardsMatch(pickedCards)) {
      topHeader.textContent = 'Seriously?'
      setTimeout(() => {
        clearCards(childNodes)
        counter = 0
      }, 500)
    } else if (cardsMatch(pickedCards)) {

      topHeader.textContent = 'Well done!'
      setTimeout(() => {
        matchedPairs.unshift(pickedCards)
        // We run the function twice to remove both cards in the matching pair from our main array.
        removeMatches(childNodes)
        removeMatches(childNodes)
        clearCards(childNodes)
        counter = 0
        pickedCardsClassList = []
      }, 500)

      if (childNodes.length <= 2) {
        setTimeout(() => {
          win.style.display = 'block'
          topHeader.textContent = 'You win!!'
          saveHighScoreButton.style.display = 'block'
        }, 500)
        setTimeout(() => {
          win.style.display = 'none'
        }, 5000)
      }
    }
    previousTarget = e.target
  }
}

// Assign click handler to the parent element.
cardContainer.addEventListener('click', clickHandler)

// Function for resetting the game
const resetGame = (pickedLevel) => {

  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.childNodes[0])
  }

  counter = 0
  tries = 0

  if (pickedCards.length > 0) pickedCards.shift()

  if (matchedPairs.length > 0) {
    matchedPairs[0].splice(0, matchedPairs[0].length)
    matchedPairs.shift()
  }

  topHeader.textContent = 'Game was reset.'
  clickCounter.textContent = 'Pick a card to start the counter'
  clearInterval(shuffleTheCards)
  sortedArr = generateRandomNumb(pickedLevel)
  assignValuesToCards(sortedArr)
  clearCards(childNodes)
}

resetButton.addEventListener('click', () => {
  resetGame(userPickedLevel)
  // Reassign the nodes again.
  childNodes = [...document.querySelectorAll('.card-container > div')]
})

home.addEventListener('click', () => {
  window.location.reload()
})

const initGame = (pickedLevel) => {
  sortedArr = generateRandomNumb(pickedLevel)
  userPickedLevel = pickedLevel
  assignValuesToCards(sortedArr)
  childNodes = [...document.querySelectorAll('.card-container > div')]
  clickCounter.textContent = "Let's play!"
  player = prompt('Enter your name!')
}

const swapButtons = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (i === 0 || i === 5) {
      arr[i].style.display = 'block'
    } else {
      arr[i].style.display = 'none'
    }
  }
}

easy.addEventListener('click', () => {
  activeLevelToSave = 'easy'
  initGame(levelsObject.easy.array)
  swapButtons(levels)
})
medium.addEventListener('click', () => {
  activeLevelToSave = 'medium'
  initGame(levelsObject.medium.array)
  swapButtons(levels)
})
hard.addEventListener('click', () => {
  activeLevelToSave = 'hard'
  initGame(levelsObject.hard.array)
  swapButtons(levels)
})
redonk.addEventListener('click', () => {
  activeLevelToSave = 'redonk'
  initGame(levelsObject.redonk.array)
  swapButtons(levels)
  const nyan = new Audio('../assets/nyan.mp3')
  nyan.play().loop = true
  body.classList.add('redonk-bg')
  topHeader.style.color = 'lime'
  clickCounter.style.color = 'lime'

  // This might bug out. COME BACK HERE!
  colorSwitchInterval = setInterval(() => {
    redonkColorSwitch(childNodes, redonkColorArray)
  }, 10)
  // ***********************************
  shuffleTheCards = setInterval(() => {
    redonkRandomizer(childNodes)
  }, 20000)
  setInterval(() => {
    redonkRandomizer(childNodes)
  }, 120000)
})

const saveNewPlayerHighscore = (player, score, level) => {
  let userData = {
    player: player,
    score: score,
    level: level
  }
  return fetch('/db', {
      method: 'POST',
      mode: "cors",
      body: JSON.stringify(userData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(function(response) {
      if (response.status >= 400) {
        console.log('Something went wrong when saving you score to the database.')
        highscoreMessage.style.display = 'flex'
        highscoreMessage.style.background = 'tomato'
        highscoreMessage.textContent = 'Something went wrong when saving you score to the database.'
      } else {
        return response.json()
      }
    })
    .then(function(message) {
      highscoreMessage.style.display = 'flex'
      highscoreMessage.textContent = JSON.stringify(message.successMessage)
      setTimeout(() => {
        highscoreMessage.style.display = 'none'
      }, 2000)
    })
}

saveHighScoreButton.addEventListener('click', () => {
  saveNewPlayerHighscore(player, tries, activeLevelToSave)
})
