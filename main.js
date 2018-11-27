const cardContainer = document.querySelector('.card-container')
const clickCounter = document.querySelector('.click-counter')
const topHeader = document.querySelector('.top-header')
const resetButton = document.querySelector('.reset-button')
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

let sortedArr = generateRandomNumb(easyArrayOfCards)
	

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

assignValuesToCards(sortedArr)

let cards = [...document.querySelectorAll('.card')]

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

let childNodes = [...document.querySelectorAll('.card-container > div')]

// Init click handler function on the parent element so it saves after we remove the child nodes during reset of the game.
const clickHandler = (e) => {
	if(e.target.matches('.card')) {

		topHeader.textContent = 'Pick another card..'
		e.target.textContent = e.target.dataset.value
		pickedCards.push(parseInt(e.target.dataset.value))

		++counter
		++tries
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


