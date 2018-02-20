import ignoreAccent from './ignore-accent';

/**
 * Creates a closure that encapsulates the default sorting function.
 *
 * @return {Function}
 */
export default function defaultSort() {
  const cache = {};

  /**
   * Defines the default sorting mode (ASC)
   *
   * @param  {Any} prev: element at n index to compare
   * @param  {Any} next: element at n+1 index to compare
   * @return {Number}
   */
  return function sort(prev, next) {
    if (typeof prev === 'string') {
      if (!(prev in cache)) cache[prev] = ignoreAccent(prev);
      if (!(next in cache)) cache[next] = ignoreAccent(next);
      prev = cache[prev];
      next = cache[next];
    }
    if (prev === next) return 0;
    return (prev > next ? 1 : -1);
  };
}
