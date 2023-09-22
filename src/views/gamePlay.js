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

  static declareWinner(player, opponent, opponentBoardNodes) {
    if (opponent.gameBoard.allShipsSunk()) {
      const winner = document.createElement('h2');
      winner.innerText = `${player.name} wins`;
      document.body.appendChild(winner);
      GamePlay.disableOpponentBoard(opponentBoardNodes);
    }
  }

  static disableOpponentBoard(element) {
    for (let index = 0; index < element.length; index += 1) {
      const clonedElement = element[index].cloneNode(true);
      element[index].parentNode.replaceChild(clonedElement, element[index]);
    }
  }

  enableOpponentBoard() {
    const startGame = document.querySelector('#start-game');

    startGame.addEventListener('click', () => {
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

              GamePlay.declareWinner(this.player1, this.player2, opponentBoardNodes);
            }
          }
          await this.computerMove();
        });
      }
    });
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

              GamePlay.declareWinner(this.player2, this.player1);
              break;
            }
          }
        }
      }, 1000);
    });
  }
}
