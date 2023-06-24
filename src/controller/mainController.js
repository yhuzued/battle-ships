import '../assets/style.css';
import {
  player1, handleClickEvent, handleMouseEvent, handleKeyDownEvent,
} from './shipPlacementController';

function isShipsFull() {
  return player1.ships.length === 5;
}

document.addEventListener('click', () => {
  if (isShipsFull()) {
    return;
  }

  handleClickEvent();
});

document.addEventListener('mouseover', handleMouseEvent);
document.addEventListener('mouseout', handleMouseEvent);
document.addEventListener('keydown', handleKeyDownEvent);
