/*
function generateUnicode() {
  const charcodes = [];
  const chars = 'ÂâÀàÁáÄäÃãÅåÊêÈèÉéËëÎîÌìÍíÏïÔôÒòÓóÖöÕõÛûÙùÚúÜüÑñÝýÿ';
  for (let i = 0; i < chars.length; i += 1) {
    charcodes.push(chars.charCodeAt(i));
  }
  return charcodes;
}
*/

// TODO: Issue #3: Allow extend accented characters, by mapping the value to translate

// Unicode values
const accent =
  String.fromCharCode(
    194, 226, 192, 224, 193, 225, 196, 228, 195, 227, 197, 229, // ÂâÀàÁáÄäÃãÅå
    202, 234, 200, 232, 201, 233, 203, 235, // ÊêÈèÉéËë
    206, 238, 204, 236, 205, 237, 207, 239, // ÎîÌìÍíÏï
    212, 244, 210, 242, 211, 243, 214, 246, 213, 245, // ÔôÒòÓóÖöÕõ
    219, 251, 217, 249, 218, 250, 220, 252, // ÛûÙùÚúÜü
    209, 241, 221, 253, 255, // ÑñÝýÿ
  );

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
