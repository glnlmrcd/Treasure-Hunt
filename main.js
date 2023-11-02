var score1 = document.querySelector("#score1");
var score2 = document.querySelector("#score2");

var nCorrect = -1; // Initialize the correct image index
var nScore1 = 0;
var nScore2 = 0;

var aImages = document.querySelectorAll(".image");
var hiddenImage = -1; // Initialize hiddenImage
var remainingTries = 3; // Set the number of remaining tries
var gameOver = false;
var round = 1;
var roundFinished = false;

var cRound = document.querySelector("#cRound");
var result = document.querySelector("#result");

aImages.forEach((image, index) => {
  if (round === 1 || round === 2) {
    result.innerHTML = 'Player 1, hide the treasure!';
  } else if (round === 3 || round === 4) {
    result.innerHTML = 'Player 2, hide the treasure!';
  }

  image.addEventListener('click', () => {
    if (!gameOver && hiddenImage === -1) {
      image.classList.add('hidden');
      hiddenImage = index;
      nCorrect = index + 1; // Set the correct image index

      if (round === 1 || round === 2) {
        result.innerHTML = 'Player 2, start guessing!';
      } else if (round === 3 || round === 4) {
        result.innerHTML = 'Player 1, start guessing!';
      }
    } else if (!gameOver && hiddenImage !== -1 && remainingTries > 0 && !image.getAttribute('data-guessed')) {
      guessImage(index);
    }
  });
});

function guessImage(index) {
  if (nCorrect === index + 1) {
    document.querySelector(`#image${index + 1}`).src = "right.jpg";
    if (round === 1 || round === 2) {
      player2EarnsPoint();
    } else if (round === 3 || round === 4) {
      player1EarnsPoint();
    }
    window.setTimeout(function() {
      alert("Correct guess!");
      resetGame();
    }, 300);
  } else {
    document.querySelector(`#image${index + 1}`).src = "wrong.jpg";
    remainingTries--;
    window.setTimeout(function() {
      if (remainingTries === 0) {
        if (round === 1 || round === 2) {
          player1EarnsPoint();
        } else if (round === 3 || round === 4) {
          player2EarnsPoint();
        }

        if (round === 1) {
          gameOver = true;
          showCorrectImage();
          window.setTimeout(function() {
            alert("Wrong! End of round 1!");
            resetGame();
            startRound2();
          }, 300);
        } else if (round === 2) {
          gameOver = true;
          showCorrectImage();
          window.setTimeout(function() {
            alert("Wrong! End of round 2!");
            resetGame();
            startRound3();
          }, 300);
        } else if (round === 3) {
          gameOver = true;
          showCorrectImage();
          window.setTimeout(function() {
            alert("Wrong! End of round 3!");
            resetGame();
            startRound4();
          }, 300);
        } else {
          endGame();
        }
      } else {
        alert("Wrong guess! " + remainingTries + " left.");
        markGuessed(index);
      }
    }, 300);
  }
}

function player1EarnsPoint() {
  nScore1++;
  score1.innerHTML = nScore1;
}

function player2EarnsPoint() {
  nScore2++;
  score2.innerHTML = nScore2;
}

function endGame() {
  showCorrectImage();
  window.setTimeout(function() {
    if (nScore1 > nScore2) {
      alert("Congratulations! Player 1 won!");
    } else if (nScore2 > nScore1) {
      alert("Congratulations! Player 2 won!");
    } else {
      alert("Congratulations! It's a tie! ");
    }
  }, 300);
}

function showCorrectImage() {
  document.querySelector('#image' + nCorrect).src = "right.jpg";
}

function resetGame() {
  aImages.forEach((image) => {
    image.classList.remove('hidden');
    image.removeAttribute('data-guessed');
    image.src = "blank.jpg";
  });
  hiddenImage = -1;
  remainingTries = 3;
  gameOver = false;

  if (round === 1) {
    round++;
    result.innerHTML = 'Player 1, hide the treasure!';
    cRound.innerHTML = "Round 2";
  } else if (round === 2) {
    round++;
    result.innerHTML = 'Player 2, hide the treasure!';
    cRound.innerHTML = "Round 3";
  } else if (round === 3) {
    round++;
    result.innerHTML = 'Player 2, hide the treasure!';
    cRound.innerHTML = "Round 4";
  } else if (round === 4) {
    roundFinished = true;
    endGame();
  } else {
    result.innerHTML = 'Player 1, hide the treasure!';
    cRound.innerHTML = "Round 1";
  }
}


function startRound2() {
  round = 2;
}

function startRound3() {
  round = 3;
}

function startRound4() {
  round = 4;
}

var restartBtn = document.querySelector("#restartGame");

restartBtn.onclick = function() {
  location.reload()
}