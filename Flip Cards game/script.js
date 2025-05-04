const gameBoard = document.getElementById("game-board");
const resetButton = document.getElementById("reset-btn");
const exploitButton = document.getElementById("exploit-btn");

const cards = [
    { id: 1, value: 'A', matched: false },
    { id: 2, value: 'K', matched: false },
    { id: 3, value: 'A', matched: false },
    { id: 4, value: 'K', matched: false },
    { id: 5, value: 'Q', matched: false },
    { id: 6, value: 'J', matched: false },
    { id: 7, value: 'Q', matched: false },
    { id: 8, value: 'J', matched: false },
    { id: 9, value: '10', matched: false },
    { id: 10, value: '9', matched: false },
    { id: 11, value: '10', matched: false },
    { id: 12, value: '9', matched: false }
];

let flippedCards = [];
let matchedCards = [];

// Shuffle function (Fisher-Yates Shuffle)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create the cards on the board
function createBoard() {
    shuffle(cards);
    gameBoard.innerHTML = ''; // Clear any existing cards
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.dataset.value = card.value;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Flip a card
function flipCard(e) {
    const clickedCard = e.target;
    if (flippedCards.length < 2 && !clickedCard.classList.contains('flipped') && !clickedCard.classList.contains('matched')) {
        clickedCard.classList.add('flipped');
        clickedCard.textContent = clickedCard.dataset.value;
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Check if the two flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        // Cards match
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
    } else {
        // Cards do not match, flip back after a short delay
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }
    flippedCards = [];
}

// Reset the game
resetButton.addEventListener('click', () => {
    flippedCards = [];
    matchedCards = [];
    cards.forEach(card => card.matched = false);
    createBoard();
});

// Exploit the game: Make all cards matched
exploitButton.addEventListener('click', () => {
    // Set all cards to "matched" and re-render
    cards.forEach(card => card.matched = true);
    renderGame();  // Call render function to apply changes visually
});

// Render the game with the updated state
function renderGame() {
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach((cardElement, index) => {
        if (cards[index].matched) {
            cardElement.classList.add('matched');
            cardElement.textContent = cards[index].value;
        } else {
            cardElement.classList.remove('matched');
            cardElement.textContent = '';
        }
    });
}

// Initialize the game
createBoard();
