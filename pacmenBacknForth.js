var pos = 0;
const pacArray = [
  ["./images/PacMan1.png", "./images/PacMan2.png"],
  ["./images/PacMan3.png", "./images/PacMan4.png"],
];
let direction = 0;
const pacMen = []; // This array holds all the pacmen
let focus = 0;

let canvasElement = document.getElementById("canvas");

/* const canvasWidth = canvasElement.width;
const canvasHeight = canvasElement.height; */

// This function returns an object with random values
function setToRandom(scale) {
  let x = Math.random() * scale;
  let y = Math.random() * scale;
  x =
    x < canvasElement.getBoundingClientRect().left
      ? canvasElement.getBoundingClientRect().left + Math.random()
      : x;
  y =
    y < canvasElement.getBoundingClientRect().top
      ? canvasElement.getBoundingClientRect().top + Math.random()
      : y;
  return { x, y };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(100);

  // Add image to div id = game
  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";
  newimg.src = "./images/PacMan1.png";
  newimg.width = 100;

  // TODO: set position here
  newimg.style.left = position.x;
  newimg.style.top = position.y;
  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    direction = checkCollisions(item, direction);
    focus = (focus + 1) % 2;
    console.log(direction);
    item.newimg.src = pacArray[direction][focus];
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 600);
}

function checkCollisions(item, direction) {
  // TODO: detect collision with all walls and make pacman bounce
  {
    if (
      direction == 0 &&
      item.position.x + item.velocity.x + item.newimg.width >=
        canvasElement.clientWidth
    )
      direction = 1;
    if (
      direction == 1 &&
      item.position.x + item.velocity.x <=
        canvasElement.getBoundingClientRect().left
    )
      direction = 0;
    if (
      item.position.x + item.velocity.x + item.newimg.width >
        canvasElement.clientWidth ||
      item.position.x + item.velocity.x <=
        canvasElement.getBoundingClientRect().left
    ) {
      item.velocity.x = 0 - item.velocity.x;
    }

    if (
      item.position.y + item.velocity.y + item.newimg.height >
      canvasElement.clientHeight
    )
      item.velocity.y = 0 - item.velocity.y;
    if (
      item.position.y + item.velocity.y <=
      canvasElement.getBoundingClientRect().top
    )
      item.velocity.y = 0 - item.velocity.y;
  }
  item.position.y = item.position.y + item.velocity.y;

  item.position.x = item.position.x + item.velocity.x;
  return direction;
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}
//don't change this line
//module.exports = { checkCollisions, update, pacMen };
