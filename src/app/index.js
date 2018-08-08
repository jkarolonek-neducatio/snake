import '../style/app.scss';
import Grid from './modules/grid';

document.addEventListener('DOMContentLoaded', (event) => {
  const wrapper = document.getElementsByClassName('wrapper')[0];
  const snakeBoard = document.getElementById('snake-board');
  const restartBtn = document.getElementsByClassName('restart-btn')[0];

  const tileSize = 25;
  const tileX = 20;
  const tileY = 20;

  let grid = new Grid(wrapper, snakeBoard, tileX, tileY, tileSize);

  restartBtn.addEventListener('click', () => {
    grid.wrapper.classList.remove('game-over');
    grid = new Grid(wrapper, snakeBoard, tileX, tileY, tileSize);
  });

});
