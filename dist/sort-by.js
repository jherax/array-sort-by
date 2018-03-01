/*! sortBy@v1.2.1. Jherax 2018. Visit https://github.com/jherax/array-sort-by */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sortBy"] = factory();
	else
		root["sortBy"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ignoreAccent;

var _mapAccents = __webpack_require__(1);

var _escapeRegExp = __webpack_require__(4);

var _escapeRegExp2 = _interopRequireDefault(_escapeRegExp);

var _memoize = __webpack_require__(5);

var _memoize2 = _interopRequireDefault(_memoize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPattern = (0, _memoize2.default)(function (charCode) {
  var accent = (0, _escapeRegExp2.default)(String.fromCharCode(charCode));
  return new RegExp(accent, 'g');
});

/**
 * Replaces accented characters to its equivalent with no accent.
 *
 * @param  {String} text: the text to transform
 * @return {String}
 */
function ignoreAccent(text) {
  _mapAccents.CHARS.accents.forEach(function (charCode, i) {
    text = text.replace(getPattern(charCode), _mapAccents.CHARS.replacements[i]);
  });
  // ignores case sensitive
  return text.toUpperCase();
}
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CHARS = undefined;
exports.default = mapAccents;

var _generateCharCodes = __webpack_require__(3);

var _generateCharCodes2 = _interopRequireDefault(_generateCharCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unshift = Array.prototype.unshift;

var CHARS = exports.CHARS = {
  accents: [194, 226, 192, 224, 193, 225, 196, 228, 195, 227, 197, 229, // ÂâÀàÁáÄäÃãÅå
  202, 234, 200, 232, 201, 233, 203, 235, // ÊêÈèÉéËë
  206, 238, 204, 236, 205, 237, 207, 239, // ÎîÌìÍíÏï
  212, 244, 210, 242, 211, 243, 214, 246, 213, 245, // ÔôÒòÓóÖöÕõ
  219, 251, 217, 249, 218, 250, 220, 252, // ÛûÙùÚúÜü
  209, 241, 221, 253, 255],
  replacements: 'AaAaAaAaAaAaEeEeEeEeIiIiIiIiOoOoOoOoOoUuUuUuUuNnYyy'.split('')
};

/**
 * Registers a map of accents in order to sort strings correctly.
 *
 * @param {String} accents: the string with the accents
 * @param {String} replacements: the replacement for each accent
 */
function mapAccents(accents, replacements) {
  unshift.apply(CHARS.accents, (0, _generateCharCodes2.default)(accents));
  unshift.apply(CHARS.replacements, replacements.split(''));
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sortBy;

var _ignoreAccent = __webpack_require__(0);

var _ignoreAccent2 = _interopRequireDefault(_ignoreAccent);

var _defaultSort = __webpack_require__(6);

var _defaultSort2 = _interopRequireDefault(_defaultSort);

var _sortItems = __webpack_require__(7);

var _sortItems2 = _interopRequireDefault(_sortItems);

var _mapAccents = __webpack_require__(1);

var _mapAccents2 = _interopRequireDefault(_mapAccents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sorts an array by allowing multiple sorting criteria.
 *
 * It applies the Schwartzian transform:
 * https://en.wikipedia.org/wiki/Schwartzian_transform
 *
 * Author: David Rivera
 * Github: https://github.com/jherax
 * License: "MIT"
 *
 * You can fork this project on github:
 * https://github.com/jherax/array-sort-by.git
 */
var normalizeString = function normalizeString(items) {
  items = [].concat(items);
  for (var i = items.length - 1; i >= 0; i -= 1) {
    if (typeof items[i] === 'string') {
      items[i] = (0, _ignoreAccent2.default)(items[i]);
    }
  }
  return items;
};

/**
 * @public
 *
 * Sorts an array by allowing multiple sorting criteria.
 *
 * @param  {Array} array: the list of elements to sort
 * @param  {Function} parser: transforms each item and specifies the sorting mode
 * @return {Array}
 */
function sortBy(array, parser) {
  var i = void 0,
      item = void 0;
  var arrLength = array.length;
  if (typeof parser !== 'function') {
    return array.sort((0, _defaultSort2.default)());
  }
  // Schwartzian transform (decorate-sort-undecorate)
  for (i = arrLength; i;) {
    item = array[i -= 1];
    // decorate the array
    array[i] = [].concat(normalizeString(parser.call(null, item, i)), item);
  }
  // console.log('decorated:', JSON.stringify(array));
  array.sort(_sortItems2.default);
  // undecorate the array
  for (i = arrLength; i;) {
    item = array[i -= 1];
    array[i] = item[item.length - 1];
  }
  return array;
}

sortBy.mapAccents = _mapAccents2.default;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateCharCodes;
/**
 * Gets the char-code value for every character in a text.
 *
 * @param  {String} text: the values to be translated to the unicode char-code
 * @return {Array<Number>}
 */
function generateCharCodes(text) {
  var charcodes = [];
  for (var i = 0; i < text.length; i += 1) {
    charcodes.push(text.charCodeAt(i));
  }
  return charcodes;
}
module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = escapeRegExp;
/**
 * @private
 */
var ESCAPE_CHARS = /[.*+?^=!:${}()|\-[\]/\\]/g;

/**
 * Escapes the special characters in the entry parameter, so that
 * it can be used as a pattern in a regular expression constructor.
 *
 * @param  {String} text: special characters to escape
 * @return {String}
 */
function escapeRegExp(text) {
  return text.replace(ESCAPE_CHARS, '\\$&');
}
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = memoize;
/**
 * High-order function that memoizes a function, by creating a scope
 * to store the result of each function call, returning the cached
 * result when the same inputs is given.
 *
 * @description
 * Memoization is an optimization technique used primarily to speed up
 * functions by storing the results of expensive function calls, and returning
 * the cached result when the same inputs occur again.
 *
 * Each time a memoized function is called, its parameters are used as keys to index the cache.
 * If the index (key) is present, then it can be returned, without executing the entire function.
 * If the index is not cached, then all the body of the function is executed, and the result is
 * added to the cache.
 *
 * @see https://www.sitepoint.com/implementing-memoization-in-javascript/
 * @see https://gist.github.com/jherax/a3208b5c3d342a756008444ad81d8045
 *
 * @param  {Function} func: function to memoize
 * @return {Function}
 */
function memoize(func) {
  var cache = {};
  return function memoized() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var key = JSON.stringify(args);
    if (key in cache) return cache[key];
    cache[key] = func.apply(undefined, args);
    return cache[key];
  };
}
module.exports = exports["default"];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultSort;

var _ignoreAccent = __webpack_require__(0);

var _ignoreAccent2 = _interopRequireDefault(_ignoreAccent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a closure that encapsulates the default sorting function.
 *
 * @return {Function}
 */
function defaultSort() {
  var cache = {};

  /**
   * Defines the default sorting mode (ASC)
   *
   * @param  {Any} prev: element at n index to compare
   * @param  {Any} next: element at n+1 index to compare
   * @return {Number}
   */
  return function sort(prev, next) {
    if (typeof prev === 'string') {
      if (!(prev in cache)) cache[prev] = (0, _ignoreAccent2.default)(prev);
      if (!(next in cache)) cache[next] = (0, _ignoreAccent2.default)(next);
      prev = cache[prev];
      next = cache[next];
    }
    if (prev === next) return 0;
    return prev > next ? 1 : -1;
  };
}
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sortItems;
var DESC = /^desc:\s*/i;

/**
 * @private
 *
 * Compares each element and defines the sorting mode.
 * @see http://ow.ly/UvDD309zozK
 *
 * @param  {Any} prev: n element to compare
 * @param  {Any} next: n+1 element to compare
 * @return {Number}
 */
function comparer(prev, next) {
  var asc = 1;
  if (typeof prev === 'string') {
    if (DESC.test(prev)) asc = -1;
  }
  if (prev === next) return 0;
  return (prev > next ? 1 : -1) * asc;
}

/**
 * Compares each decorated element.
 *
 * @param  {Array} prevItems: decorated element at n index to compare
 * @param  {Array} nextItems: decorated element at n+1 index to compare
 * @return {Number}
 */
function sortItems(prevItems, nextItems) {
  var i = void 0,
      ordered = void 0;
  for (i in prevItems) {
    // eslint-disable-line
    ordered = comparer(prevItems[i], nextItems[i]);
    if (ordered) return ordered;
  }
  return 0;
}
module.exports = exports['default'];

/***/ })
/******/ ]);
});