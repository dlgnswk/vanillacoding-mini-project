const startButton = document.querySelector('.start-button');
const gameBoard = document.querySelector('.game-board');
const scoreBoard = document.querySelector('.score-board');
const countBoard = document.querySelector('.count-board');

scoreBoard.style.display = 'none';

startButton.addEventListener('click', () => {
  checkButtonText() === 'start' ? startgame() : resetGame();
});

function startgame() {
  changeButtonText();
  makeGameBoard();
  showScoreBoard();
  setTimer();
  setCount();
}

function changeButtonText() {
  startButton.textContent = startButton.textContent === 'start' ? 'retry' : 'start';
}

function makeGameBoard() {
  const mainImage = document.querySelector('.main-image');
  mainImage.style.display = 'none';

  const selectArr = [];
  let arrayCnt = 0;
  let number = 0;

  while (selectArr.length < 16) {
    number = Math.floor(Math.random() * (8 - 0)) + 0;
    if (arrayCnt === 0) {
      selectArr[arrayCnt] = number;
      arrayCnt++;
    } else {
      let cnt = 0;
      for (let i = 0; i < selectArr.length; i++) {
        if (selectArr[i] == number){
          cnt++;
        }
      }
      if (cnt < 2){
        selectArr[arrayCnt] = number;
        arrayCnt++;
      }
    }
  }

  for (let i = 0; i < selectArr.length; i++) {
    const gameBoard = document.querySelector('.game-board');
    const imagesBoxElement = document.createElement('div');
    const coverImageElement = document.createElement('div');
    const flipImageElement = document.createElement('div');
    const coverImage = document.createElement('img');
    const flipImage = document.createElement('img');

    gameBoard.appendChild(imagesBoxElement);
    imagesBoxElement.appendChild(coverImageElement);
    imagesBoxElement.appendChild(flipImageElement);

    imagesBoxElement.classList.add('images-box');
    coverImageElement.classList.add('cover-image-box');
    flipImageElement.classList.add('flip-image-box');

    flipImageElement.dataset.itemValue = selectArr[i];

    coverImageElement.append(coverImage);
    flipImageElement.append(flipImage);

    coverImage.classList.add('cover-image');
    coverImage.src = `bgs/square-bg.jpg`
    flipImage.classList.add('flip-image');
    flipImage.src = `imgs/0${selectArr[i] + 1}.jpg`
  }
}

function showScoreBoard() {
  const scoreBoard = document.querySelector('.score-board');
  scoreBoard.style.display = 'flex';
}

function setTimer() {
  const timerBoard = document.querySelector('.timer-board');
  const inputTimerId = document.querySelector('.invisible-timer');
  let time = 25;

  timerBoard.textContent = time + 'sec';

  const timerId = setInterval(() => timer(--time), 1000);
  inputTimerId.value = timerId;

  function timer(time) {
    if (time >= 0) {
      timerBoard.textContent = time + 'sec';
    } else {
      clearInterval(timerId);

      gameBoard.innerHTML = '<img class="main-image" src="bgs/lose-bg1.jpg"/>';
    }
  }
}

function setCount() {
  let count = 8;
  countBoard.textContent = `${count} man`;
}

function resetGame() {
  const startButton = document.querySelector('.start-button');
  const mainImage = document.querySelector('.main-image');
  const scoreBoard = document.querySelector('.score-board');
  const inputTimerId = document.querySelector('.invisible-timer');

  startButton.textContent = 'start';
  mainImage.style.display = 'block';
  scoreBoard.style.display = 'none';
  clearInterval(inputTimerId.value);

  gameBoard.innerHTML = '<img class="main-image" src="bgs/bg.png"/>';
}

function checkButtonText() {
  const buttonText = startButton.textContent === 'start' ? 'start' : 'retry';
  return buttonText;
}


gameBoard.addEventListener('click', (e) => {
  checkImage(e)
});

let checkCount = 0;
let firstCoverImage = '';
let secondCoverImage = '';
let firstCheck = '';
let secondCheck = '';

function checkImage(e) {
  if (e.target.parentElement.parentElement.className === 'images-box' && e.target.className !== 'flip-image') {
    if (checkCount === 0) {
      firstCheck = e.target.parentElement.nextElementSibling.dataset.itemValue;
      firstCoverImage = e.target;
      firstCoverImage.classList.add('flip');

      checkCount++;

    } else {
      secondCheck = e.target.parentElement.nextElementSibling.dataset.itemValue;
      secondCoverImage = e.target;
      secondCoverImage.classList.add('flip');

      if (firstCheck === secondCheck) {
        const countBoard = document.querySelector('.count-board');
        const afterScore = Number(countBoard.textContent[0]) - 1;

        countBoard.textContent = afterScore + ' man';

        if (afterScore === 0) {
          const inputTimerId = document.querySelector('.invisible-timer');

          clearInterval(inputTimerId.value);

          gameBoard.innerHTML = '<img class="main-image" src="bgs/win-bg1.jpg"/>';
        }

        checkCount = 0;
      } else {
        checkCount = 0;

        setTimeout(() => {
          firstCoverImage.classList.remove('flip');
          secondCoverImage.classList.remove('flip');
        }, 300);
      }
    }
  }
}
