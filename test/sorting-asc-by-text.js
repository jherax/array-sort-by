import test from 'ava';
import sortBy from '../dist/sort-by.min';

test('Sorting ASC: accented words by @text', async (t) => {
  const arr = [
    {id: 10, text: 'Woche'},
    {id: 20, text: 'wöchentlich'},
    {id: 30, text: 'wäre'},
  ];

  const expected = [
    {id: 30, text: 'wäre'},
    {id: 10, text: 'Woche'},
    {id: 20, text: 'wöchentlich'},
  ];

  sortBy(arr, item => item.text);
  t.deepEqual(arr, expected);
});
