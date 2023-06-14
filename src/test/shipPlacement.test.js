import Gameboard from '../model/gameboard';
import Ship from '../model/ship';

test('ships on gameboard should contain ship object, coordinate, and vertical orientation', () => {
  const game = new Gameboard();
  const expectedResult = {
    ship: new Ship(5),
    coordinate: [1, 11, 21, 31, 41],
    shipOrientation: 'vertical',
  };

  game.addShip(5, 1, 'vertical');
  const ship = game.ships[0];

  expect(ship).toMatchObject(expectedResult);
});

test('ships on gameboard should contain ship object, coordinate, and horizontal orientation', () => {
  const game = new Gameboard();
  const expectedResult = {
    ship: new Ship(2),
    coordinate: [2, 3],
    shipOrientation: 'horizontal',
  };

  game.addShip(2, 2, 'horizontal');
  const ship = game.ships[0];

  expect(ship).toMatchObject(expectedResult);
});

test('ship with length of 5 and horizontal orientation on tile 1 should have range from tile 1 to 5)', () => {
  const game = new Gameboard();
  const expectedResult = [1, 2, 3, 4, 5];
  game.addShip(5, 1, 'horizontal');
  const ship = game.ships[0];

  expect(ship.coordinate).toMatchObject(expectedResult);
});

test('ship with length of 5 and horizontal orientation on tile 2 hould have range from tile 2 to 6)', () => {
  const game = new Gameboard();
  const expectedResult = [2, 3, 4, 5, 6];
  game.addShip(5, 2, 'horizontal');
  const ship = game.ships[0];

  expect(ship.coordinate).toMatchObject(expectedResult);
});

test('ship with length of 5, horizontal orientation, on tile 7 cannot be placed)', () => {
  const game = new Gameboard();
  expect(game.placementOutOfBound(5, 7, 'horizontal')).toBe(true);
});

test('ship with length of 2, horizontal orientation, on tile 40 cannot be placed)', () => {
  const game = new Gameboard();
  expect(game.placementOutOfBound(2, 40, 'horizontal')).toBe(true);
});

test('ship with length of 3, horizontal orientation, on tile 69 etc cannot be placed)', () => {
  const game = new Gameboard();
  expect(game.placementOutOfBound(3, 69, 'horizontal')).toBe(true);
});

test('ship with length of 3, horizontal orientation, on tile 5 can be placed)', () => {
  const game = new Gameboard();
  expect(game.placementOutOfBound(3, 5, 'horizontal')).toBe(false);
});

test('ship with length of 2 and horizontal orientation on tile 1 should have range from tile 1 to 2)', () => {
  const game = new Gameboard();
  const expectedResult = [1, 2];
  game.addShip(2, 1, 'horizontal');
  const ship = game.ships[0];

  expect(ship.coordinate).toEqual(expectedResult);
});

test('ship with length of 2 and horizontal orientation on tile 2 hould have range from tile 2 to 3)', () => {
  const game = new Gameboard();
  const expectedResult = [2, 3];
  game.addShip(2, 2, 'horizontal');
  const ship = game.ships[0];

  expect(ship.coordinate).toEqual(expectedResult);
});

test('ship with length of 2 and horizontal orientation on tile 10, 20, 30, etc cannot be placed)', () => {
  const game = new Gameboard();
  game.addShip(2, 10, 'horizontal');

  expect(game.ships.length).toEqual(0);
});

test('ship with length of 5 and vertical orientation on tile 1 should occupy tile at 1, 11, 21, 31, 41)', () => {
  const game = new Gameboard();
  const expectedResult = [1, 11, 21, 31, 41];
  game.addShip(5, 1, 'vertical');
  const ship = game.ships[0];

  expect(ship.coordinate).toEqual(expectedResult);
});

test('ship with length of 5 and vertical orientation on tile 2 should occupy tile at tile 2, 12, 22, 32, 42)', () => {
  const game = new Gameboard();
  const expectedResult = [2, 12, 22, 32, 42];
  game.addShip(5, 2, 'vertical');
  const ship = game.ships[0];

  expect(ship.coordinate).toEqual(expectedResult);
});

test('ship with length of 5 and vertical orientation on tile 61, 62, 63, etc, cannot be placed)', () => {
  const game = new Gameboard();
  game.addShip(5, 61, 'vertical');

  expect(game.ships.length).toEqual(0);
});

test('gameBoard should have 5 ships', () => {
  const game = new Gameboard();
  game.addShip(5, 1, 'horizontal');
  game.addShip(4, 12, 'horizontal');
  game.addShip(3, 23, 'horizontal');
  game.addShip(2, 41, 'vertical');
  game.addShip(2, 65, 'vertical');

  expect(game.ships.length).toEqual(5);
});

test('ship should not overlap', () => {
  const game = new Gameboard();
  game.addShip(5, 1, 'horizontal');
  game.addShip(2, 1, 'vertical'); // overlap
  game.addShip(2, 5, 'horizontal'); // overlap
  game.addShip(3, 3, 'horizontal'); // overlap

  expect(game.ships.length).toBe(1);
});
