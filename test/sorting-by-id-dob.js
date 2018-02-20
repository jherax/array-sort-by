import test from 'ava';
import sortBy from '../dist/sort-by.min';

test('Sorting DESC by @id, after ASC by @dob (as Date)', async (t) => {
  const arr = [
    {id: 8, dob: '1985/08/31'},
    {id: 2, dob: '1980/12/24'},
    {id: 5, dob: '1983/03/06'},
    {id: 8, dob: '1983/03/06'},
  ];

  const expected = [
    {id: 8, dob: '1983/03/06'},
    {id: 8, dob: '1985/08/31'},
    {id: 5, dob: '1983/03/06'},
    {id: 2, dob: '1980/12/24'},
  ];

  sortBy(arr, o => [-o.id, new Date(o.dob)]);
  t.deepEqual(arr, expected);
});
