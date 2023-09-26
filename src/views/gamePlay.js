import Player from '../app/player.js';
import RenderGameBoard from './renderGameBoard.js';

export default class GamePlay {
  constructor() {
    this.player1 = new Player('Player 1');
    this.player2 = new Player('Computer');
    this.grid = document.querySelectorAll('.grid');
    this.render = new RenderGameBoard(this.grid, this.player1, this.player2);
  }

  initGame() {
    this.player1.gameBoard.placeShipsRandomly();
    this.player2.gameBoard.placeShipsRandomly();
    this.player2.turn = false;

    this.render.generateGrid();
    this.render.displayShips(0);
    this.rearrange();
    this.enableOpponentBoard();
  }

  rearrange() {
    const rearrangeShips = document.querySelector('#rearrange-ships');

    rearrangeShips.addEventListener('click', () => {
      this.player1.gameBoard.board = this.player1.gameBoard.generateBoard();
      this.player1.gameBoard.placeShipsRandomly();
      this.render.displayShips(0);
    });
  }

  resetGame() {

  }

  declareWinner(player, opponent, opponentBoardNodes) {
    if (opponent.gameBoard.allShipsSunk()) {
      this.render.displayShips(1);

      const winner = document.createElement('h2');
      const continueGame = document.createElement('p');
      winner.innerText = `${player.name} wins`;
      continueGame.innerText = 'Press any key to continue';
      document.body.appendChild(winner);
      document.body.appendChild(continueGame);
      GamePlay.disableListeners(opponentBoardNodes);
      return true;
    }
    return false;
  }

  static disableListeners(element) {
    for (let index = 0; index < element.length; index += 1) {
      const clonedElement = element[index].cloneNode(true);
      element[index].parentNode.replaceChild(clonedElement, element[index]);
    }
  }

  enableOpponentBoard() {
    const startGame = document.querySelector('#start-game');

    startGame.addEventListener('click', () => {
      const header = document.querySelector('#navbar').firstElementChild.children;
      GamePlay.disableListeners(header);

      this.render.gridContainer[1].style.backgroundColor = 'rgba(0,0,0,0)';
      this.render.displayTurn(0);

      const opponentBoardNodes = this.render.gridContainer[1].children;

      for (let i = 0; i < opponentBoardNodes.length; i += 1) {
        opponentBoardNodes[i].addEventListener('click', async () => {
          const coordinates = i.toString().split('').map(Number);
          if (coordinates.length < 2) {
            coordinates.unshift(0);
          }

          if (this.player1.turn) {
            if (this.player2.gameBoard.receiveAttack(coordinates[0], coordinates[1])) {
              this.render.displayAttack(coordinates[0], coordinates[1], 1);
              this.player1.turn = false;
              this.player2.turn = true;
              this.render.displayTurn(1);

              if (this.declareWinner(this.player1, this.player2, opponentBoardNodes)) {
                const opponentGrid = this.render.grid[1];
                this.render.grid[1] = GamePlay.updateOpponentGrid(opponentBoardNodes, opponentGrid);
                document.addEventListener('keydown', this.resetGame.bind(this));
                return;
              }
            }
          }
          await this.computerMove();
        });
      }
    });
  }

  static updateOpponentGrid(nodes, grid) {
    let nodeIndex = 0;
    while (nodeIndex < nodes.length) {
      for (let i = 0; i < grid.length; i += 1) {
        for (let j = 0; j < grid.length; j += 1) {
          // eslint-disable-next-line no-param-reassign
          grid[i][j] = nodes[nodeIndex];
          nodeIndex += 1;
        }
      }
    }
    return grid;
  }

  computerMove() {
    return new Promise(() => {
      setTimeout(() => {
        if (this.player2.turn) {
          // eslint-disable-next-line no-constant-condition
          while (true) {
            const lat = Math.floor(Math.random() * 10);
            const lon = Math.floor(Math.random() * 10);
            if (this.player1.gameBoard.receiveAttack(lat, lon)) {
              this.render.displayAttack(lat, lon, 0);
              this.player1.turn = true;
              this.player2.turn = false;
              this.render.displayTurn(0);

              const opponentBoardNodes = this.render.gridContainer[1].children;
              if (this.declareWinner(this.player1, this.player2, opponentBoardNodes)) {
                const opponentGrid = this.render.grid[1];
                this.render.grid[1] = GamePlay.updateOpponentGrid(opponentBoardNodes, opponentGrid);
                document.addEventListener('keydown', this.resetGame.bind(this));
                return;
              }
              break;
            }
          }
        }
      }, 1000);
    });
  }
}
