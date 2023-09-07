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
    let lengthValidation = shipLength;
    let index = 0;
    if (shipLength + lat < this.size && lat !== 0) {
      lengthValidation += 1;
      index = -1;
    } else if (shipLength + lat >= this.size) {
      index -= 1;
    } else if (lat <= 0) {
      lengthValidation += 1;
    }

    if (lon - 1 < 0) {
      for (index; index < lengthValidation; index += 1) {
        if ((this.board[lat + index][lon] !== null)
            || (this.board[lat + index][lon + 1] !== null)) {
          return true;
        }
      }
    } else if (lon + 1 >= this.size) {
      for (index; index < lengthValidation; index += 1) {
        if ((this.board[lat + index][lon] !== null)
            || (this.board[lat + index][lon - 1] !== null)) {
          return true;
        }
      }
    } else {
      for (index; index < lengthValidation; index += 1) {
        if ((this.board[lat + index][lon] !== null)
            || (this.board[lat + index][lon - 1] !== null)
            || (this.board[lat + index][lon + 1] !== null)) {
          return true;
        }
      }
    }
    return false;
  }

  validateHorizontalCollisions(shipLength, lat, lon) {
    let lengthValidation = shipLength + 1;
    let index = -1;
    if (lon <= 0) {
      index = 0;
    } else if (shipLength + lon >= this.size) {
      lengthValidation -= 1;
    }

    if (lat + 1 >= this.size) {
      for (index; index < lengthValidation; index += 1) {
        if ((this.board[lat][lon + index] !== null)
        || (this.board[lat - 1][lon + index] !== null)) {
          return true;
        }
      }
    } else if (lat - 1 < 0) {
      for (index; index < lengthValidation; index += 1) {
        if ((this.board[lat][lon + index] !== null)
          || (this.board[lat + 1][lon + index] !== null)) {
          return true;
        }
      }
    } else {
      for (index; index < lengthValidation; index += 1) {
        if ((this.board[lat][lon + index] !== null)
          || (this.board[lat - 1][lon + index] !== null)
          || (this.board[lat + 1][lon + index] !== null)) {
          return true;
        }
      }
    }
    return false;
  }
}

const game = new GameBoard(10);
game.placeShips();
console.table(game.board);
