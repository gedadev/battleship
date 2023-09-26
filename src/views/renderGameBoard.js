export default class RenderGameBoard {
  constructor(gridContainer, player1, player2) {
    this.gridContainer = gridContainer;
    this.player1 = player1;
    this.player2 = player2;
    this.players = [this.player1, this.player2];
    this.grid = [];
    this.turnIndicator = document.querySelectorAll('.player');
  }

  generateGrid() {
    this.gridContainer.forEach((element, index) => {
      const grid = new Array(this.players[index].gameBoard.size).fill(null)
        .map(() => new Array(this.players[index].gameBoard.size).fill(null));

      for (let i = 0; i < this.players[index].gameBoard.size; i += 1) {
        for (let j = 0; j < this.players[index].gameBoard.size; j += 1) {
          const pixel = document.createElement('div');

          pixel.className = 'pixel';
          element.appendChild(pixel);
          grid[i][j] = pixel;
        }
      }
      this.grid.push(grid);
    });
    this.gridContainer[0].style.backgroundColor = 'rgba(0, 0, 0, 0)';
  }

  displayShips(index) {
    this.clearGrid(index);
    for (let i = 0; i < this.grid[index].length; i += 1) {
      for (let j = 0; j < this.grid[index].length; j += 1) {
        if (this.players[index].gameBoard.board[i][j] !== null) {
          // eslint-disable-next-line no-param-reassign
          this.grid[index][i][j].style.backgroundColor = 'var(--ship-color)';
        }
      }
    }
  }

  clearGrid(index) {
    for (let i = 0; i < this.grid[index].length; i += 1) {
      for (let j = 0; j < this.grid[index].length; j += 1) {
        // eslint-disable-next-line no-param-reassign
        this.grid[index][i][j].style.backgroundColor = 'rgba(0, 0, 0, 0)';
      }
    }
  }

  displayAttack(lat, lon, index) {
    if (this.players[index].gameBoard.board[lat][lon] !== null) {
      this.grid[index][lat][lon].classList.add('hit');
    } else {
      this.grid[index][lat][lon].classList.add('fail');
    }
  }

  clearHits(index) {
    for (let i = 0; i < this.grid[index].length; i += 1) {
      for (let j = 0; j < this.grid[index].length; j += 1) {
        // eslint-disable-next-line no-param-reassign
        this.grid[index][i][j].className = 'pixel';
      }
    }
  }

  displayTurn(index) {
    if (index === 0) {
      const yourTurn = this.turnIndicator[index].firstElementChild;
      const opponentTurn = this.turnIndicator[index + 1].firstElementChild;

      yourTurn.style.color = '#84d794';
      opponentTurn.style.color = '#e76262';
    }
    if (index === 1) {
      const yourTurn = this.turnIndicator[index - 1].firstElementChild;
      const opponentTurn = this.turnIndicator[index].firstElementChild;

      yourTurn.style.color = '#e76262';
      opponentTurn.style.color = '#84d794';
    }
  }
}
