class Cell {
  constructor(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighborCount = 0;
    this.bee = false;
    this.revealed = false;
  }

  show = () => {
    stroke(0);
    fill(255);
    rect(this.x, this.y, this.w);
    if (this.revealed) {
      if (this.bee) {
        // ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
        imageMode(CORNER);
        image(img, this.x + 4, this.y + 4, img.width / 2, img.height / 2);
      } else {
        fill(230);
        rect(this.x, this.y, this.w, this.w);
        if (this.neighborCount > 0) {
          textAlign(CENTER);
          fill(0);
          text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
        }
      }
    }
  };

  countBees = () => {
    if (this.bee) {
      this.neighborCount = -1;
      return;
    }
    let total = 0;

    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        let i = this.i + xoff;
        let j = this.j + yoff;
        if (i > -1 && i < cols && j > -1 && j < rows) {
          const neighbor = grid[i][j];
          if (neighbor.bee) {
            total++;
          }
        }
      }
    }
    this.neighborCount = total;
  };

  contains = (x, y) => {
    return (
      x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w
    );
  };

  reveal = () => {
    this.revealed = true;
    if (this.neighborCount == 0) {
      this.floodFill();
    }
  };

  floodFill = () => {
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        let i = this.i + xoff;
        let j = this.j + yoff;
        if (i > -1 && i < cols && j > -1 && j < rows) {
          const neighbor = grid[i][j];
          if (!neighbor.bee && !neighbor.revealed) {
            neighbor.reveal();
          }
        }
      }
    }
  };
}
