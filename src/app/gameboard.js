// eslint-disable-next-line import/extensions
import Ship from './ship.js';

export default class GameBoard {
  constructor(size) {
    this.size = size;
    this.board = this.generateBoard();
    this.totalHits = [];
    this.ships = {};
  }

  generateBoard() {
    return new Array(this.size).fill(null).map(() => new Array(this.size).fill(null));
  }

  allShipsSunk() {
    return Object.values(this.ships).reduce((sunk, current) => {
      if (sunk && current.sunk) {
        return true;
      }
      return false;
    }, true);
  }

  receiveAttack(lat, lon) {
    for (let index = 0; index < this.totalHits.length; index += 1) {
      if (this.totalHits[index][0] === lat && this.totalHits[index][1] === lon) {
        return;
      }
    }

    this.totalHits.push([lat, lon]);

    if (this.board[lat][lon] !== null) {
      this.board[lat][lon].hit();
      console.log(`you hit a ship at [${lat}, ${lon}] coordinate`);
    } else {
      console.log(`hit failed at [${lat}, ${lon}] coordinate`);
    }
  }

  placeShipAtCoordinate(ship, lat, lon, position) {
    this.ships[ship.name] = ship;

    if (this.board[lat][lon] === null) {
      this.validateRoom(ship, lat, lon, position);
    } else {
      console.log('there is no room, try another coordinate');
    }
  }

  placeShipsRandomly() {
    this.ships = {
      carrier: new Ship('carrier', 5),
      battleship: new Ship('battleship', 4),
      submarine: new Ship('submarine', 3),
      destroyer: new Ship('destroyer', 3),
      patrolBoat: new Ship('patrolBoat', 2),
    };

    Object.values(this.ships).forEach((ship) => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        // Generate random coordinate in the grid
        const lat = Math.floor(Math.random() * (this.size - 0));
        const lon = Math.floor(Math.random() * (this.size - 0));

        if (this.board[lat][lon] === null) {
          if (this.validateRoom(ship, lat, lon)) {
            break;
          }
        }
      }
    });
  }

  validateRoom(ship, lat, lon, pos = null) {
    const position = pos === null ? Math.floor(Math.random() * (2)) : pos;

    if (position === 0) {
      if (ship.length + lat <= this.size
          && !this.validateVerticalCollisions(ship.length, lat, lon)) {
        for (let index = 0; index < ship.length; index += 1) {
          this.board[lat + index][lon] = ship;
        }
        return true;
      }
    } else if (ship.length + lon <= this.size
              && !this.validateHorizontalCollisions(ship.length, lat, lon)) {
      for (let index = 0; index < ship.length; index += 1) {
        this.board[lat][lon + index] = ship;
      }
      return true;
    }
    return false;
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
