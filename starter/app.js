/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, gamePlaying;
// Get Elements
const scorePlayerOne = document.getElementById("score-0");
const scorePlayerTwo = document.getElementById("score-1");
const currentPlayerOne = document.getElementById("current-0");
const currentPlayerTwo = document.getElementById("current-1");
const newGameButton = document.querySelector(".btn-new");
const rollButton = document.querySelector(".btn-roll");
const holdGameButton = document.querySelector(".btn-hold");
const diceDOM = document.querySelector(".dice");
const activeClassPlayerOne = document.querySelector(".player-0-panel");
const activeClassPlayerTwo = document.querySelector(".player-1-panel");

init();

// Set initial Score to Cero

// Functions
const roll = () => {
  // Random Number
  let diceNumber = Math.floor(Math.random() * 6) + 1;

  // Display the result
  let currentPlayer = document.querySelector("#current-" + activePlayer);
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + diceNumber + ".png";
  console.log(diceNumber);

  // Update the rolled number
  if (diceNumber !== 1) {
    roundScore += diceNumber;
    currentPlayer.textContent = roundScore;
  } else {
    console.log("Other players turn...");
    rollButton.style.display = "none"
    holdGameButton.style.display = "none"

    setTimeout(nextPlayer, 2000)
  }
};

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  diceDOM.style.display = "none";
  scorePlayerOne.textContent = "0";
  scorePlayerTwo.textContent = "0";
  currentPlayerOne.textContent = "0";
  currentPlayerTwo.textContent = "0";
  document.querySelector(`#name-0`).textContent = "Player 1";
  document.querySelector(`#name-1`).textContent = "Player 2";

  document.querySelector('.player-0-panel').classList.remove('winner')
  document.querySelector('.player-1-panel').classList.remove('winner')
  document.querySelector('.player-0-panel').classList.remove('active')
  document.querySelector('.player-1-panel').classList.remove('active')
  document.querySelector('.player-0-panel').classList.add('active')
  
  rollButton.style.display = "block"
  holdGameButton.style.display = "block"
  document.querySelector(`.player-${activePlayer}-panel`).classList.remove("winner");
  console.log("New Game");
}

const holdButton = () => {
  scores[activePlayer] += roundScore;
  if (scores[activePlayer] > 20) {
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
    winner()
  } else {
    if (activePlayer === 0) {
      scorePlayerOne.textContent = scores[activePlayer];
      nextPlayer();
    } else {
      scorePlayerTwo.textContent = scores[activePlayer];
      nextPlayer();
    }
  }
};

const toggleClasses = () => {
  activeClassPlayerOne.classList.toggle("active");
  activeClassPlayerTwo.classList.toggle("active");
};

const nextPlayer = () => {
  rollButton.style.display = "block"
  holdGameButton.style.display = "block"
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  currentPlayerOne.textContent = "0";
  currentPlayerTwo.textContent = "0";
  toggleClasses();
  diceDOM.style.display = "none";
};

const winner = () => {
  if (scores[activePlayer] >= 20) {
    console.log("there is a winner...");
    document.querySelector(`.player-${activePlayer}-panel`).classList.add("winner");
    activeClassPlayerOne.classList.remove("active")
    activeClassPlayerTwo.classList.remove("active")
    document.querySelector(`#name-${activePlayer}`).textContent = "Winner!!!";
    diceDOM.style.display = "none"
    rollButton.style.display = "none"
    holdGameButton.style.display = "none"
  }
};

// Listeners
rollButton.addEventListener("click", roll);
newGameButton.addEventListener("click", init);
holdGameButton.addEventListener("click", holdButton);
