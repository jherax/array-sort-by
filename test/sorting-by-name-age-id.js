import test from 'ava';
import sortBy from '../dist/sort-by.min';

test('Sorting ASC by @name, after DESC by @age, after ASC by @id', async (t) => {
  const arr = [
    {id: 9, age: 26, name: 'pedro'},
    {id: 6, age: 21, name: 'Pedro'},
    {id: 7, age: 26, name: 'Maria'},
    {id: 2, age: 26, name: 'maría'},
  ];

  const expected = [
    {id: 2, age: 26, name: 'maría'},
    {id: 7, age: 26, name: 'Maria'},
    {id: 9, age: 26, name: 'pedro'},
    {id: 6, age: 21, name: 'Pedro'},
  ];

  sortBy(arr, item => [item.name, -item.age, item.id]);
  t.deepEqual(arr, expected);
});
