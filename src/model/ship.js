export default function Ship(length) {
  this.length = length;
  this.hits = 0;
  this.isSunk = false;
}

Ship.prototype.hit = function hit(number) {
  this.hits += number;

  if (this.hits === this.length) {
    this.isSunk = true;
  }
};
