const cardContainer = document.querySelector('.card-container')

arrayOfCards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]

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

const sortedArr = generateRandomNumb(arrayOfCards)

const assignValuesToCards = (array) => {
	array.forEach((num) => {
		let card = document.createElement('div')
		card.classList.add('card')
		card.dataset.value = num
		cardContainer.appendChild(card)
	})
}
assignValuesToCards(sortedArr)

const cards = [...document.querySelectorAll('.card')]

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

let counter = 0
let pickedCards = []
const matchedPairs = []

cards.forEach((card) => {
	card.dataset.value = parseInt(card.dataset.value)
	card.addEventListener('click', () => {
		card.textContent = card.dataset.value
		pickedCards.push(parseInt(card.dataset.value))
		++counter
		if(counter == 2 && !cardsMatch(pickedCards)) {
			console.log(pickedCards)
			setTimeout(() => {
				clearCards(cards)
				counter = 0
			}, 500);
		} else if(cardsMatch(pickedCards)) {
			setTimeout(() => {
				matchedPairs.unshift(pickedCards)
				console.log(matchedPairs)
				removeMatches(cards)
				removeMatches(cards)
				clearCards(cards)
				counter = 0
				cards.forEach(card => console.log(card))
			}, 500);
		}
	})
})
