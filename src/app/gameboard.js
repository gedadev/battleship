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
      destroyer: new Ship(3),
      patrolBoat: new Ship(2),
    };

    Object.values(ships).forEach((ship) => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        // Generate random coordinate in the grid
        const lat = Math.floor(Math.random() * (this.size - 0));
        const lon = Math.floor(Math.random() * (this.size - 0));

        if (this.board[lat][lon] === null) {
          // Validate vertical room
          if (ship.length + lat <= this.size
            && !this.validateVerticalCollisions(ship.length, lat, lon)) {
            for (let index = 0; index < ship.length; index += 1) {
              this.board[lat + index][lon] = ship.length;
            }
            break;
          }

          // Validate horizontal room
          if (ship.length + lon <= this.size
            && !this.validateHorizontalCollisions(ship.length, lat, lon)) {
            for (let index = 0; index < ship.length; index += 1) {
              this.board[lat][lon + index] = ship.length;
            }
            break;
          }
        }
      }
    });
  }

  validateVerticalCollisions(shipLength, lat, lon) {
    for (let index = 0; index < shipLength; index += 1) {
      if ((this.board[lat + index][lon] !== null)) {
        return true;
      }
    }
    return false;
  }

  validateHorizontalCollisions(shipLength, lat, lon) {
    for (let index = 0; index < shipLength; index += 1) {
      if ((this.board[lat][lon + index] !== null)) {
        return true;
      }
    }
    return false;
  }
}

const game = new GameBoard(10);
game.placeShips();
console.table(game.board);
