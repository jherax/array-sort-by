import ignoreAccent from './ignore-accent';

/**
 * Defines the default sorting order (ASC)
 *
 * @param  {Any} prev: element at n index to compare
 * @param  {Any} next: element at n+1 index to compare
 * @return {Number}
 */
export default function defaultSort(prev, next) {
  if (typeof prev === 'string') {
    prev = ignoreAccent(prev);
    next = ignoreAccent(next);
  }
  if (prev === next) return 0;
  return (prev > next ? 1 : -1);
}
