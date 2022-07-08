const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;

let xVelocity = 0;
let yVelocity = 0;

// Game Loop
function drawGame() {
  clearScreen();
  changeSnakePosition();
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
}

function changeSnakePosition() {
  headX += xVelocity;
  headY += yVelocity;
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
