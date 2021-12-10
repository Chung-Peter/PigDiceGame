'use strict';

/*
// Player1
// .player--0 player--active
const player0El = document.querySelector('.player--0');
// total score held in #score--0
const score0El = document.getElementById('score--0'); //when selecting an id, it's faster than querySelector('#id')
// current score: #current--0
// const current0El = document.querySelector('#current--0');

// Player2
const player1El = document.querySelector('.player--1');
// total score held in #score--1
const score1El = document.getElementById('score--1');
// current score: #current--0
// const current1El = document.getElementById('current--1');
// console.log(player0El, player1El);
*/

// Instead of storing the elements in separate variables, save them in an array for easier access
const playersEl = [
  document.querySelector('.player--0'),
  document.querySelector('.player--1'),
];
const scoresEl = [
  document.querySelector('#score--0'),
  document.querySelector('#score--1'),
];
const currentsEl = [
  document.querySelector('#current--0'),
  document.querySelector('#current--1'),
];
// console.log(playersEl, scoresEl);

// dice displayed .dice
const diceImg = document.querySelector('.dice');
// console.log(diceImg);

// New Game buttom: .btn--new
const newGameBtn = document.querySelector('.btn--new');
// Roll Dice button: .btn--roll
const rollDiceBtn = document.querySelector('.btn--roll');
// Hold button: .btn--hold
const holdBtn = document.querySelector('.btn--hold');

let dice;
let currentPlayer = 0;
// console.log(currentPlayer, typeof currentPlayer);

// Reset all scores to 0
let scores = [0, 0];
let currents = [0, 0];

let gameOn = false;

const resetGame = function () {
  currentPlayer = 0;
  scores = [0, 0];
  currents = [0, 0];
  //   score0El.textContent = 0;
  //   score1El.textContent = 0;
  //   current0El.textContent = 0;
  //   current1El.textContent =     0;
  for (let i = 0; i < playersEl.length; i++) {
    if (i === currentPlayer) {
      playersEl[i].classList.add(`player--active`);
    } else {
      playersEl[i].classList.remove(`player--active`);
    }
    playersEl[i].classList.remove(`player--winner`);
    scoresEl[i].textContent = scores[i];
    currentsEl[i].textContent = currents[i];
    // console.log(scoresEl);
  }
  // Hide dice
  diceImg.classList.add('hidden');
  gameOn = true;
};

resetGame();

const switchPlayer = function () {
  currentsEl[currentPlayer].textContent = currents[currentPlayer] = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  //   player0El.classList.toggle('player--active');
  //   player1El.classList.toggle('player--active');
  for (let i = 0; i < playersEl.length; i++) {
    playersEl[i].classList.toggle(`player--active`);
  }
};

const rollDice = function () {
  if (gameOn) {
    // Generate random dice roll
    dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dice);
    // Display dice
    //   diceImg.setAttribute('src', `dice-${dice}.png`);
    diceImg.src = `dice-${dice}.png`;
    diceImg.classList.remove('hidden');
    // Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentsEl[currentPlayer].textContent = currents[currentPlayer] += dice;
      //   document.querySelector(`#current--${currentPlayer}`).textContent =
      //     currents[currentPlayer];
    }
    // If rolled 1, switch to next player
    else {
      switchPlayer();
    }
  }
};

rollDiceBtn.addEventListener('click', rollDice);

holdBtn.addEventListener('click', function () {
  if (gameOn) {
    // add current score to total score

    scoresEl[currentPlayer].textContent = scores[currentPlayer] +=
      currents[currentPlayer];

    // Check to see if player won if score >= 100
    if (scores[currentPlayer] >= 100) {
      // Change Player class
      playersEl[currentPlayer].classList.remove('player--active');
      playersEl[currentPlayer].classList.add('player--winner');
      // Disable Roll and Hold buttons
      gameOn = false;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener('click', resetGame);
