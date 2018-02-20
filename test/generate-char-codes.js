// https://github.com/avajs/ava/blob/HEAD/docs/recipes/babelrc.md
// Transpiling source code
import 'babel-core/register';

import test from 'ava';
import generateCharCodes from '../src/generate-char-codes';

test('Test generateCharCodes()', async (t) => {
  const chars = 'ÂâÀàÁáÄäÃãÅåÊêÈèÉéËëÎîÌìÍíÏïÔôÒòÓóÖöÕõÛûÙùÚúÜüÑñÝýÿ';
  const arr = generateCharCodes(chars);

  const expected = [
    194, 226, 192, 224, 193, 225, 196, 228, 195, 227, 197, 229, // ÂâÀàÁáÄäÃãÅå
    202, 234, 200, 232, 201, 233, 203, 235, // ÊêÈèÉéËë
    206, 238, 204, 236, 205, 237, 207, 239, // ÎîÌìÍíÏï
    212, 244, 210, 242, 211, 243, 214, 246, 213, 245, // ÔôÒòÓóÖöÕõ
    219, 251, 217, 249, 218, 250, 220, 252, // ÛûÙùÚúÜü
    209, 241, 221, 253, 255, // ÑñÝýÿ
  ];

  const fromCharCode = String.fromCharCode(...arr);

  t.deepEqual(arr, expected);
  t.is(chars, fromCharCode);
});
