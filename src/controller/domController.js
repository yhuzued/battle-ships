function changeBackground(array) {
  array.forEach((element) => {
    const el = document.querySelector(`#player-${element}`);
    if (el) {
      el.classList.add('bg-blue-100');
    }
  });
}

function removeBackground(color) {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach((element) => {
    if (element.classList.contains('ship')) {
      return;
    }

    if (element.classList.contains(color)) {
      element.classList.remove(color);
    }
  });
}

function colorRed(coordinate) {
  const tile = document.querySelector(`#player-${coordinate}`);
  if (tile) {
    tile.classList.add('bg-red-100');
  }
}

function colorTileWithShip(playerShips) {
  const allCoordinate = playerShips.flatMap((ship) => ship.coordinate);
  allCoordinate.forEach((coordinate) => {
    const tile = document.querySelector(`#player-${coordinate}`);
    if (tile) {
      tile.classList.add('bg-blue-400');
    }
  });
}

function toggleRedHighlight(e, coordinate) {
  if (e.type === 'mouseover') {
    colorRed(coordinate);
  } else if (e.type === 'mouseout') {
    removeBackground('bg-red-100');
  }
}

function toggleBackgroundHighlight(e, player1, length, coordinate, orientation) {
  if (e.type === 'mouseover') {
    changeBackground(player1.shipOccupy(length, coordinate, orientation));
  } else if (e.type === 'mouseout') {
    removeBackground('bg-blue-100');
  }
}

export {
  changeBackground,
  removeBackground,
  colorRed,
  colorTileWithShip,
  toggleRedHighlight,
  toggleBackgroundHighlight,
};
