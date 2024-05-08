const main = document.querySelector('main');
const startButton = document.querySelector('.start-button');
const gameBoard = document.querySelector('.game-board');
const scoreBoard = document.querySelector('.score-board');
const timerBoard = document.querySelector('.timer-board');
const countBoard = document.querySelector('.count-board');

startButton.addEventListener('click', startGame);
scoreBoard.style.display = 'none';

let selectArr = [];
let arrayCnt = 0;
let number = 0;

while(selectArr.length < 16) {
  number = Math.floor(Math.random() * (8 - 0)) + 0;
  if(arrayCnt === 0) {
    selectArr[arrayCnt] = number;
    arrayCnt++;
  } else {
    let cnt = 0;
    for(let i = 0; i < selectArr.length; i++) {
      if(selectArr[i] == number){
        cnt++;
      }
    }
    if(cnt < 2){
      selectArr[arrayCnt] = number;
      arrayCnt++;
    }
  }
}

let count = 8;
let timerid;

function startGame() {
  // 시작
  if(startButton.textContent === '시작') {
    const mainImage = document.querySelector('.main-image');

    startButton.textContent = '재시작';
    mainImage.style.display = 'none';
    scoreBoard.style.display = 'flex';

    let time = 25;
    timerBoard.textContent = time + '초';

    timerid = setInterval(()=> timer(--time), 1000);
    function timer(time) {
      if(time >= 0) {
        timerBoard.textContent = time + '초';
      } else {
        clearInterval(timerid);

        gameBoard.innerHTML = '<img class="main-image" src="bgs/lose-bg1.jpg"/>';
      }
    };

    score(count);
    function score(count) {
      countBoard.textContent = count + '명';
    }

    for(let i = 1; i <= 16; i++) {
      const div = document.createElement('div');
      let html = "";
      gameBoard.append(div);
      div.classList.add('item' + i, 'select');
      const item = document.querySelector('.item' + i)
      html += "<div class='front'><img class='item-iamge' src='bgs/square-bg.jpg'/></div>";
      html += "<div class='back'>"
      if(selectArr[i - 1] === 0) { html += "<img id='choiImg' class='choi" + 1 + "' src='imgs/01.jpg' />" }
      else if(selectArr[i - 1] === 1) { html += "<img id='choiImg' class='choi" + 2 + "' src='imgs/02.jpg' />" }
      else if(selectArr[i - 1] === 2) { html += "<img id='choiImg' class='choi" + 3 + "' src='imgs/03.jpg' />" }
      else if(selectArr[i - 1] === 3) { html += "<img id='choiImg' class='choi" + 4 + "' src='imgs/04.jpg' />" }
      else if(selectArr[i - 1] === 4) { html += "<img id='choiImg' class='choi" + 5 + "' src='imgs/05.jpg' />" }
      else if(selectArr[i - 1] === 5) { html += "<img id='choiImg' class='choi" + 6 + "' src='imgs/06.jpg' />" }
      else if(selectArr[i - 1] === 6) { html += "<img id='choiImg' class='choi" + 7 + "' src='imgs/07.jpg' />" }
      else if(selectArr[i - 1] === 7) { html += "<img id='choiImg' class='choi" + 8 + "' src='imgs/08.jpg' />" }
      html += "</div>";

      item.innerHTML = html;
    }
  }
  // 재시작
  else {
    const mainImage = document.querySelector('.main-image');

    startButton.textContent = '시작';
    mainImage.style.display = 'block';
    scoreBoard.style.display = 'none';
    clearInterval(timerid);

    gameBoard.innerHTML = '<img class="main-image" src="bgs/bg.png"/>';
  }
}

gameBoard.addEventListener('click', checkImage);

let checkCount = 0;
let firstCheck;
let secondCheck;

function checkImage(e) {
  const coverImg = e.target.className;
  if(coverImg === 'item-iamge') {

    if(checkCount === 0) {
      firstCheck = e.target.parentElement.nextElementSibling.children[0].className;
      firstImg = e.target.parentElement;
      firstImg.classList.toggle('flip');

      checkCount++;
    } else if(checkCount === 1) {
      secondCheck = e.target.parentElement.nextElementSibling.children[0].className;
      secondImg = e.target.parentElement;
      secondImg.classList.toggle('flip');

      if(firstCheck !== secondCheck) {
        checkCount = 0;
        setTimeout(() => recover(firstImg, secondImg), 300);
      }
      else {
        const afterScore = Number(countBoard.textContent[0]) - 1;
        countBoard.textContent = afterScore + '명';
        if(afterScore === 0) {
          clearInterval(timerid);

          gameBoard.innerHTML = '<img class="main-image" src="bgs/win-bg1.jpg"/>';
        }

        checkCount = 0;
      }
    }
  }
}

function recover(firstImg, secondImg) {
  firstImg.classList.remove('flip');
  secondImg.classList.remove('flip');
}
