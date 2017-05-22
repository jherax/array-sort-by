/*! sortBy@v1.0.3a. Jherax 2017. Visit https://github.com/jherax/array-sort-by */
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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = sortBy;
	/**
	 * Sorts an array and allows multiple sort criteria.
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

	var _DESC = /^desc:\s*/i;

	/**
	 * @private
	 *
	 * Tests whether the input value is a string and has set the flag for descending order.
	 *
	 * @param  {Any} v: the value to test
	 * @return {Boolean}
	 */
	var isDesc = function isDesc(v) {
	  return typeof v === 'string' && _DESC.test(v);
	};

	/**
	 * @private
	 *
	 * Compares each element and defines the sort order.
	 *
	 * @param  {Any} prev: n element to compare
	 * @param  {Any} next: n+1 element to compare
	 * @return {Number}
	 */
	function comparer(prev, next) {
	  var asc = 1;
	  // TODO: Add support for accented characters
	  // See http://ow.ly/UvDD309zozK
	  // e.g. return a.localeCompare(b);
	  if (prev === next) return 0;
	  if (isDesc(prev)) asc = -1;
	  return (prev > next ? 1 : -1) * asc;
	}

	/**
	 * @private
	 *
	 * Compares each decorated element.
	 *
	 * @param  {Array} aprev: n decorated element to compare
	 * @param  {Array} anext: n+1 decorated element to compare
	 * @return {Number}
	 */
	function sortItems(aprev, anext) {
	  var i = void 0,
	      sorted = void 0;
	  for (i in aprev) {
	    // eslint-disable-line
	    sorted = comparer(aprev[i], anext[i]);
	    if (sorted) return sorted;
	  }
	  return 0;
	}

	/**
	 * @private
	 *
	 * Defines the default sort order (ASC)
	 *
	 * @param  {Any} prev: n element to compare
	 * @param  {Any} next: n+1 element to compare
	 * @return {Number}
	 */
	function defaultSort(prev, next) {
	  return prev < next ? -1 : +(prev > next);
	}

	/**
	 * @public
	 *
	 * Sorts an array and allows multiple sort criteria.
	 *
	 * @export
	 * @param  {Array} array: the collection to sort
	 * @param  {Function} parser: transforms each item and specifies the sort order
	 * @return {Array}
	 */
	function sortBy(array, parser) {
	  var i = void 0,
	      item = void 0;
	  var arrLength = array.length;
	  if (typeof parser === 'undefined') {
	    return array.sort(defaultSort);
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

/***/ }
/******/ ])
});
;