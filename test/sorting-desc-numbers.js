import test from 'ava';
import sortBy from '../dist/sort-by.min';

test('Sorting DESC: numbers', async (t) => {
  const arr = [5, 1, 8, 0, 3, 7, 10, 4, 3, 8];
  const expected = [10, 8, 8, 7, 5, 4, 3, 3, 1, 0];

  sortBy(arr, n => -n);
  t.deepEqual(arr, expected);
});
