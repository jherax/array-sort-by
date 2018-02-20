import test from 'ava';
import sortBy from '../dist/sort-by.min';

/**
 * Because we use the minus (-) symbol to specify a descending order,
 * it would produce a `NaN` value if used with a `String` value.
 * So the flag `"desc:"` (not case sensitive) is prefixed
 * to the string value in the `parser` callback.
 */
test('Sorting DESC: strings', async (t) => {
  const arr = ['único', 'cosas', 'Árbol', 'fútbol', 'algo'];
  const expected = ['único', 'fútbol', 'cosas', 'Árbol', 'algo'];

  sortBy(arr, item => `desc:${item}`);
  t.deepEqual(arr, expected);
});
