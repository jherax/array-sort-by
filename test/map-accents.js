import test from 'ava';
import sortBy from '../dist/sort-by.min';

test('Register accents and replacements', async (t) => {
  sortBy.mapAccents(
    'ª@$',
    'aas',
  );

  const arr = ['$impson', 'Cªl@bazä', 'M@ría', 'Cal@bªzA'];
  const expected = ['Cªl@bazä', 'Cal@bªzA', 'M@ría', '$impson'];

  sortBy(arr);
  t.deepEqual(arr, expected);

  sortBy(arr, item => `DESC:${item}`);
  t.deepEqual(arr, expected.reverse());
});
