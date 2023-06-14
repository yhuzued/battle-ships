import GameBoard from './gameboard';

export default function Player(name) {
  this.name = name;
  this.board = new GameBoard();
}

Player.prototype.shotOponent = function shotOponent(opponent, coordinate) {
  opponent.board.receiveAttack(coordinate);
};

Player.prototype.shotIsLegal = function shotIsLegal(opponent, coordinate) {
  return opponent.board.tiles.includes(coordinate);
};

Player.prototype.makeAutomaticMove = function makeAutomaticMove(opponent) {
  if (opponent.board.tiles.length === 0) {
    return;
  }

  const coordinate = Math.floor(Math.random() * opponent.board.tiles.length);
  this.shotOponent(opponent, opponent.board.tiles[coordinate]);
};
