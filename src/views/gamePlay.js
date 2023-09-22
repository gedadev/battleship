import Player from '../app/player.js';
import RenderGameBoard from './renderGameBoard.js';

export default class GamePlay {
  constructor() {
    this.player1 = new Player();
    this.player2 = new Player();
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
}
