import test from 'ava';
import sortBy from '../dist/sort-by.min';

test('Sorting ASC: strings', async (t) => {
  const arr = ['único', 'cosas', 'Árbol', 'fútbol', 'algo'];
  const expected = ['algo', 'Árbol', 'cosas', 'fútbol', 'único'];

  sortBy(arr);
  t.deepEqual(arr, expected);
});
