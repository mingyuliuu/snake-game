import Snake from "./snake.js"

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

let speed = 7;

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

// Game Loop
function drawGame() {
  clearScreen();
  changeSnakePosition();

  checkAppleCollision();
  drawApple();
  drawSnake();
  setTimeout(drawGame, 1000 / speed);
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
  }
}
document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  if (event.keyCode == 38) {
    // Up
    if (yVelocity == 1) return;

    yVelocity = -1;
    xVelocity = 0;
  } else if (event.keyCode == 40) {
    // Down
    if (yVelocity == -1) return;

    yVelocity = 1;
    xVelocity = 0;
  } else if (event.keyCode == 37) {
    // Left
    if (xVelocity == 1) return;

    yVelocity = 0;
    xVelocity = -1;
  } else if (event.keyCode == 39) {
    // Right
    if (xVelocity == -1) return;

    yVelocity = 0;
    xVelocity = 1;
  }
}

drawGame();
