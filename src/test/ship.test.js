import Ship from '../model/ship';

test('ship should have property length, hits, and isSunk', () => {
  const ship = new Ship(4);
  const expected = { length: 4, hits: 0, isSunk: false };
  expect(ship).toMatchObject(expected);
});

test('ship length should return 5 ', () => {
  const ship = new Ship(5);

  expect(ship.length).toBe(5);
});

test('ship length should return 5 ', () => {
  const ship = new Ship(2);

  expect(ship.length).toBe(2);
});

test('ship is hited 3 times', () => {
  const ship = new Ship(5);
  ship.hit(3);
  expect(ship.hits).toBe(3);
});

test('ship is hited 4 times', () => {
  const ship = new Ship(5);
  ship.hit(4);
  expect(ship.hits).toBe(4);
});

test('ship isSunk should return true', () => {
  const ship = new Ship(5);
  ship.hit(5);
  expect(ship.isSunk).toBe(true);
});

test('ship isSunk should return true', () => {
  const ship = new Ship(4);
  ship.hit(4);
  expect(ship.isSunk).toBe(true);
});
