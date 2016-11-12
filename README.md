# Array sort-by

The motivation to create this function was to provide a mechanism that allow sort lists of elements, 
with the possibility to specify multiple sort criteria.

## Getting started

To include this library into your package manager with `npm` or `yarn`

```shell
# with npm
$ npm install array-sort-by --save

# with yarn
$ yarn add array-sort-by
```

The library has been written as an **ES2015 Module** and the exported module has the following signature:

```javascript
/*
 * @param  {Array} array: the list of elements to sort
 * @param  {Function} parser: transforms each item and specifies the sort order
 * @return {Array}
 */
function sortBy(array, /*optional*/ parser);
```

The optional `parser` function transforms each element being iterated and sets the sort rules: 
ascending, descending, and multiple fields for sorting. It has the following signature:

```javascript
/*
 * @param  {Any} item: the element being iterated over the list
 * @param  {Number} index: the index of the element in the list
 * @return {Any}
 */
function parser(item, index);
```

## Including the library

`array-sort-by` can be included directly from a CDN in your page:

```html
<!-- last version: 1.0.1 -->
<script src="https://cdn.rawgit.com/jherax/array-sort-by/1.0.1/dist/sort-by.min.js"></script>
``` 

As this library is built as an [UMD](http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/) 
(Universal Module Definition), it can be included from a module loader as AMD, CommonJS, or ES2015 Export.

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
requirejs.config({
  paths: {
    'array-sort-by': '<PATH>/sort-by.min'
  }
});
define(['array-sort-by'], function(sortBy) {
  sortBy(someArray);
});
```

## Examples

### Default sorting (ASC)

```javascript
let arr = [10, 8, 5, 3, 0, 7, 4, 5, 1];
sortBy(arr);

/*
 * expected:
 * [0, 1, 3, 4, 5, 5, 7, 8, 10]
 */
```

### Sorting DESC

```javascript
let arr = [5, 1, 8, 0, 3, 7, 10, 4, 3, 8];
sortBy(arr, n => -n);

/*
 * expected:
 * [10, 8, 8, 7, 5, 4, 3, 3, 1, 0]
 */
```

### Sorting DESC date-strings in format `'yyyy/MM/dd'` as `Date`

```javascript
let arr = ["1983/03/06", "1980/12/24", "1985/08/31", "1983/03/05"];
sortBy(arr, (s) => -new Date(s));

/*
 * expected:
 * ["1985/08/31", "1983/03/06", "1983/03/05", "1980/12/24"]
 */
```

### Sorting DESC strings.
Because we use the minus **(-)** symbol to specify a descending order, it will produce a `NaN` value when is used with a `String` element. That's why the flag **`"desc:"`** is prefixed to the string items in the `parser` callback.

```javascript
let arr = ["1983/03/06", "1980/12/24", "1985/08/31", "1983/03/05"];
sortBy(arr, (s) => "desc:" + s);

/*
 * expected:
 * ["1985/08/31", "1983/03/06", "1983/03/05", "1980/12/24"]
 */
```

### Sorting DESC by @n, after ASC by @d (as Date)

```javascript
let arr = [
  { n: 8, d: "1985/08/31" }, 
  { n: 2, d: "1980/12/24" }, 
  { n: 5, d: "1983/03/06" }, 
  { n: 8, d: "1983/03/06" }
];

sortBy(arr, (o) => [-o.n, new Date(o.d)]);

/*
 * expected:
 * [
 *   { n: 8, d: "1983/03/06" },
 *   { n: 8, d: "1985/08/31" },
 *   { n: 5, d: "1983/03/06" },
 *   { n: 2, d: "1980/12/24" }
 * ]
 */
```

### Sorting DESC by @name (ignore case sensitive)

```javascript
let arr = [
  { id: 4, name: "Pedro" },
  { id: 6, name: "Lucia" },
  { id: 7, name: "paco" },
  { id: 3, name: "luis" }
];

sortBy(arr, (o) => "DESC:" + o.name.toUpperCase());

/*
 * expected:
 * [
 *   { id: 4, name: "Pedro" },
 *   { id: 7, name: "paco" },
 *   { id: 3, name: "luis" },
 *   { id: 6, name: "Lucia" }
 * ]
 */
```

### Sorting ASC by @name (ignore case sensitive), after DESC by @age, after ASC by @id

```javascript
let arr = [
  { id: 4, name: "pedro", age: 26 },
  { id: 6, name: "Pedro", age: 32 },
  { id: 7, name: "Luis",  age: 26 },
  { id: 2, name: "luis",  age: 26 }
];

sortBy(arr, (o) => [o.name.toUpperCase(), -o.age, o.id]);

/*
 * expected:
 * [
 *   { id: 2, name: "luis",  age: 26 }, 
 *   { id: 7, name: "Luis",  age: 26 }, 
 *   { id: 6, name: "Pedro", age: 32 }, 
 *   { id: 4, name: "pedro", age: 26 }
 * ]
 */
```

## Running the project

If you want to fork or build your own, you must run this project.

### Requirements

1. Git ([git-linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) or [git-windows](https://git-for-windows.github.io/)).
2. [Node.js](https://nodejs.org/en/) (latest stable version v6+).
3. Node Package Manager ([npm](https://docs.npmjs.com/) v3+), the one that comes with your **node.js** version.<br/>
   It is preferable to install Node Version Manager - **[nvm](https://github.com/creationix/nvm)**, it contains both **node.js** and **npm**.
4. [Yarn](https://yarnpkg.com/en/docs/cli/) installed as a global package.

**NOTE**: Consider to install Node Version Manager (**NVM**) to upgrade easily the Node.js version.<br>
Go to https://github.com/creationix/nvm and check the installation process for your OS.

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

This command will lint the code with [ESLint](http://eslint.org/docs/user-guide/getting-started) and after that 
it will transpile with [Babel](https://babeljs.io/) the ES2015 Module in `src/` folder to an UMD ES5 Module in `dest/` 
and finally it will generate the minified and source map files.

## Versioning

This projects adopts the [Semantic Versioning](http://semver.org/) (SemVer) guidelines:

```
<MAJOR>.<MINOR>.<PATCH>
```

Given a version number MAJOR.MINOR.PATCH, increment the:

1. MAJOR version when you make incompatible API changes
2. MINOR version when you add functionality in a backwards-compatible manner
3. PATCH version when you make backwards-compatible bug fixes.

## Issues

To report an issue and keep traceability of bug-fixes, please report to:

* https://github.com/jherax/array-sort-by/issues

## License

This project has been released under the [ISC](https://opensource.org/licenses/ISC) license. 
This license applies ONLY to the source of this repository and does not extend to any other distribution, 
or any other 3rd party libraries used in a repository. See [LICENSE](LICENSE) file for more information.
