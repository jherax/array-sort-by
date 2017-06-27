/**
 * Sorts an array and allows multiple sorting criteria.
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

const DESC = /^desc:\s*/i;

/**
 * @private
 *
 * Compares each element and defines the sorting order.
 * @see http://ow.ly/UvDD309zozK
 *
 * @param  {Any} prev: n element to compare
 * @param  {Any} next: n+1 element to compare
 * @return {Number}
 */
function comparer(prev, next) {
  let asc = 1;
  if (typeof prev === 'string') {
    if (DESC.test(prev)) asc = -1;
    prev = ignoreAccent(prev);
    next = ignoreAccent(next);
  }
  if (prev === next) return 0;
  return (prev > next ? 1 : -1) * asc;
}

/**
 * @private
 *
 * Compares each decorated element.
 *
 * @param  {Array} aprev: decorated element at n index to compare
 * @param  {Array} anext: decorated element at n+1 index to compare
 * @return {Number}
 */
function sortItems(aprev, anext) {
  let i, ordered;
  for (i in aprev) { // eslint-disable-line
    ordered = comparer(aprev[i], anext[i]);
    if (ordered) return ordered;
  }
  return 0;
}

/**
 * @public
 *
 * Sorts an array and allows multiple sorting criteria.
 *
 * @param  {Array} array: the collection to sort
 * @param  {Function} parser: transforms each item and specifies the sorting order
 * @return {Array}
 */
export default function sortBy(array, parser) {
  let i, item;
  const arrLength = array.length;
  if (typeof parser === 'undefined') {
    return array.sort(defaultSort);
  }
  // Schwartzian transform (decorate-sort-undecorate)
  for (i = arrLength; i;) {
    item = array[i -= 1];
    // decorate the array
    array[i] = [].concat(parser.call(null, item, i), item);
    // console.log('decorated: ', array[i]);
  }
  // sort the array
  array.sort(sortItems);
  // undecorate the array
  for (i = arrLength; i;) {
    item = array[i -= 1];
    array[i] = item[item.length - 1];
  }
  return array;
}
