7; //console.log('teste')

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;
let appleX = 5;
let appleY = 5;
const snakeParts = [];

let tailLength = 2;

let xVelocidade = 0;
let yVelocidade = 0;
let score = 0;

const somStart = new Audio("ghost.MP3");

const somComer = new Audio("som_comer.mp3"); //criei um som proprio
const somGameOver = new Audio("game_over.mp3");

somStart.play();

//loop do game

function drawGame() {
  changeSnakePosition();

  let result = isGameOver();
  if (result) {
    return;
  } //stop the game and reset

  clearScreen();

  drawSnake();
  drawApple();
  checkAppleColisao();
  drawScore();

  if (score > 7) {
    speed = 11;
  }
  if (score > 14) {
    speed = 15;
  }

  //console.log('draw game')
  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if (yVelocidade === 0 && xVelocidade === 0) {
    return false;
  }

  //paredes
  if (headX < 0) {
    gameOver = true;
  } else if (headX === tileCount) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY === tileCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];

    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "40px Verdana";

    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "40px Verdana";

      var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0); //efeito de gradiante
      gradient.addColorStop("0", " magenta");
      gradient.addColorStop("0.5", "blue");
      gradient.addColorStop("1.0", "purple");
      // Fill with gradient
      ctx.fillStyle = gradient;

      ctx.fillText("FIM DE JOGO!", canvas.width / 6, canvas.height / 2);
      somGameOver.play();
    }
  }

  return gameOver;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "11px Verdana";
  ctx.fillText("Placar " + score, canvas.width - 50, 10); //posição do placar
}

function clearScreen() {
  ctx.fillStyle = "black"; // function to clean the game//função pra limpar o jogo
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    //i changed the i = 0 to i =2 and works! // eu troquei o i = 0 pra i = 2 e deu certo, por enquanto
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY));
  while (snakeParts.length > tailLength) {
    snakeParts.shift();
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + xVelocidade;
  headY = headY + yVelocidade;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleColisao() {
  if (appleX === headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    somComer.play();
  }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  //up
  if (event.keyCode == 38) {
    if (yVelocidade == 1) return;

    yVelocidade = -1;
    xVelocidade = 0;
  }
  //down
  if (event.keyCode == 40) {
    if (yVelocidade == -1) return;
    yVelocidade = 1;
    xVelocidade = 0;
  }
  //left

  if (event.keyCode == 37) {
    if (xVelocidade == 1) return;

    yVelocidade = 0;
    xVelocidade = -1;
  }
  //right
  if (event.keyCode == 39) {
    if (xVelocidade == -1) return;

    yVelocidade = 0;
    xVelocidade = 1;
  }
}

function moveUp() {
  if (yVelocidade === 1) return;
  yVelocidade = -1;
  xVelocidade = 0;
}

function moveDown() {
  if (yVelocidade === -1) return;
  yVelocidade = 1;
  xVelocidade = 0;
}

function moveLeft() {
  if (xVelocidade === 1) return;
  yVelocidade = 0;
  xVelocidade = -1;
}

function moveRight() {
  if (xVelocidade === -1) return;
  yVelocidade = 0;
  xVelocidade = 1;
}
drawGame();
