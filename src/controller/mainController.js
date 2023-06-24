import '../assets/style.css';
import Gameboard from '../model/gameboard';
import {
  changeBackground,
  removeBackground,
  colorRed,
  tileWithShip,
} from './domController';

const player1 = new Gameboard();
const length = 3;
let orientation = 'horizontal';
let coordinate = 0;

function changeOrientation(e) {
  const el = document.querySelector('.orientation');
  if (e.code === 'KeyR') {
    orientation = orientation === 'horizontal' ? 'vertical' : 'horizontal';
  }
  el.textContent = orientation;
}

function handleMouseEvent(e) {
  if (!e.target.classList.contains('tile')) {
    return;
  }

  const targetTile = e.target.getAttribute('id');
  const targetCoordinate = Number(targetTile.split('-')[1]);
  coordinate = targetCoordinate;

  if (player1.placementOutOfBound(length, coordinate, orientation)
    || player1.placementOverlap(length, coordinate, orientation)) {
    if (e.type === 'mouseover') {
      colorRed(coordinate);
    } else if (e.type === 'mouseout') {
      removeBackground('bg-red-100');
    }
    return;
  }

  if (e.type === 'mouseover') {
    changeBackground(player1.shipOccupy(length, coordinate, orientation));
  } else if (e.type === 'mouseout') {
    removeBackground('bg-blue-100');
  }
}

function handleKeyDownEvent(e) {
  removeBackground('bg-blue-100');
  changeOrientation(e);

  if (player1.placementOutOfBound(length, coordinate, orientation)) {
    colorRed(coordinate);
    return;
  }

  removeBackground('bg-red-100');
  changeBackground(player1.shipOccupy(length, coordinate, orientation));
}

function handleClickEvent() {
  player1.addShip(length, coordinate, orientation);
  tileWithShip(player1.ships);
  removeBackground('bg-blue-100');
}

document.addEventListener('click', handleClickEvent);
document.addEventListener('mouseover', handleMouseEvent);
document.addEventListener('mouseout', handleMouseEvent);
document.addEventListener('keydown', handleKeyDownEvent);
