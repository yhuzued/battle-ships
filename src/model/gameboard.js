import Ship from './ship';

export default function Gameboard() {
  this.tiles = Array.from({ length: 100 }, (_, i) => i + 1);
  this.ships = [];
}

// private

function checkHorizontal(length, coordinate) {
  if ((coordinate % 10) === 0) {
    return true;
  }

  const boundaries = (coordinate + 10) - (coordinate % 10);
  if ((coordinate + length - 1) > boundaries) {
    return true;
  }

  return false;
}

function checkVertical(length, coordinate) {
  const control = ((length - 1) * 10);

  if ((coordinate + control) > 100) {
    return true;
  }

  return false;
}

function attackTile(tiles, coordinate) {
  const tileIndex = tiles.indexOf(coordinate);
  tiles.splice(tileIndex, 1);
}

function attackShip(ships, coordinate) {
  ships.forEach(({ ship, coordinate: shipCoordinate }) => {
    if (shipCoordinate.includes(coordinate)) {
      ship.hit(1);
    }
  });
}

function findDuplicates(array1, array2) {
  return array1.filter((value) => array2.includes(value));
}

// prototype

Gameboard.prototype.shipOccupy = function shipOccupy(length, coordinate, orientation) {
  if (orientation === 'horizontal') {
    return Array.from({ length }, (_, i) => coordinate + i);
  }

  const occupyTile = [coordinate];

  for (let index = 1; index < length; index += 1) {
    const tile = occupyTile[index - 1] + 10;
    occupyTile.push(tile);
  }

  return occupyTile;
};

Gameboard.prototype.placementOutOfBound = (length, coordinate, orientation) => {
  if (orientation === 'horizontal') {
    return checkHorizontal(length, coordinate);
  }

  return checkVertical(length, coordinate);
};

Gameboard.prototype.placementOverlap = function placementOverlap(length, coordinate, orientation) {
  const result = [];
  this.ships.forEach((ship) => {
    result.push(ship.coordinate);
  });

  const duplicates = findDuplicates(
    this.shipOccupy(length, coordinate, orientation),
    result.flat(),
  );

  if (duplicates.length === 0) {
    return false;
  }

  return true;
};

Gameboard.prototype.addShip = function addShip(length, coordinate, orientation) {
  if (this.placementOutOfBound(length, coordinate, orientation)
    || this.placementOverlap(length, coordinate, orientation)) {
    return;
  }

  const arrayCoordinates = this.shipOccupy(length, coordinate, orientation);

  const shipWrapper = {
    ship: new Ship(length),
    coordinate: arrayCoordinates,
    shipOrientation: orientation,
  };

  this.ships.push(shipWrapper);
};

Gameboard.prototype.receiveAttack = function receiveAttack(coordinate) {
  attackTile(this.tiles, coordinate);
  attackShip(this.ships, coordinate);
};

Gameboard.prototype.shipSunk = function shipSunk() {
  const sunkenShip = this.ships.filter((shipWrapper) => shipWrapper.ship.isSunk);
  const total = sunkenShip.length;
  return total;
};
