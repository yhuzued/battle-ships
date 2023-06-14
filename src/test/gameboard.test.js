import Gameboard from '../model/gameboard';

test('gameboard should have 100 tile', () => {
  const game = new Gameboard();
  const expectedResult = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
    73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,
    85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96,
    97, 98, 99, 100,
  ];

  expect(game.tiles).toStrictEqual(expectedResult);
});

test('gameboard should have return 99 tile if 1 tile recieve attack', () => {
  const game = new Gameboard();
  const expectedResult = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
    73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,
    85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96,
    97, 98, 99, 100,
  ];

  game.receiveAttack(1);
  expect(game.tiles).toStrictEqual(expectedResult);
});

test('gameboard should have return 99 tile if 1 tile recieve attack', () => {
  const game = new Gameboard();
  const expectedResult = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
    73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,
    85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96,
    97, 98, 99,
  ];

  game.receiveAttack(100);
  expect(game.tiles).toStrictEqual(expectedResult);
});

test('gameboard should have return 99 tile if 1 tile recieve attack', () => {
  const game = new Gameboard();
  const expectedResult = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    49, 50, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
    73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,
    85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96,
    97, 98, 99, 100,
  ];

  game.receiveAttack(51);
  expect(game.tiles).toStrictEqual(expectedResult);
});

test('a hit attack tile 5, tile 5 destroyed', () => {
  const game = new Gameboard();
  const expectedResult = [1,
    2, 3, 4, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
    73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,
    85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96,
    97, 98, 99, 100,
  ];
  game.receiveAttack(5);

  expect(game.tiles).toEqual(expectedResult);
});

test('a hit attack tile 5, tile 5 destroyed, the hit point of the ship that occupy tile 5 + 1', () => {
  const game = new Gameboard();
  game.addShip(3, 5, 'vertical');
  game.receiveAttack(5);
  const shipWrapper = game.ships[0];
  expect(shipWrapper.ship.hits).toBe(1);
});

test('a ship with length 5 attacked 5 times, ship status should be sunk', () => {
  const game = new Gameboard();
  game.addShip(5, 1, 'horizontal');
  game.receiveAttack(1);
  game.receiveAttack(2);
  game.receiveAttack(3);
  game.receiveAttack(4);
  game.receiveAttack(5);
  const shipWrapper = game.ships[0];
  expect(shipWrapper.ship.isSunk).toBe(true);
});

test('one ship on gameboard should sunk', () => {
  const game = new Gameboard();
  game.addShip(2, 1, 'horizontal');
  game.addShip(2, 11, 'horizontal');

  game.receiveAttack(1);
  game.receiveAttack(2);
  game.receiveAttack(11);

  expect(game.shipSunk()).toEqual(1);
});

test('all ship on gameboard should sunk', () => {
  const game = new Gameboard();
  game.addShip(2, 1, 'horizontal');
  game.addShip(2, 11, 'horizontal');

  game.receiveAttack(1);
  game.receiveAttack(2);
  game.receiveAttack(11);
  game.receiveAttack(12);

  expect(game.shipSunk()).toEqual(game.ships.length);
});
