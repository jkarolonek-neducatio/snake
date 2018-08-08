class Grid {
  constructor(wrapper, canvas, tileRow, tileCol, tileSize) {
    this.wrapper = wrapper;
    this.canvas = canvas;
    this.tileRow = tileRow;
    this.tileCol = tileCol;
    this.tileSize = tileSize;
    this.context = this.canvas.getContext('2d');
    this.direction = 'down';
    this.gameState = 'initial';
    this.snake = [[5, 5], [6, 5], [7, 5], [8, 5], [9, 5]];
    this.update();
    window.addEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = (event) => {
    switch (event.keyCode) {
      case 65:
      case 37:
        this.direction = 'left';
        break;
      case 87:
      case 38:
        this.direction = 'up';
        break;
      case 68:
      case 39:
        this.direction = 'right';
        break;
      case 83:
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
    this.mainInterval = setInterval(() => {
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
      if (this.snake[0][0] !== this.bonusCol || this.snake[0][1] !== this.bonusRow) {
        this.snake.splice(-1, 1);
      } else {
        this.randomizeBonus();
      }
      for (let i = 1; i < this.snake.length; i += 1) {
        if (this.snake[0][0] === this.snake[i][0] && this.snake[0][1] === this.snake[i][1]) {
          this.stopGame();
        }
      }
      if (this.snake[0][0] < 0 || this.snake[0][0] > this.tileCol - 1 || this.snake[0][1] < 0 || this.snake[0][1] > this.tileRow - 1) {
        clearInterval(this.mainInterval);
        this.stopGame();
      }

      for (let i = 0; i < this.snake.length; i += 1) {
        this.context.beginPath();
        this.context.moveTo((this.snake[i][0] + 0.75) * this.tileSize, (this.snake[i][1] + 0.5) * this.tileSize);
        this.context.arc((this.snake[i][0] + 0.5) * this.tileSize, (this.snake[i][1] + 0.5) * this.tileSize, this.tileSize / 4, 0, 2 * Math.PI);
        this.context.stroke();
      }
      this.context.beginPath();
      this.context.arc((this.bonusCol + 0.50) * this.tileSize, (this.bonusRow + 0.5) * this.tileSize, this.tileSize / 4, 0, 2 * Math.PI);
      this.context.fill();
    }, 200);
    this.randomizeBonus();
  }

  randomizeBonus() {
    let isBonusOkay;
    do {
      isBonusOkay = true;
      this.bonusCol = (Math.floor(Math.random() * (this.tileCol)));
      this.bonusRow = (Math.floor(Math.random() * (this.tileRow)));
      for (let i = 0; i < this.snake.length; i += 1) {
        if (this.bonusCol === this.snake[i][0] && this.bonusRow === this.snake[i][1]) {
          isBonusOkay = false;
        }
      }
    } while (isBonusOkay === false);
  }

  stopGame() {
    clearInterval(this.mainInterval);
    this.gameState = 'lost';
    if (this.gameState === 'lost') {
      this.wrapper.classList.add('game-over');
    }
    window.removeEventListener('keydown', this.keydownHandler);
  }
}

export default Grid;
