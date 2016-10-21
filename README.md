# Array sort-by

The motivation to create this function was to provide a mechanism that allow sort lists of elements, with the possibility to specify multiple sort criteria.

The library has been written as a **ES6 module** and the exported module has the following signature:

```javascript
/*
 * @param  {Array} array: the list of elements to sort
 * @param  {Function} parser: transforms each item and specifies the sort order
 * @return {Array}
 */
function sortBy(array, /*optional*/ parser);
```

The optional `parser` function transforms each element being iterated and sets the sort rules: ascending, descending, and multiple fields for sorting. It has the following signature:

```javascript
/*
 * @param  {Any} item: the element being iterated over the list
 * @param  {Number} index: the index of the element in the list
 * @return {Any}
 */
function parser(item, index);
```

## Examples

Default sorting (ASC)

```javascript
import sortBy from 'sort-by';

let arr = [10, 8, 5, 3, 0, 7, 4, 5, 1];
sortBy(arr);

// expected:
// [0,1,3,4,5,5,7,8,10]
```

Sorting DESC

```javascript
import sortBy from 'sort-by';

let arr = [5, 1, 8, 0, 3, 7, 10, 4, 3, 8];
sortBy(arr, n => -n);

// expected:
// [10,8,8,7,5,4,3,3,1,0]
```

Sorting DESC date-strings in format `'yyyy/MM/dd'` as `Date`

```javascript
import sortBy from 'sort-by';

let arr = ["1983/03/06", "1980/12/24", "1985/08/31", "1983/03/05"];
sortBy(arr, (s) => -new Date(s));

// expected:
// ["1985/08/31", "1983/03/06", "1983/03/05", "1980/12/24"]
```

Sorting DESC strings.
Because we use the minus **(-)** symbol to specify a descending order, it will produce a `NaN` value when is used with a `String` element. That's why the flag **`"desc:"`** is prefixed to the string items in the `parser` callback.

```javascript
let arr = ["1983/03/06", "1980/12/24", "1985/08/31", "1983/03/05"];
sortBy(arr, (s) => "desc:" + s);

// expected:
// ["1985/08/31", "1983/03/06", "1983/03/05", "1980/12/24"]
```

Sorting DESC by @n, after ASC by @d (as Date)

```javascript
import sortBy from 'sort-by';

let arr = [
  { n: 8, d: "1985/08/31" }, 
  { n: 2, d: "1980/12/24" }, 
  { n: 5, d: "1983/03/06" }, 
  { n: 8, d: "1983/03/06" }
];

sortBy(arr, (o) => [-o.n, new Date(o.d)]);

// expected:
// [{"n":8,"d":"1983/03/06"}, {"n":8,"d":"1985/08/31"}, {"n":5,"d":"1983/03/06"}, {"n":2,"d":"1980/12/24"}]
```

Sorting DESC by @name (ignore case sensitive)

```javascript
import sortBy from 'sort-by';

let arr = [
  { id: 4, name: "Pedro" },
  { id: 6, name: "Lucia" },
  { id: 7, name: "paco" },
  { id: 3, name: "luis" }
];

sortBy(arr, (o) => "DESC:" + o.name.toUpperCase());

// expected:
// [{"id":4,"name":"Pedro"},{"id":7,"name":"paco"},{"id":3,"name":"luis"},{"id":6,"name":"Lucia"}]
```

Let's try a more complex sort criteria.<br>
Sorting ASC by @name (ignore case sensitive), after DESC by @age, after ASC by @id

```javascript
import sortBy from 'sort-by';

let arr = [
  { id: 4, name: "pedro", age: 26 },
  { id: 6, name: "Pedro", age: 32 },
  { id: 7, name: "Luis", age: 26 },
  { id: 2, name: "luis", age: 26 }
];

sortBy(arr, (o) => [o.name.toUpperCase(), -o.age, o.id]);

// expected:
// {"id":2,"name":"luis","age":26}, {"id":7,"name":"Luis","age":26}, {"id":6,"name":"Pedro","age":32}, {"id":4,"name":"pedro","age":26}]
```
