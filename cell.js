class Cell {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.bee = false;
    this.revealed = false;
  }

  show = () => {
    stroke(0);
    fill(255);
    rect(this.x, this.y, this.w);
    if (this.revealed) {
      if (this.bee) {
        ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
      } else {
        fill(230);
        rect(this.x, this.y, this.w, this.w);
      }
    }
  };

  contains = (x, y) => {
    return (
      x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w
    );
  };

  reveal = () => {
    this.revealed = true;
  };
}
