/*! sortBy@v1.1.2. Jherax 2017. Visit https://github.com/jherax/array-sort-by */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sortBy"] = factory();
	else
		root["sortBy"] = factory();
})(this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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
var accent = String.fromCharCode(194, 226, 192, 224, 193, 225, 196, 228, 195, 227, 197, 229, // ÂâÀàÁáÄäÃãÅå
202, 234, 200, 232, 201, 233, 203, 235, // ÊêÈèÉéËë
206, 238, 204, 236, 205, 237, 207, 239, // ÎîÌìÍíÏï
212, 244, 210, 242, 211, 243, 214, 246, 213, 245, // ÔôÒòÓóÖöÕõ
219, 251, 217, 249, 218, 250, 220, 252, // ÛûÙùÚúÜü
209, 241, 221, 253, 255); // ÑñÝýÿ

var normal = 'AaAaAaAaAaAaEeEeEeEeIiIiIiIiOoOoOoOoOoUuUuUuUuNnYyy';

/**
 * Converts the accented characters to its equivalent with no accent
 *
 * @param  {String} text: the text to transform
 * @return {String}
 */
function ignoreAccent(text) {
  var length = accent.length;
  for (var i = 0; i < length; i += 1) {
    text = text.replace(accent.charAt(i), normal.charAt(i));
  }
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
exports.default = sortBy;

var _ignoreAccent = __webpack_require__(0);

var _ignoreAccent2 = _interopRequireDefault(_ignoreAccent);

var _defaultSort = __webpack_require__(2);

var _defaultSort2 = _interopRequireDefault(_defaultSort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sorts an array and allows multiple sorting criteria.
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
var DESC = /^desc:\s*/i;

/**
 * @private
 *
 * Compares each element and defines the sorting order.
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
    prev = (0, _ignoreAccent2.default)(prev);
    next = (0, _ignoreAccent2.default)(next);
  }
  if (prev === next) return 0;
  return (prev > next ? 1 : -1) * asc;
}

/**
 * @private
 *
 * Compares each decorated element.
 *
 * @param  {Array} aprev: decorated element at n index to compare
 * @param  {Array} anext: decorated element at n+1 index to compare
 * @return {Number}
 */
function sortItems(aprev, anext) {
  var i = void 0,
      ordered = void 0;
  for (i in aprev) {
    // eslint-disable-line
    ordered = comparer(aprev[i], anext[i]);
    if (ordered) return ordered;
  }
  return 0;
}

/**
 * @public
 *
 * Sorts an array and allows multiple sorting criteria.
 *
 * @param  {Array} array: the collection to sort
 * @param  {Function} parser: transforms each item and specifies the sorting order
 * @return {Array}
 */
function sortBy(array, parser) {
  var i = void 0,
      item = void 0;
  var arrLength = array.length;
  if (typeof parser === 'undefined') {
    return array.sort(_defaultSort2.default);
  }
  // Schwartzian transform (decorate-sort-undecorate)
  for (i = arrLength; i;) {
    item = array[i -= 1];
    // decorate the array
    array[i] = [].concat(parser.call(null, item, i), item);
    // console.log('decorated: ', array[i]);
  }
  // sort the array
  array.sort(sortItems);
  // undecorate the array
  for (i = arrLength; i;) {
    item = array[i -= 1];
    array[i] = item[item.length - 1];
  }
  return array;
}
module.exports = exports['default'];

/***/ }),
/* 2 */
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
 * Defines the default sorting order (ASC)
 *
 * @param  {Any} prev: element at n index to compare
 * @param  {Any} next: element at n+1 index to compare
 * @return {Number}
 */
function defaultSort(prev, next) {
  if (typeof prev === 'string') {
    prev = (0, _ignoreAccent2.default)(prev);
    next = (0, _ignoreAccent2.default)(next);
  }
  if (prev === next) return 0;
  return prev > next ? 1 : -1;
}
module.exports = exports['default'];

/***/ })
/******/ ]);
});