import Player from '../model/player';

test('Computer should be capable to attack player board', () => {
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

  const player1 = new Player('player1');
  const computer = new Player('computer');

  computer.shotOponent(player1, 1);

  expect(player1.board.tiles).toEqual(expectedResult);
});

test('Computer can only attack available tile', () => {
  const player1 = new Player('player1');
  const computer = new Player('computer');

  expect(computer.shotIsLegal(player1, 1)).toEqual(true);

  computer.shotOponent(player1, 1);

  expect(computer.shotIsLegal(player1, 1)).toEqual(false);
});

test('computer capable to make their own move', () => {
  const player1 = new Player('player1');
  const computer = new Player('computer');

  for (let index = 0; index < 100; index += 1) {
    computer.makeAutomaticMove(player1);
  }

  expect(player1.board.tiles.length).toBe(0);
});

test('computer shot 5 tiles', () => {
  const player1 = new Player('player1');
  const computer = new Player('computer');

  for (let index = 0; index < 5; index += 1) {
    computer.makeAutomaticMove(player1);
  }

  expect(player1.board.tiles.length).toBe(95);
});

test('computer shot 28 tiles', () => {
  const player1 = new Player('player1');
  const computer = new Player('computer');

  for (let index = 0; index < 28; index += 1) {
    computer.makeAutomaticMove(player1);
  }

  expect(player1.board.tiles.length).toBe(72);
});
