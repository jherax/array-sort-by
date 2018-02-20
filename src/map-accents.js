import generateCharCodes from './generate-char-codes';

const unshift = Array.prototype.unshift;

export const CHARS = {
  accents: [
    194, 226, 192, 224, 193, 225, 196, 228, 195, 227, 197, 229, // ÂâÀàÁáÄäÃãÅå
    202, 234, 200, 232, 201, 233, 203, 235, // ÊêÈèÉéËë
    206, 238, 204, 236, 205, 237, 207, 239, // ÎîÌìÍíÏï
    212, 244, 210, 242, 211, 243, 214, 246, 213, 245, // ÔôÒòÓóÖöÕõ
    219, 251, 217, 249, 218, 250, 220, 252, // ÛûÙùÚúÜü
    209, 241, 221, 253, 255, // ÑñÝýÿ
  ],
  replacements: 'AaAaAaAaAaAaEeEeEeEeIiIiIiIiOoOoOoOoOoUuUuUuUuNnYyy'.split(''),
};

/**
 * Registers a map of accents in order to sort strings correctly.
 *
 * @param {String} accents: the string with the accents
 * @param {String} replacements: the replacement for each accent
 */
export default function mapAccents(accents, replacements) {
  unshift.apply(CHARS.accents, generateCharCodes(accents));
  unshift.apply(CHARS.replacements, replacements.split(''));
}
