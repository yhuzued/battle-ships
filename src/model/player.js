import GameBoard from './gameboard';

export default function Player(name) {
  this.name = name;
  this.board = new GameBoard();
}

Player.prototype.shotOponent = function shotOponent(opponentBoard, coordinate) {
  opponentBoard.receiveAttack(coordinate);
};

Player.prototype.shotIsLegal = function shotIsLegal(opponentBoard, coordinate) {
  return opponentBoard.tiles.includes(coordinate);
};
