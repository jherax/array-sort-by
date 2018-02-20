import {CHARS} from './map-accents';
import escapeRegExp from './escapeRegExp';
import memoize from './memoize';

const getPattern = memoize((charCode) => {
  const accent = escapeRegExp(String.fromCharCode(charCode));
  return new RegExp(accent, 'g');
});

/**
 * Replaces accented characters to its equivalent with no accent.
 *
 * @param  {String} text: the text to transform
 * @return {String}
 */
export default function ignoreAccent(text) {
  CHARS.accents.forEach((charCode, i) => {
    text = text.replace(getPattern(charCode), CHARS.replacements[i]);
  });
  // ignores case sensitive
  return text.toUpperCase();
}
