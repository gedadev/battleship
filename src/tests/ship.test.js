/* eslint-disable no-undef */
import Ship from '../app/ship';

test('sunk destroyer', () => {
  const destroyer = new Ship(2);
  destroyer.hit();
  destroyer.hit();

  expect(destroyer.sunk).toBe(true);
});

test('hit battleship', () => {
  const battleship = new Ship(4);
  battleship.hit();
  battleship.hit();

  expect(battleship.sunk).toBe(false);
});

test('hit carrier', () => {
  const carrier = new Ship(5);
  carrier.hit();
  carrier.hit();

  expect(carrier.sunk).toBe(false);
});

test('sink cruiser', () => {
  const cruiser = new Ship(3);
  cruiser.hit();
  cruiser.hit();
  cruiser.hit();

  expect(cruiser.sunk).toBe(true);
});
