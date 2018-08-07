class Grid {
  constructor(canvas, tileRow, tileCol, tileSize) {
    this.canvas = canvas;
    this.tileRow = tileRow;
    this.tileCol = tileCol;
    this.tileSize = tileSize;
    this.context = this.canvas.getContext('2d');
    this.direction = 'down';
    this.snake = [[10, 10], [11, 10], [12, 10], [13, 10], [14, 10]];
    this.update();
    window.addEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = (event) => {
    switch (event.keyCode) {
      case 37:
        this.direction = 'left';
        break;
      case 38:
        this.direction = 'up';
        break;
      case 39:
        this.direction = 'right';
        break;
      case 40:
        this.direction = 'down';
        break;
      default:
        break;
    }
  };

  createGrid() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
    for (let row = 0; row < this.tileRow; row += 1) {
      for (let col = 0; col < this.tileCol; col += 1) {
        this.context.strokeRect(row * this.tileSize, col * this.tileSize, this.tileSize, this.tileSize);
      }
    }
  }

  update() {
    setInterval(() => {
      let directionCol = -1;
      let directionRow = 0;
      if (this.direction === 'left') {
        directionCol = -1;
        directionRow = 0;
      } else if (this.direction === 'up') {
        directionCol = 0;
        directionRow = -1;
      } else if (this.direction === 'right') {
        directionCol = 1;
        directionRow = 0;
      } else if (this.direction === 'down') {
        directionCol = 0;
        directionRow = 1;
      }
      this.createGrid();
      this.snake.unshift([this.snake[0][0] + directionCol, this.snake[0][1] + directionRow]);
      this.snake.splice(-1, 1);
      console.log(this.snake);
      for (let i = 0; i < this.snake.length; i += 1) {
        this.context.moveTo((this.snake[i][0] + 0.75) * this.tileSize, (this.snake[i][1] + 0.5) * this.tileSize);
        this.context.arc((this.snake[i][0] + 0.5) * this.tileSize, (this.snake[i][1] + 0.5) * this.tileSize, this.tileSize / 4, 0, 2 * Math.PI);
        this.context.stroke();
      }
    }, 500);
  }
}

export default Grid;
