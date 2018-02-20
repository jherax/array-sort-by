/**
 * @private
 */
const ESCAPE_CHARS = /[.*+?^=!:${}()|\-[\]/\\]/g;

/**
 * Escapes the special characters in the entry parameter, so that
 * it can be used as a pattern in a regular expression constructor.
 *
 * @param  {String} text: special characters to escape
 * @return {String}
 */
export default function escapeRegExp(text) {
  return text.replace(ESCAPE_CHARS, '\\$&');
}
