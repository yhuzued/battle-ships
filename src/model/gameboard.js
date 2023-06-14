import Ship from './ship';

export default function Gameboard() {
  this.tiles = Array.from({ length: 100 }, (_, i) => i + 1);
  this.ships = [];
}

// private

function shipOccupy(length, coordinate, orientation) {
  if (orientation === 'horizontal') {
    return Array.from({ length }, (_, i) => coordinate + i);
  }

  const occupyTile = [coordinate];

  for (let index = 1; index < length; index += 1) {
    const tile = occupyTile[index - 1] + 10;
    occupyTile.push(tile);
  }

  return occupyTile;
}

function checkHorizontal(length, coordinate) {
  if ((coordinate % 10) === 0) {
    return true;
  }

  const boundaries = (coordinate + 10) - (coordinate % 10);
  if ((coordinate + length) > boundaries) {
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

// prototype

Gameboard.prototype.placementOutOfBound = (length, coordinate, orientation) => {
  if (orientation === 'horizontal') {
    return checkHorizontal(length, coordinate);
  }

  return checkVertical(length, coordinate);
};

Gameboard.prototype.placementOverlap = function placementOverlap(coordinate) {
  const result = [];
  this.ships.forEach((ship) => {
    result.push(ship.coordinate);
  });

  return result.flat().includes(coordinate);
};

Gameboard.prototype.addShip = function addShip(length, coordinate, orientation) {
  if (this.placementOutOfBound(length, coordinate, orientation)
    || this.placementOverlap(coordinate)) {
    return;
  }

  const arrayCoordinates = shipOccupy(length, coordinate, orientation);

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
