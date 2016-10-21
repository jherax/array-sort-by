/**
 * Sort an array and allows multiple sort criteria.
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

const _DESC = (/^desc:\s*/i);

/**
 * @private
 *
 * Tests whether the input value is a string and has set the flag for descending order.
 *
 * @param  {Any} v: the value to test
 * @return {Boolean}
 */
const isDesc = (v) => typeof v === 'string' && _DESC.test(v);

/**
 * @private
 *
 * Compares each element and defines the sort order.
 *
 * @param  {Any} prev: n element to compare
 * @param  {Any} next: n+1 element to compare
 * @return {Number}
 */
function comparer(prev, next) {
  let asc = 1;
  if (prev === next) return 0;
  if (isDesc(prev)) asc = -1;
  return (prev > next ? 1 : -1) * asc;
}

/**
 * @private
 *
 * Compares each decorated element.
 *
 * @param  {Array} aprev: n decorated element to compare
 * @param  {Array} anext: n+1 decorated element to compare
 * @return {Number}
 */
function sortItems(aprev, anext) {
  let sorted, i;
  for (i in aprev) { // eslint-disable-line
    sorted = comparer(aprev[i], anext[i]);
    if (sorted) return sorted;
  }
  return 0;
}

/**
 * @private
 *
 * Defines the default sort order (ASC)
 *
 * @param  {Any} prev: n element to compare
 * @param  {Any} next: n+1 element to compare
 * @return {Number}
 */
const defaultSort  = (p, n) => p < n ? -1 : +(p > n);

/*
 * @public
 *
 * Sort an array and allows multiple sort criteria.
 *
 * @param  {Array} array: the collection to sort
 * @param  {Function} parser: transforms each item and specifies the sort order
 * @return {Array}
 */
function sortBy(array, parser) {
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

// Members exported
export default sortBy;
