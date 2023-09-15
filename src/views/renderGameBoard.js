export default class RenderGameBoard {
  constructor(gridContainer, players) {
    this.gridContainer = gridContainer;
    this.player = players;
    this.grid = [];
  }

  generateGrid() {
    this.gridContainer.forEach((element, index) => {
      const grid = new Array(this.player[index].gameBoard.size).fill(null)
        .map(() => new Array(this.player[index].gameBoard.size).fill(null));

      for (let i = 0; i < this.player[index].gameBoard.size; i += 1) {
        for (let j = 0; j < this.player[index].gameBoard.size; j += 1) {
          const pixel = document.createElement('div');

          pixel.className = 'pixel';
          element.appendChild(pixel);
          grid[i][j] = pixel;
        }
      }
      this.grid.push(grid);
    });
  }

  displayShips() {
    this.grid.forEach((element, index) => {
      for (let i = 0; i < element.length; i += 1) {
        for (let j = 0; j < element.length; j += 1) {
          if (this.player[index].gameBoard.board[i][j] !== null) {
            // eslint-disable-next-line no-param-reassign
            element[i][j].style.backgroundColor = 'var(--ship-color)';
          }
        }
      }
    });
  }

  displayAttack(lat, lon, index) {
    if (this.player[index].gameBoard.board[lat][lon] !== null) {
      this.grid[index][lat][lon].classList.add('hit');
    } else {
      this.grid[index][lat][lon].classList.add('fail');
    }
  }
}
