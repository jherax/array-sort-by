/**
 * Gets the char-code value for every character in a text.
 *
 * @param  {String} text: the values to be translated to the unicode char-code
 * @return {Array<Number>}
 */
export default function generateCharCodes(text) {
  const charcodes = [];
  for (let i = 0; i < text.length; i += 1) {
    charcodes.push(text.charCodeAt(i));
  }
  return charcodes;
}
