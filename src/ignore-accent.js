const accent = 'ÂâÀàÁáÄäÃãÅåÊêÈèÉéËëÎîÌìÍíÏïÔôÒòÓóÖöÕõÛûÙùÚúÜüÑñÝýÿ';
const normal = 'AaAaAaAaAaAaEeEeEeEeIiIiIiIiOoOoOoOoOoUuUuUuUuNnYyy';

/**
 * Converts the accented characters to its equivalent with no accent
 *
 * @param  {String} text: the text to transform
 * @return {String}
 */
export default function ignoreAccent(text) {
  const length = accent.length;
  for (let i = 0; i < length; i += 1) {
    text = text.replace(accent.charAt(i), normal.charAt(i));
  }
  // ignores case sensitive
  return text.toUpperCase();
}
