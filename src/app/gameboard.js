export default class GameBoard {
  constructor(size) {
    this.size = size;
    this.board = this.generateBoard();
  }

  generateBoard() {
    return new Array(this.size).fill(null).map(() => new Array(this.size).fill(null));
  }
}
