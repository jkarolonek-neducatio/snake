import '../style/app.scss';
import Grid from './modules/grid';
document.addEventListener('DOMContentLoaded', (event) => {
  const snakeBoard = document.getElementById('snake-board');

  const tileSize = 25;
  const tileX = 20;
  const tileY = 20;

  const grid = new Grid(snakeBoard, tileX, tileY, tileSize);
});
