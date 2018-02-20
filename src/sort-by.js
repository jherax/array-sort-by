/**
 * Sorts an array by allowing multiple sorting criteria.
 *
 * It applies the Schwartzian transform:
 * https://en.wikipedia.org/wiki/Schwartzian_transform
 *
 * Author: David Rivera
 * Github: https://github.com/jherax
 * License: "MIT"
 *
 * You can fork this project on github:
 * https://github.com/jherax/array-sort-by.git
 */
import ignoreAccent from './ignore-accent';
import defaultSort from './default-sort';
import sortItems from './sort-items';
import mapAccents from './map-accents';

const normalizeString = (items) => {
  items = [].concat(items);
  for (let i = items.length - 1; i >= 0; i -= 1) {
    if (typeof items[i] === 'string') {
      items[i] = ignoreAccent(items[i]);
    }
  }
  return items;
};

/**
 * @public
 *
 * Sorts an array by allowing multiple sorting criteria.
 *
 * @param  {Array} array: the list of elements to sort
 * @param  {Function} parser: transforms each item and specifies the sorting mode
 * @return {Array}
 */
export default function sortBy(array, parser) {
  let i, item;
  const arrLength = array.length;
  if (typeof parser !== 'function') {
    return array.sort(defaultSort());
  }
  // Schwartzian transform (decorate-sort-undecorate)
  for (i = arrLength; i;) {
    item = array[i -= 1];
    // decorate the array
    array[i] = [].concat(
      normalizeString(parser.call(null, item, i)),
      item,
    );
  }
  // console.log('decorated:', JSON.stringify(array));
  array.sort(sortItems);
  // undecorate the array
  for (i = arrLength; i;) {
    item = array[i -= 1];
    array[i] = item[item.length - 1];
  }
  return array;
}

sortBy.mapAccents = mapAccents;
