import Snake from "./snake.js";

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

let speed = 7;
let score = 0;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;
let inputXVelocity = 0;
let inputYVelocity = 0;
let prevXVelocity = 0;
let prevYVelocity = 0;

const sound = new Audio("sound.wav");
const gameOverSound = new Audio("gameOver.wav");

// Game Loop
function drawGame() {
  if (prevXVelocity === 1 && xVelocity === -1 || prevXVelocity === -1 && xVelocity === 1) {
    xVelocity = prevXVelocity;
  }

  if (prevYVelocity === 1 && yVelocity === -1 || prevYVelocity === -1 && yVelocity === 1) {
    yVelocity = prevYVelocity;
  }

  prevXVelocity = xVelocity;
  prevYVelocity = yVelocity;

  changeSnakePosition();

  if (isGameOver()) {
    document.body.removeEventListener("keydown", keyDown);
    return;
  }

  clearScreen();

  checkAppleCollision();
  drawApple();
  drawSnake();
  drawScore();

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  if (yVelocity === 0 && xVelocity === 0) return false;

  let isGameOver = false;

  // Walls
  if (headX < 0 || headX === tileCount || headY < 0 || headY === tileCount) {
    isGameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];

    // Snake
    if (part.x === headX && part.y === headY) {
      isGameOver = true;
      break;
    }
  }

  if (!isGameOver) return false;

  context.fillStyle = "white";
  context.font = "50px Verdana";
  context.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
  gameOverSound.play();

  return true;
}

function drawScore() {
  context.fillStyle = "white";
  context.font = "12px Verdana";
  context.fillText("Score " + score, canvas.width - 55, 15);

  speed = score > 5 ? (score > 10 ? (score > 20 ? 12 : 10) : 8) : 7;
}

function clearScreen() {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  context.fillStyle = "rgba(245, 40, 145, 0.8)";
  context.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

  context.fillStyle = "rgba(137, 183, 45, 0.5)";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    context.fillRect(
      part.x * tileCount,
      part.y * tileCount,
      tileSize,
      tileSize
    );
  }

  // Put an item at the end
  snakeParts.push(new Snake(headX, headY));
  if (snakeParts.length > tailLength) {
    // Remove the furtherest item
    snakeParts.shift();
  }

  context.fillStyle = "rgba(245, 40, 145, 0.8)";
  context.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX += xVelocity;
  headY += yVelocity;
}

function drawApple() {
  context.fillStyle = "red";
  context.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);

    tailLength++;
    score++;

    sound.play();
  }
}
document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  if (event.keyCode == 38) {
    // Up
    yVelocity = -1;
    xVelocity = 0;
  } else if (event.keyCode == 40) {
    // Down
    yVelocity = 1;
    xVelocity = 0;
  } else if (event.keyCode == 37) {
    // Left
    yVelocity = 0;
    xVelocity = -1;
  } else if (event.keyCode == 39) {
    // Right
    yVelocity = 0;
    xVelocity = 1;
  }
}

drawGame();
