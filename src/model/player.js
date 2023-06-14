import GameBoard from './gameboard';

export default function Player(name) {
  this.name = name;
  this.board = new GameBoard();
}
