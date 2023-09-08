export default class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.timesHit = 0;
    this.sunk = false;
  }

  hit() {
    this.timesHit += 1;
    this.isSunk();
  }

  isSunk() {
    if (this.length === this.timesHit) {
      this.sunk = true;
    }
  }
}
