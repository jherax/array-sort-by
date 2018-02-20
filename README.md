# Array sortBy

<!-- markdownlint-disable MD033 MD034 MD014 -->

Sorts an array and allows specify multiple sorting criteria.
It has support for accented characters, and also ignore case sensitive.

## Content

1. [Getting started](#getting-started)
1. [Including the library](#including-the-library)
1. [Examples](#examples)
1. [Polyfills](#polyfills)

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
 * @param  {Array} array: the collection of elements to sort
 * @param  {Function} parser: transforms each item and specifies the sorting order
 * @return {Array}
 */
sortBy(array: Array, parser: Function) : Array
sortBy(array: Array) : Array
```

The optional parameter `parser` is a function that transforms each element
being iterated and sets the sorting rules: _ascending_ or _descending_, and
the option to specify multiple fields for sorting.

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

[&#9751; Back to Index](#content)

## Including the library

`array-sort-by` can be included directly from a CDN in your site:

```html
<!-- from unpkg.com -->
<script src="https://unpkg.com/array-sort-by/dist/sort-by.min.js"></script>

<!-- or from rawgit.com -->
<script src="https://cdn.rawgit.com/jherax/array-sort-by/1.1.2/dist/sort-by.min.js"></script>
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

### Sorting DESC: date-strings as `Date`

```javascript
let arr = ["1983/03/06", "1980/12/24", "1985/08/31", "1983/03/05"];
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

## Polyfills

This library is written using some of the new ES5/ES6 features. If you have
to support Non-standard-compliant browsers like Internet Explorer, you can
polyfill some of the missing features with the following alternatives:

**Using [es6-shim](https://github.com/paulmillr/es6-shim)**

```html
<!-- put this script FIRST, before all other scripts -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.35.3/es6-shim.min.js"></script>
```

**Using [polyfill.io](https://polyfill.io/v2/docs/)**

```html
<!-- put this script FIRST, before all other scripts -->
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default-3.3"></script>
```

[Polyfill.io](https://polyfill.io/v2/docs/examples) reads the `User-Agent`
header of each request and returns the polyfills that are suitable for the
requesting browser.

If you want to request specific polyfills, you can pass a query parameter
to the url, for example:

```html
<!--[if IE]>
<script src="https://polyfill.io/v2/polyfill.min.js?features=default-3.3&flags=always"></script>
<![endif]-->
```

Read the list of available features:
[Features and Browsers Supported](https://polyfill.io/v2/docs/features/).

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
