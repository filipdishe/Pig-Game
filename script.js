'use strict';

// Selections
// Buttons
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// Elements
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

// Starting points
let curScore = 0;
let activePlayer = 0;
score0El.textContent = 0;
score1El.textContent = 0;
const scores = [0, 0];
let dice;
let playing = true;

diceEl.style.opacity = '0';

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.style.opacity = '1';
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      curScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        curScore;
    } else {
      curScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        curScore;

      // Switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.Adding current score to the score of user!
    scores[activePlayer] += curScore;
    const scoreEl = document.getElementById(`score--${activePlayer}`);
    scoreEl.textContent = scores[activePlayer];
    curScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = curScore;

    if (scores[activePlayer] >= 20) {
      playing = false;

      // 1.Removing the diceEl
      diceEl.style.opacity = '0';

      // 2.Adding winner class to the active player
      const activePlayerEl = document.querySelector(`.player--${activePlayer}`);
      console.log(activePlayerEl);
      activePlayerEl.classList.add('player--winner');
      activePlayerEl.classList.remove('player--active');

      // 2. Disable roll dice button and hold button
    } else {
      // 2.Switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  // 1. Set the game to play
  playing = true;

  // 2. Manipulating DOM classes
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');

  // 3. Set the player1 to be current player
  activePlayer = 0;

  // 4.Set scores to 0
  scores[0] = 0;
  scores[1] = 0;
  curScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
});
