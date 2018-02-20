import test from 'ava';
import sortBy from '../dist/sort-by.min';

test('Sorting DESC by @name', async (t) => {
  const arr = [
    {id: 4, name: 'Pedro'},
    {id: 6, name: 'Lucía'},
    {id: 7, name: 'paco'},
    {id: 3, name: 'luis'},
  ];

  const expected = [
    {id: 4, name: 'Pedro'},
    {id: 7, name: 'paco'},
    {id: 3, name: 'luis'},
    {id: 6, name: 'Lucía'},
  ];

  sortBy(arr, item => `DESC:${item.name}`);
  t.deepEqual(arr, expected);
});
