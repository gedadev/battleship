import Ship from './ship.js';

export default class GameBoard {
  constructor(size) {
    this.size = size;
    this.board = this.generateBoard();
  }

  generateBoard() {
    return new Array(this.size).fill(null).map(() => new Array(this.size).fill(null));
  }

  placeShips() {
    const ships = {
      carrier: new Ship(5),
      battleship: new Ship(4),
      submarine: new Ship(3),
      destroyer: new Ship(2),
    };

    Object.values(ships).forEach((ship) => {
      let shipPlaced = false;

      while (!shipPlaced) {
        // Generate random coordinate in the grid
        const lat = Math.floor(Math.random() * (this.size - 0));
        const lon = Math.floor(Math.random() * (this.size - 0));

        // Validate horizontal room
        if (ship.length + lon > this.size) {
          console.log('out of room');
        } else {
          for (let index = 0; index < ship.length; index++) {
            this.board[lat][lon + index] = ship;
          }
          shipPlaced = true;
          break;
        }

        // Validate vertical room
        if (ship.length + lat > this.size) {
          console.log('out of room');
        } else {
          for (let index = 0; index < ship.length; index++) {
            this.board[lat + index][lon] = ship;
          }
          shipPlaced = true;
          break;
        }
      }
    });
  }
}

const game = new GameBoard(5);
game.placeShips();
console.table(game.board);
