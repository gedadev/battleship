import GameBoard from './gameboard.js';

export default class Player {
  constructor() {
    this.turn = true;
    this.gameBoard = new GameBoard(10);
  }
}
