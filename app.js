function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let w = 20;
let totalBees = 10;

let img;
function preload() {
  img = loadImage("soccer.png");
}

function setup() {
  createCanvas(200, 200);

  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  // Pick total bees spots
  let options = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  for (let n = 0; n < totalBees; n++) {
    let index = floor(random(options.length));
    const choice = options[index];
    const i = choice[0];
    const j = choice[1];
    options.splice(index, 1);
    grid[i][j].bee = true;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].countBees();
    }
  }
}

function gameOver() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
}

function mousePressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();

        if (grid[i][j].bee) {
          gameOver();
        }
      }
    }
  }
}

function draw() {
  background(255);
  noFill();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}
