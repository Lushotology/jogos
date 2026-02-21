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
const somComer = new Audio("som_comer.mp3");
const somGameOver = new Audio("game_over.mp3");

somStart.play();

// Loop principal
function drawGame() {
  changeSnakePosition();

  let result = isGameOver();
  if (result) {
    return;
  }

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

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if (yVelocidade === 0 && xVelocidade === 0) {
    return false;
  }

  // colisão com paredes
  if (headX < 0 || headX === tileCount || headY < 0 || headY === tileCount) {
    gameOver = true;
  }

  // colisão com o próprio corpo
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

    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "purple");
    ctx.fillStyle = gradient;

    ctx.fillText("FIM DE JOGO!", canvas.width / 6, canvas.height / 2);
    somGameOver.play();

    // esconder setas e mostrar botão de restart
    document.getElementById("controls").style.display = "none";
    document.getElementById("restartContainer").style.display = "block";
  }

  return gameOver;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "11px Verdana";
  ctx.fillText("Placar " + score, canvas.width - 50, 10);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
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
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    somComer.play();
  }
}

// controles por teclado
document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  if (event.keyCode == 38) {
    if (yVelocidade == 1) return;
    yVelocidade = -1;
    xVelocidade = 0;
  }
  if (event.keyCode == 40) {
    if (yVelocidade == -1) return;
    yVelocidade = 1;
    xVelocidade = 0;
  }
  if (event.keyCode == 37) {
    if (xVelocidade == 1) return;
    yVelocidade = 0;
    xVelocidade = -1;
  }
  if (event.keyCode == 39) {
    if (xVelocidade == -1) return;
    yVelocidade = 0;
    xVelocidade = 1;
  }
}

// controles por botões (celular)
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

// botão de reinício
function restartGame() {
  headX = 10;
  headY = 10;
  xVelocidade = 0;
  yVelocidade = 0;
  score = 0;
  tailLength = 2;
  snakeParts.length = 0;
  appleX = Math.floor(Math.random() * tileCount);
  appleY = Math.floor(Math.random() * tileCount);

  // mostrar setas novamente e esconder botão
  document.getElementById("controls").style.display = "block";
  document.getElementById("restartContainer").style.display = "none";

  drawGame();
}

drawGame();