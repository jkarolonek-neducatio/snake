import '../style/app.scss';

document.addEventListener('DOMContentLoaded', (event) => {
  const snakeBoard = document.getElementById('snake-board');
  const ctx = snakeBoard.getContext('2d');

  const tileSize = 25;
  const tileX = 20;
  const tileY = 20;

  for (let x = 0; x < tileX; x++) {
    for (let y = 0; y < tileY; y++) {
      ctx.strokeRect(x, y, tileSize, tileSize);
    }
  }
});
