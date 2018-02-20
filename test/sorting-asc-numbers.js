import test from 'ava';
import sortBy from '../dist/sort-by.min';

test('Default sorting (ASC)', async (t) => {
  const arr = [10, 8, 5, 3, 0, 7, 4, 5, 1];
  const expected = [0, 1, 3, 4, 5, 5, 7, 8, 10];

  sortBy(arr);
  t.deepEqual(arr, expected);
});
