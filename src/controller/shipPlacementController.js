import Gameboard from '../model/gameboard';
import {
  changeBackground,
  removeBackground,
  colorRed,
  colorTileWithShip,
  toggleRedHighlight,
  toggleBackgroundHighlight,
} from './domController';

const player1 = new Gameboard();
const ships = [5, 4, 3, 3, 2];
let orientation = 'horizontal';
let coordinate = 0;

function changeOrientation(e) {
  const el = document.querySelector('.orientation');
  if (e.code === 'KeyR') {
    orientation = orientation === 'horizontal' ? 'vertical' : 'horizontal';
  }
  el.textContent = orientation;
}

function placementInvalid() {
  return player1.placementOutOfBound(ships[0], coordinate, orientation)
    || player1.placementOverlap(ships[0], coordinate, orientation);
}

function findCoordinate(e) {
  const targetTile = e.target.getAttribute('id');
  const targetCoordinate = Number(targetTile.split('-')[1]);
  coordinate = targetCoordinate;
}

function handleMouseEvent(e) {
  if (!e.target.classList.contains('tile')) {
    return;
  }

  findCoordinate(e);

  if (placementInvalid() || ships.length === 0) {
    toggleRedHighlight(e, coordinate);
    return;
  }

  toggleBackgroundHighlight(e, player1, ships[0], coordinate, orientation);
}

function handleKeyDownEvent(e) {
  removeBackground('bg-blue-100');
  changeOrientation(e);

  if (placementInvalid() || ships.length === 0) {
    colorRed(coordinate);
    return;
  }

  removeBackground('bg-red-100');
  changeBackground(player1.shipOccupy(ships[0], coordinate, orientation));
}

function handleClickEvent() {
  if (placementInvalid() || ships.length === 0) {
    return;
  }

  player1.addShip(ships.shift(), coordinate, orientation);
  colorTileWithShip(player1.ships);
  removeBackground('bg-blue-100');
}

export {
  player1, handleMouseEvent, handleKeyDownEvent, handleClickEvent,
};
