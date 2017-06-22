# Array sortBy

<!-- markdownlint-disable MD033 MD034 MD014 -->

Sorts an array and allows specify multiple sorting criteria.
It has support for accented characters, and also ignore case sensitive.

## Content

1. [Getting started](#getting-started)
1. [Including the library](#including-the-library)
1. [Examples](#examples)
1. [Polyfills](#polyfills)
1. [Running the project](#running-the-project)

## Getting started

To include this library into your package manager with `npm` or `yarn`

```shell
# with npm
$ npm install array-sort-by --save

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
<script src="https://cdn.rawgit.com/jherax/array-sort-by/1.1.0/dist/sort-by.min.js"></script>
```

In the above case, the function [`sortBy`](#examples) is included as
global object in the browser.

As `sortBy` is built as [UMD] _(Universal Module Definition)_, it can
be included from module loaders such as [CommonJS], [ES2015 Export]
or [AMD RequireJS].

### CommonJS

```javascript
var sortBy = require('array-sort-by');
```

### ES2015 Export

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

See an example with RequireJS here: http://jsfiddle.net/FdKTn/73/

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

### Sorting DESC

```javascript
let arr = [5, 1, 8, 0, 3, 7, 10, 4, 3, 8];
sortBy(arr, n => -n);

/**
 * expected:
 * [10, 8, 8, 7, 5, 4, 3, 3, 1, 0]
 */
```

### Sorting DESC date-strings as `Date`

```javascript
let arr = ["1983/03/06", "1980/12/24", "1985/08/31", "1983/03/05"];
sortBy(arr, (s) => -new Date(s));

/**
 * expected:
 * ["1985/08/31", "1983/03/06", "1983/03/05", "1980/12/24"]
 */
```

### Sorting DESC strings

Because we use the minus **(-)** symbol to specify a descending order, it will produce a `NaN` value when is used with a `String` element. That's why the flag **`"desc:"`** is prefixed to the string items in the `parser` callback.

```javascript
let arr = ["1983/03/06", "1980/12/24", "1985/08/31", "1983/03/05"];
sortBy(arr, (s) => "desc:" + s);

/**
 * expected:
 * ["1985/08/31", "1983/03/06", "1983/03/05", "1980/12/24"]
 */
```

### Sorting accented words

```javascript
var arr = ['único', 'cosas', 'Árbol', 'fútbol', 'algo'];
sortBy(arr);
/**
 * expected:
 * ["algo", "Árbol", "cosas", "fútbol", "único"]
 */

sortBy(arr, item => 'desc:' + item);
/**
 * expected:
 * ["único", "fútbol", "cosas", "Árbol", "algo"]
 */
```

### Sorting accented words by @n

```javascript
var arr = [
  { n: 'Woche' },
  { n: 'wöchentlich' },
  { n: 'wäre' }
];

sortBy(arr, item => item.n);

/**
 * expected:
 * [
 *   { n: "wäre" },
 *   { n: "Woche" },
 *   { n: "wöchentlich" }
 * ]
 */
```

### Sorting DESC by @a, after ASC by @d (as Date)

```javascript
let arr = [
  { a: 8, d: "1985/08/31" },
  { a: 2, d: "1980/12/24" },
  { a: 5, d: "1983/03/06" },
  { a: 8, d: "1983/03/06" }
];

sortBy(arr, (o) => [-o.a, new Date(o.d)]);

/**
 * expected:
 * [
 *   { a: 8, d: "1983/03/06" },
 *   { a: 8, d: "1985/08/31" },
 *   { a: 5, d: "1983/03/06" },
 *   { a: 2, d: "1980/12/24" }
 * ]
 */
```

### Sorting DESC by @name

```javascript
let arr = [
  { id: 4, name: "Pedro" },
  { id: 6, name: "Lucía" },
  { id: 7, name: "paco" },
  { id: 3, name: "luis" }
];

sortBy(arr, item => "DESC:" + item.name);

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

### Sorting ASC by @name, after DESC by @age, after ASC by @a

```javascript
let arr = [
  { a: 4, age: 26, name: "pedro" },
  { a: 6, age: 32, name: "Pedro" },
  { a: 7, age: 26, name: "Maria" },
  { a: 2, age: 26, name: "maría" }
];

sortBy(arr, item => [item.name, -item.age, item.a]);

/**
 * expected:
 * [
 *   { a: 2, age: 26, name: "maría" },
 *   { a: 7, age: 26, name: "Maria" },
 *   { a: 6, age: 32, name: "Pedro" },
 *   { a: 4, age: 26, name: "pedro" }
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
<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
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

## Running the project

If you want to fork or build your own, you must run this project.

### Requirements

1. Git on [linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
   or [windows](https://git-for-windows.github.io/).
1. [Node.js](https://nodejs.org/en/) (latest stable version v6+).<br>
   It is preferable install [nvm](https://github.com/creationix/nvm)
   (node version manager).
1. [Yarn](https://yarnpkg.com/en/docs/cli/) installed as global package.

**NOTE**: Consider install Node Version Manager (**nvm**) to upgrade easily
the Node version.<br>Go to https://github.com/creationix/nvm and check the
installation process for your OS.

If you are running Windows, you can install [nvm-windows]. Follow every
step mentioned [here][nvm-windows-install] so that **nvm** will be correctly
installed to manage multiple installations of **Node** (with **npm**)
on a Windows computer.

### Building the project

Clone the repository:

```shell
$ git https://github.com/jherax/array-sort-by.git
```

If you don't have installed `yarn` as a global package, run this command:

```shell
$ npm install -g yarn
```

Now `yarn` will install dependencies in [`package.json`](package.json):

```shell
$ yarn
```

And finally execute the webpack task:

```shell
$ yarn run build
```

This command will lint the code with
[ESLint](http://eslint.org/docs/user-guide/getting-started)
and transpile the source files from `src/` to `dist/` as an [UMD] with
[Babel](https://babeljs.io/). It also generates the minified and source map
files.

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
[ES2015 Export]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
[AMD RequireJS]: http://requirejs.org/docs/api.html#jsfiles
[nvm-windows]: https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows
[nvm-windows-install]: https://github.com/coreybutler/nvm-windows#installation--upgrades
