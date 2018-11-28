const body = document.body
const cardContainer = document.querySelector('.card-container')
const goblin = document.querySelector('.goblin')
const win = document.querySelector('.win')
const clickCounter = document.querySelector('.click-counter')
const topHeader = document.querySelector('.top-header')
const resetButton = document.querySelector('.reset-button')
let childNodes
let sortedArr
let userPickedLevel
const levels = [...document.querySelectorAll('button')]
const easy = document.querySelector('.easy-button')
const medium = document.querySelector('.medium-button')
const hard = document.querySelector('.hard-button')
const redonk = document.querySelector('.redonk-button')
const home = document.querySelector('.home-button')
const saveHighScoreButton = document.querySelector('.save-button')
let easyArrayOfCards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
let mediumArrayOfCards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12]
let hardArrayOfCards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16]
let redonkArrayOfCards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16]
const redonkColorArray = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#f1c40f', '#e67e22', '#e74c3c']

const player = prompt('Enter your name!')

let counter = 0
let tries = 0
let previousTarget = 0
let pickedCards = []
const matchedPairs = []

function generateRandomNumb(array) {
	let numLeft = array.length
	let trade
	let currIndex
	
	while(numLeft) {
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
	if(first === second) {
		return true
	}
	return false
}

const removeMatches = (arr) => {
	let matched = arr.map(function(item) { 
		return parseInt(item.dataset.value)
	}).indexOf(matchedPairs[0][0])
	arr.splice(matched, 1)
	return arr
}

// Shuffle the values of the cards in live game.
const redonkRandomizer = (arr) => {
	let rand = Math.floor((Math.random() * arr.length ) + 0)
	generateRandomNumb(arr)
	arr.forEach((card) => {
		const newNum = arr[rand].dataset.value;
		const replaceNum = card.dataset.value;
		// Swap values of cards.
		card.dataset.value = newNum;
		arr[rand].dataset.value = replaceNum;

	})
	const gnome = new Audio('../assets/gnome.mp3')
	goblin.classList.add('visible')
	gnome.play()
	setTimeout(() => {
		goblin.classList.remove('visible')
	}, 2500)
}

const redonkColorSwitch = (arr, colorArr) => {
	let rand = Math.floor((Math.random() * arr.length ) + 0)
	let colorRand = Math.floor((Math.random() * colorArr.length ) + 0)
	arr[rand].style.background = colorArr[colorRand]
}

// Init click handler function on the parent element so it saves after we remove the child nodes during reset of the game.
const clickHandler = (e) => {
	if(e.target.matches('.card') && counter < 2 && previousTarget != e.target) {

		++counter
		++tries
		topHeader.textContent = 'Pick another card..'
		e.target.textContent = e.target.dataset.value
		pickedCards.push(parseInt(e.target.dataset.value))
	
		clickCounter.textContent = `You have clicked ${tries} times.`

		if(counter == 2 && !cardsMatch(pickedCards)) {
			topHeader.textContent = 'Seriously?'
			setTimeout(() => {
				clearCards(childNodes)
				counter = 0
			}, 500)
		}
		else if(cardsMatch(pickedCards)) {

			topHeader.textContent = 'Well done!'
			setTimeout(() => {
				matchedPairs.unshift(pickedCards)
				// We run the function twice to remove both cards in the matching pair from our main array.
				removeMatches(childNodes)
				removeMatches(childNodes)
				clearCards(childNodes)
				counter = 0
			}, 500)

			if(childNodes.length <= 2) {
				setTimeout(() => {
					win.style.display = 'block'
					topHeader.textContent = 'You win!!'
					saveHighScoreButton.style.display = 'block'
				}, 500)
				setTimeout(() => {
					win.style.display = 'none'
				}, 5000 )
			}
		}
		previousTarget = e.target
	}
}

// Assign click handler to the parent element.
cardContainer.addEventListener('click', clickHandler)

// Function for resetting the game
const resetGame = (pickedLevel) => {

	while(cardContainer.firstChild){
		cardContainer.removeChild(cardContainer.childNodes[0])
	}

	counter = 0
	tries = 0

	if(pickedCards.length > 0) pickedCards.shift()

	if(matchedPairs.length > 0) {
		matchedPairs[0].splice(0, matchedPairs[0].length)
		matchedPairs.shift()
	}

	topHeader.textContent = 'Game was reset.'
	clickCounter.textContent = 'Pick a card to start the counter'
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
}


easy.addEventListener('click', () => {
	initGame(easyArrayOfCards)
	levels[0].style.display = 'block';
	levels[1].style.display = 'none';
	levels[2].style.display = 'none';
	levels[3].style.display = 'none';
	levels[4].style.display = 'none';
	levels[5].style.display = 'block';
})
medium.addEventListener('click', () => {
	initGame(mediumArrayOfCards)
	levels[0].style.display = 'block';
	levels[1].style.display = 'none';
	levels[2].style.display = 'none';
	levels[3].style.display = 'none';
	levels[4].style.display = 'none';
	levels[5].style.display = 'block';
})
hard.addEventListener('click', () => {
	initGame(hardArrayOfCards)
	levels[0].style.display = 'block';
	levels[1].style.display = 'none';
	levels[2].style.display = 'none';
	levels[3].style.display = 'none';
	levels[4].style.display = 'none';
	levels[5].style.display = 'block';
})
redonk.addEventListener('click', () => {
	initGame(redonkArrayOfCards)
	levels[0].style.display = 'block';
	levels[1].style.display = 'none';
	levels[2].style.display = 'none';
	levels[3].style.display = 'none';
	levels[4].style.display = 'none';
	levels[5].style.display = 'block';
	const nyan = new Audio('../assets/nyan.mp3')
	nyan.play().loop = true
	body.classList.add('redonk-bg')
	topHeader.style.color = 'lime'
	clickCounter.style.color = 'lime'
	setInterval(() => {
		redonkColorSwitch(childNodes, redonkColorArray)
	}, 10);
	setInterval(() => {
		redonkRandomizer(childNodes)
	}, 20000)
	setInterval(() => {
		redonkRandomizer(childNodes)
	}, 120000)
})



const saveNewHighscore = (player, score) => {
	let userData = {
    player: player,
    score: score
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
	.then((response) => console.log(response))
}

saveHighScoreButton.addEventListener('click', () => {
	saveNewHighscore(player, tries)
})