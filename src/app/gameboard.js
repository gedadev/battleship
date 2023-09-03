// eslint-disable-next-line import/extensions
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

        // Validate vertical room
        if (ship.length + lat > this.size) {
          console.log('out of room');
        } else if (this.validateCollisions(ship.length, lat, lon)) {
          console.log('you hit another ship');
        } else {
          for (let index = 0; index < ship.length; index++) {
            this.board[lat + index][lon] = ship;
          }
          shipPlaced = true;
          break;
        }

        // Validate horizontal room
        if (ship.length + lon > this.size) {
          console.log('out of room');
        } else if (this.validateCollisions(ship.length, lat, lon)) {
          console.log('you hit another ship');
        } else {
          for (let index = 0; index < ship.length; index += 1) {
            this.board[lat][lon + index] = ship;
          }
          shipPlaced = true;
          break;
        }
      }
    });
  }

  validateCollisions(shipLength, lat, lon) {
    for (let index = 0; index < shipLength + 1; index += 1) {
      try {
        if ((this.board[lat][lon + index] !== null && this.board[lat + 1][lon + index] !== null)
         || (this.board[lat + index][lon] !== null && this.board[lat + index][lon + 1] !== null)) {
          return true;
        }
      } catch (error) {
        console.log('no room');
      }
    }
    return false;
  }
}

const game = new GameBoard(10);
game.placeShips();
console.table(game.board);
