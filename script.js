'use strict';

// Button DOM
const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// Dice DOM
const dice = document.querySelector('.dice');

// Player and current score DOM
const players = document.querySelectorAll('.player');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const scorePlayer1 = document.querySelector('#current--0');
const scorePlayer2 = document.querySelector('#current--1');

// Player total score DOM
const player1TotalScore = document.querySelector('#score--0');
const player2TotalScore = document.querySelector('#score--1');

// Current score DOM
const currentScores = document.querySelectorAll('.current-score');
const totalScores = document.querySelectorAll('.score');

// Function to generate random dice roll
let randomNum = function () {
  return Math.trunc(Math.random() * 6 + 1);
};

// Function to switch player
const switchPlayer = function (players) {
  for (let i = 0; i < players.length; i++) {
    if (!players[i].classList.contains('player--active')) {
      players[i].classList.add('player--active');
    } else {
      players[i].classList.remove('player--active');
    }
  }
};

// Function to reset current score
const resetCurrentScore = function () {
  for (let i = 0; i < currentScores.length; i++) {
    currentScores[i].textContent = '0';
  }
};

// Function to reset total score
const resetTotalScore = function () {
  for (let i = 0; i < totalScores.length; i++) {
    totalScores[i].textContent = '0';
  }
};

// Roll dice function
const rollDice = function () {
  let randomDice = randomNum();
  dice.classList.remove('hidden');
  dice.setAttribute('src', `dice-${randomDice}.png`);
  if (randomDice > 1) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].classList.contains('player--active')) {
        let currentScoreField = document.querySelector(`#current--${i}`);
        let currentScore = Number(currentScoreField.textContent);
        currentScoreField.textContent = currentScore += randomDice;
      }
    }
  } else {
    switchPlayer(players);
    resetCurrentScore();
  }
};

// Hold / store current score function
const holdScore = function () {
  for (let i = 0; i < players.length; i++) {
    if (players[i].classList.contains('player--active')) {
      let currentScoreField = document.querySelector(`#current--${i}`);
      let currentScore = Number(currentScoreField.textContent);
      let totalScoreField = document.querySelector(`#score--${i}`);
      let totalScore = Number(totalScoreField.textContent);
      totalScoreField.textContent = totalScore + currentScore;

      if (Number(totalScoreField.textContent) >= 100) {
        players[i].classList.add('player--winner');
        rollBtn.removeEventListener('click', rollDice);
        holdBtn.removeEventListener('click', holdScore);
      }
    }
  }

  switchPlayer(players);
  resetCurrentScore();
};

// To restart the game
const newGame = function () {
  console.log('new game!');
  for (let i = 0; i < players.length; i++) {
    if (players[i].classList.contains('player--winner')) {
      players[i].classList.remove('player--winner');
    }

    if (players[i].classList.contains('player--active')) {
      players[i].classList.remove('player--active');
      players[0].classList.add('player--active');
    }
  }
  resetCurrentScore();
  resetTotalScore();
};

// When roll dice button clicked
rollBtn.addEventListener('click', rollDice);

// When hold button is clicked
holdBtn.addEventListener('click', holdScore);

// When new game button is clicked
newGameBtn.addEventListener('click', newGame);
