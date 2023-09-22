import GameBoard from './gameboard.js';

export default class Player {
  constructor(name) {
    this.turn = true;
    this.gameBoard = new GameBoard(10);
    this.name = name;
  }
}
