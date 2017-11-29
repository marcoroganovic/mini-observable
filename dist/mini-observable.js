/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.idle = exports.of = exports.interval = exports.fromPromise = exports.fromEvent = undefined;

var _Observable = __webpack_require__(1);

var _Observable2 = _interopRequireDefault(_Observable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fromEvent = exports.fromEvent = _Observable2.default.fromEvent;
var fromPromise = exports.fromPromise = _Observable2.default.fromPromise;
var interval = exports.interval = _Observable2.default.interval;
var of = exports.of = _Observable2.default.of;
var idle = exports.idle = _Observable2.default.idle;
window.Observable = _Observable2.default;
exports.default = _Observable2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observable = function () {
  _createClass(Observable, null, [{
    key: "asBus",
    value: function asBus() {
      var _this = this;

      return new Observable(function (observer) {
        _this.push = function (val) {
          observer.next(val);
        };

        return function () {
          return _this.push = _this.noop;
        };
      });
    }
  }, {
    key: "fromEvent",
    value: function fromEvent(eventName, target) {
      return new Observable(function (observer) {
        var handler = function handler(event) {
          observer.next(event);
        };
        target.addEventListener(eventName, handler, false);
        return function () {
          return target.removeEventListener(eventName, handler);
        };
      });
    }
  }, {
    key: "fromPromise",
    value: function fromPromise(promise) {
      var _this2 = this;

      return new Observable(function (observer) {
        promise.then(function (val) {
          observer.next(val);
          observer.completed();
        }).catch(function (err) {
          observer.error(err);
        });

        return _this2.noop;
      });
    }
  }, {
    key: "of",
    value: function of() {
      var _this3 = this;

      for (var _len = arguments.length, vals = Array(_len), _key = 0; _key < _len; _key++) {
        vals[_key] = arguments[_key];
      }

      return new Observable(function (observer) {
        vals.forEach(function (value) {
          return observer.next(value);
        });
        observer.completed();
        return _this3.noop;
      });
    }
  }, {
    key: "idle",
    value: function idle() {
      var _this4 = this;

      for (var _len2 = arguments.length, vals = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        vals[_key2] = arguments[_key2];
      }

      return new Observable(function (observer) {
        vals.forEach(function (value) {
          return requestIdleCallback(function () {
            return observer.next(value);
          });
        });
        observer.completed();
        return _this4.noop;
      });
    }
  }, {
    key: "interval",
    value: function interval(period) {
      var counter = 0;
      return new Observable(function (observer) {
        var handler = function handler() {
          return observer.next(counter);
        };
        setInterval(handler, period);
        return function () {
          counter = 0;
          clearInterval(handler);
        };
      });
    }
  }]);

  function Observable(subscriber) {
    _classCallCheck(this, Observable);

    this.subscriber = subscriber;
  }

  _createClass(Observable, [{
    key: "noop",
    value: function noop() {}
  }, {
    key: "map",
    value: function map(predicate) {
      var _this5 = this;

      return new Observable(function (observer) {
        var customObserver = _extends({}, observer, {
          next: function next(data) {
            observer.next(predicate(data));
          }
        });

        _this5.subscribe(customObserver);
      });
    }
  }, {
    key: "filter",
    value: function filter(predicate) {
      var _this6 = this;

      return new Observable(function (observer) {
        var customObserver = _extends({}, observer, {
          next: function next(data) {
            if (predicate(data)) {
              observer.next(data);
            }
          }
        });

        _this6.subscribe(customObserver);
      });
    }
  }, {
    key: "delay",
    value: function delay(period) {
      var _this7 = this;

      return new Observable(function (observer) {
        var customObserver = _extends({}, observer, {
          next: function next(data) {
            setTimeout(function () {
              observer.next(data);
            }, period);
          }
        });

        _this7.subscribe(customObserver);
      });
    }
  }, {
    key: "takeEvery",
    value: function takeEvery(amount) {
      var _this8 = this;

      var counter = 0;
      return new Observable(function (observer) {
        var customObserver = _extends({}, observer, {
          next: function next(data) {
            if (counter === amount) {
              observer.next(data);
              counter = 0;
            } else {
              counter++;
            }
          }
        });

        _this8.subscribe(customObserver);
      });
    }
  }, {
    key: "throw",
    value: function _throw() {
      return new Observable(function (observer) {
        observer.error();
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(observer) {
      var safeObserver = {};

      if (typeof observer === "function") {
        safeObserver.next = observer;
        safeObserver.completed = this.noop;
        safeObserver.error = this.noop;
      }

      if ((typeof observer === "undefined" ? "undefined" : _typeof(observer)) === "object" && !Array.isArray(observer)) {
        safeObserver = _extends({}, observer, {
          completed: observer.completed || this.noop,
          error: observer.error || this.noop
        });
      }

      this.subscriber(safeObserver);
    }
  }]);

  return Observable;
}();

exports.default = Observable;

/***/ })
/******/ ]);