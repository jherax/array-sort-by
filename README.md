# Array sortBy

<!-- markdownlint-disable MD033 MD034 MD014 -->

Sorts an array and allows specify multiple sorting criteria.
It has support for accented characters, and ignores
case sensitive to sort strings correctly.

## Content

1. [Getting started](#getting-started)
1. [Including the library](#including-the-library)
1. [Examples](#examples)

## Getting started

To include this library into your package manager with `npm` or `yarn`

```shell
# with npm
$ npm install array-sort-by

# with yarn
$ yarn add array-sort-by
```

The `sortBy` function has the following signature:

```javascript
/**
 * @param  {Array} array: the list of elements to sort
 * @param  {Function} parser: (optional) transforms each item and specifies the sorting mode
 * @return {Array}
 */
sortBy(array: Array, parser: Function) : Array
sortBy(array: Array) : Array
```

The optional parameter `parser` is a function that transforms each element
being iterated and sets the sorting rules: _ascending_ or _descending_.
Here you can specify the way of sorting by multiple fields.

The `parser` callback has the following signature:

```javascript
/**
 * @param  {Any} item: the element being iterated over the list
 * @param  {Number} index: the index of the element in the list
 * @return {Any}
 */
parser(item: Any, index: Number) : Any
parser(item: Any) : Any
```

Also, a new static method `mapAccents` has been added to the `sortBy` function.
This method allows to register a map of accents in order to sort strings correctly.

Signature:

```javascript
/**
 * @param {String} accents: the string with the accents
 * @param {String} replacements: the replacement for each accent
 */
sortBy.mapAccents(accents: String, replacements: String) : void
```

> Problem solved: when you try order an array of non ASCII characters like this
`['é', 'a', 'ú', 'c']`, you will obtain a strange result `['c', 'e', 'á', 'ú']`.
That happens because `.sort()` does not work correctly with accented characters.

By default `mapAccents` has an internal mapping with accents and their replacements:

```javascript
"ÂâÀàÁáÄäÃãÅåÊêÈèÉéËëÎîÌìÍíÏïÔôÒòÓóÖöÕõÛûÙùÚúÜüÑñÝýÿ"
"AaAaAaAaAaAaEeEeEeEeIiIiIiIiOoOoOoOoOoUuUuUuUuNnYyy"
```

To register a new set of special characters you must provide their replacements:

```javascript
// register the special characters
sortBy.mapAccents(
  'ª@$',
  'aas',
);

const arr = ['$impson', 'Cªl@bazä', 'M@ría', 'Cal@bªzA'];
sortBy(arr);
/**
 * expected:
 * ["Cªl@bazä", "Cal@bªzA", "M@ría", "$impson"]
 *
 * translated as:
 * ["CALABAZA", "CALABAZA", "MARIA", "SIMPSON"]
 */

sortBy(arr, item => `DESC:${item}`);
/**
 * expected:
 * ["$impson", "M@ría", "Cal@bªzA", "Cªl@bazä"]
 *
 * translated as:
 * ["SIMPSON", "MARIA", "CALABAZA", "CALABAZA"]
 */
```

In the example above, after calling `sortBy.mapAccents()` we
added new accents and their replacements at the beginning of
the internal mapping, honoring the user mapping first:

```javascript
"ª@$ÂâÀàÁáÄäÃãÅåÊêÈèÉéËëÎîÌìÍíÏïÔôÒòÓóÖöÕõÛûÙùÚúÜüÑñÝýÿ"
"aasAaAaAaAaAaAaEeEeEeEeIiIiIiIiOoOoOoOoOoUuUuUuUuNnYyy"
```

[&#9751; Back to Index](#content)

## Including the library

`array-sort-by` can be included directly from a CDN in your site:

```html
<!-- from unpkg.com -->
<script src="https://unpkg.com/array-sort-by/dist/sort-by.min.js"></script>
<!-- from unpkg.com, including polyfills -->
<script src="https://unpkg.com/array-sort-by/dist/sort-by-full.min.js"></script>

<!-- from rawgit.com -->
<script src="https://cdn.rawgit.com/jherax/array-sort-by/1.2.1/dist/sort-by.min.js"></script>
<!-- from rawgit.com, including polyfills -->
<script src="https://cdn.rawgit.com/jherax/array-sort-by/1.2.1/dist/sort-by-full.min.js"></script>
```

In the above case, the function [`sortBy`](#examples) is included as
global object in the browser.

As `sortBy` is built as [UMD] _(Universal Module Definition)_, it can
be included from module loaders such as [CommonJS], [ES2015 Imports]
or [AMD RequireJS].

### CommonJS

```javascript
var sortBy = require('array-sort-by');
```

### ES2015 Imports

```javascript
import sortBy from 'array-sort-by';
```

### AMD

```javascript
// using RequireJS
requirejs.config({
  paths: {
    // remove the extension .js
    'array-sort-by': '<PATH>/sort-by.min'
  }
});
require(['array-sort-by'], function(sortBy) {
  sortBy(someArray);
});
```

See an example with RequireJS here: http://jsfiddle.net/FdKTn/75/

[&#9751; Back to Index](#content)

## Examples

### Default sorting (ASC)

```javascript
let arr = [10, 8, 5, 3, 0, 7, 4, 5, 1];
sortBy(arr);

/**
 * expected:
 * [0, 1, 3, 4, 5, 5, 7, 8, 10]
 */
```

### Sorting DESC: numbers

```javascript
let arr = [5, 1, 8, 0, 3, 7, 10, 4, 3, 8];
sortBy(arr, n => -n);

/**
 * expected:
 * [10, 8, 8, 7, 5, 4, 3, 3, 1, 0]
 */
```

### Sorting DESC: date-strings as Date

```javascript
let arr = ['1983/03/06', '1980/12/24', '1985/08/31', '1983/03/05'];
sortBy(arr, (s) => -new Date(s));

/**
 * expected:
 * ["1985/08/31", "1983/03/06", "1983/03/05", "1980/12/24"]
 */
```

### Sorting DESC: strings

Because we use the minus **(-)** symbol to specify a descending order,
it would produce a `NaN` value if used with a `String` value.
So the flag **`"desc:"`** (not case sensitive) is prefixed
to the string value in the `parser` callback.

```javascript
var arr = ['único', 'cosas', 'Árbol', 'fútbol', 'algo'];

sortBy(arr, item => 'desc:' + item);
/**
 * expected:
 * ["único", "fútbol", "cosas", "Árbol", "algo"]
 */

// sorting ASC: accented words
sortBy(arr);
/**
 * expected:
 * ["algo", "Árbol", "cosas", "fútbol", "único"]
 */
```

### Sorting ASC: accented words by @text

```javascript
var arr = [
  { id: 10, text: 'Woche' },
  { id: 20, text: 'wöchentlich' },
  { id: 30, text: 'wäre' }
];

sortBy(arr, item => item.text);

/**
 * expected:
 * [
 *   { id: 30, text: "wäre" },
 *   { id: 10, text: "Woche" },
 *   { id: 20, text: "wöchentlich" }
 * ]
 */
```

### Sorting DESC by @id, after ASC by @dob (as Date)

```javascript
let arr = [
  { id: 8, dob: '1985/08/31' },
  { id: 2, dob: '1980/12/24' },
  { id: 5, dob: '1983/03/06' },
  { id: 8, dob: '1983/03/06' }
];

sortBy(arr, (o) => [-o.id, new Date(o.dob)]);

/**
 * expected:
 * [
 *   { id: 8, dob: "1983/03/06" },
 *   { id: 8, dob: "1985/08/31" },
 *   { id: 5, dob: "1983/03/06" },
 *   { id: 2, dob: "1980/12/24" }
 * ]
 */
```

### Sorting DESC by @name

```javascript
let arr = [
  { id: 4, name: 'Pedro' },
  { id: 6, name: 'Lucía' },
  { id: 7, name: 'paco' },
  { id: 3, name: 'luis' }
];

sortBy(arr, item => `DESC:${item.name}`);

/**
 * expected:
 * [
 *   { id: 4, name: "Pedro" },
 *   { id: 7, name: "paco" },
 *   { id: 3, name: "luis" },
 *   { id: 6, name: "Lucía" }
 * ]
 */
```

### Sorting ASC by @name, after DESC by @age, after ASC by @id

```javascript
let arr = [
  { id: 9, age: 26, name: 'pedro' },
  { id: 6, age: 21, name: 'Pedro' },
  { id: 7, age: 26, name: 'Maria' },
  { id: 2, age: 26, name: 'maría' }
];

sortBy(arr, item => [item.name, -item.age, item.id]);

/**
 * expected:
 * [
 *   { id: 2, age: 26, name: "maría" },
 *   { id: 7, age: 26, name: "Maria" },
 *   { id: 9, age: 26, name: "pedro" },
 *   { id: 6, age: 21, name: "Pedro" }
 * ]
 */
```

[&#9751; Back to Index](#content)

## Versioning

This projects adopts the [Semantic Versioning](http://semver.org/)
(SemVer) guidelines:

```text
<MAJOR>.<MINOR>.<PATCH>
```

Given a version number MAJOR.MINOR.PATCH, increment the:

1. MAJOR version when you make incompatible API changes.
1. MINOR version when you add functionality in a backwards-compatible manner.
1. PATCH version when you make backwards-compatible bug fixes.

## Issues

To report an issue and keep traceability of bug-fixes, please report to:

- https://github.com/jherax/array-sort-by/issues

## License

This project has been released under the [ISC](https://opensource.org/licenses/ISC) license.
This license applies ONLY to the source of this repository and does not extend to any other distribution,
or any other 3rd party libraries used in a repository. See [LICENSE](LICENSE) file for more information.

<!-- LINKS -->

[UMD]: http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/
[CommonJS]: https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/
[ES2015 Imports]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
[AMD RequireJS]: http://requirejs.org/docs/api.html#jsfiles
