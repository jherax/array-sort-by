import test from 'ava';
import sortBy from '../dist/sort-by.min';

test('Sorting DESC: date-strings as Date', async (t) => {
  const arr = ['1983/03/06', '1980/12/24', '1985/08/31', '1983/03/05'];
  const expected = ['1985/08/31', '1983/03/06', '1983/03/05', '1980/12/24'];

  sortBy(arr, s => -new Date(s));
  t.deepEqual(arr, expected);
});
