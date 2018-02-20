const DESC = /^desc:\s*/i;

/**
 * @private
 *
 * Compares each element and defines the sorting mode.
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
  }
  if (prev === next) return 0;
  return (prev > next ? 1 : -1) * asc;
}

/**
 * Compares each decorated element.
 *
 * @param  {Array} prevItems: decorated element at n index to compare
 * @param  {Array} nextItems: decorated element at n+1 index to compare
 * @return {Number}
 */
export default function sortItems(prevItems, nextItems) {
  let i, ordered;
  for (i in prevItems) { // eslint-disable-line
    ordered = comparer(prevItems[i], nextItems[i]);
    if (ordered) return ordered;
  }
  return 0;
}
