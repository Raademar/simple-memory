const body = document.body
const cardContainer = document.querySelector('.card-container')
const goblin = document.querySelector('.goblin')
const clickCounter = document.querySelector('.click-counter')
const topHeader = document.querySelector('.top-header')
const resetButton = document.querySelector('.reset-button')
let childNodes
let sortedArr
const levels = [...document.querySelectorAll('button')]
const easy = document.querySelector('.easy-button')
const medium = document.querySelector('.medium-button')
const hard = document.querySelector('.hard-button')
const redonk = document.querySelector('.redonk-button')
let easyArrayOfCards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
let mediumArrayOfCards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12]
let hardArrayOfCards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16]
let redonkArrayOfCards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16]

let counter = 0
let tries = 0
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


	

// ***TODO*** IMPLEMENT LEVEL LOGIC

// ***REDONK MODE ***



// ******************


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

const redonkRandomizer = (arr) => {
	let rand = Math.floor((Math.random() * arr.length ) + 0)
	generateRandomNumb(arr)
	arr.forEach((num) => {
		const newNum = arr[rand].dataset.value;
		const replaceNum = num.dataset.value;

		num.dataset.value = newNum;
		arr[rand].dataset.value = replaceNum;

		
	})
	const gnome = new Audio('gnome.mp3')
	goblin.classList.add('visible')
	gnome.play()
	setTimeout(() => {
		goblin.classList.remove('visible')
	}, 2500)
}

// Init click handler function on the parent element so it saves after we remove the child nodes during reset of the game.
const clickHandler = (e) => {
	if(e.target.matches('.card')) {

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
					topHeader.textContent = 'You win!!'
				}, 500)
			}
		}
	}
}

// Assign click handler to the parent element.
cardContainer.addEventListener('click', clickHandler)

// Function for resetting the game
const resetGame = () => {

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
	sortedArr = generateRandomNumb(mediumArrayOfCards)
	assignValuesToCards(sortedArr)
	clearCards(childNodes)
}

resetButton.addEventListener('click', () => {
	resetGame()
	// Reassign the nodes again.
	childNodes = [...document.querySelectorAll('.card-container > div')]
})


const initGame = (pickedLevel) => {
	sortedArr = generateRandomNumb(pickedLevel)
	assignValuesToCards(sortedArr)
	childNodes = [...document.querySelectorAll('.card-container > div')]
	clickCounter.textContent = "Let's play!"
}


easy.addEventListener('click', () => {
	initGame(easyArrayOfCards)
})
medium.addEventListener('click', () => {
	initGame(mediumArrayOfCards)
})
hard.addEventListener('click', () => {
	initGame(hardArrayOfCards)
})
redonk.addEventListener('click', () => {
	initGame(redonkArrayOfCards)
	body.classList.add('redonk-bg')
	topHeader.style.color = 'lime'
	clickCounter.style.color = 'lime'

	setInterval(() => {
		redonkRandomizer(childNodes)
	}, 10000)
	setInterval(() => {
		generateRandomNumb(sortedArr)
	}, 120000);
})

