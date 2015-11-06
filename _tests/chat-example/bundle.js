(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var SocketEvent = require('../../dist/socket-event');


var socket = io();

var sevent = new SocketEvent({
  socket: socket
});

sevent.on('chatMessage', function(msg){
  console.log(msg);
  $('#messages').append($('<li>').text(msg));
});

$('form').submit(function(){
  sevent.remoteEmit('chatMessage', $('#m').val());
  $('#m').val('');
  return false;
});

},{"../../dist/socket-event":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _multiEvent = require('multi-event');

var _multiEvent2 = _interopRequireDefault(_multiEvent);

var SocketEvent = (function (_MultiEvent) {
  _inherits(SocketEvent, _MultiEvent);

  function SocketEvent(_ref) {
    var io = _ref.io;
    var socket = _ref.socket;

    _classCallCheck(this, SocketEvent);

    _get(Object.getPrototypeOf(SocketEvent.prototype), 'constructor', this).call(this);
    this._io = io;
    this._socket = socket;
    this._pipedEventsSet = new Set();
  }

  _createClass(SocketEvent, [{
    key: 'remoteEmit',
    value: function remoteEmit(eventName, arg) {
      // FIXME:
      (this._io || this._socket).emit(eventName, arg);
    }
  }, {
    key: 'localEmit',
    value: function localEmit(eventName, arg) {
      _get(Object.getPrototypeOf(SocketEvent.prototype), 'emit', this).call(this, eventName, args);
    }
  }, {
    key: 'emit',
    value: function emit() {
      this.remoteEmit.apply(this, arguments);
      this.localEmit.apply(this, arguments);
    }
  }, {
    key: 'on',
    value: function on(eventName, callBack) {
      _get(Object.getPrototypeOf(SocketEvent.prototype), 'on', this).call(this, eventName, callBack);
      this.pipeFromRemote({ eventName: eventName });
    }

    //private
  }, {
    key: 'pipeFromSocket',
    value: function pipeFromSocket(_ref2) {
      var _this = this;

      var eventName = _ref2.eventName;
      var _ref2$socket = _ref2.socket;
      var socket = _ref2$socket === undefined ? this._socket : _ref2$socket;

      socket.on(eventName, function () {
        var _get2;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        (_get2 = _get(Object.getPrototypeOf(SocketEvent.prototype), 'emit', _this)).call.apply(_get2, [_this, eventName].concat(args));
      });
    }
  }, {
    key: 'pipeFromRemote',
    value: function pipeFromRemote(_ref3) {
      var _this2 = this;

      var eventName = _ref3.eventName;

      if (!this._pipedEventsSet.has(eventName)) {
        if (this._socket) {
          this.pipeFromSocket({ eventName: eventName });
        } else {
          this._io.on('connection', function (socket) {
            _this2.pipeFromSocket({ eventName: eventName, socket: socket });
          });
        }
        this._pipedEventsSet.add(eventName);
      }
    }
  }]);

  return SocketEvent;
})(_multiEvent2['default']);

exports['default'] = SocketEvent;
module.exports = exports['default'];

},{"multi-event":3}],3:[function(require,module,exports){
//     multi-event 1.0.0
//     (c) 2015 Saad Yousfi <yousfi.saad@gmail.com>

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var helpers = {
	eventType: function eventType(eventName) {
		var ret = {
			valid: false,
			type: 'mono', //molti/mono

			splited: []
		};
		ret.splited = eventName.split('.');
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = ret.splited[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var part = _step.value;

				var ok = /^[a-z0-9]+$/i.test(part);
				var ast = part === '*';
				if (!(ok || ast)) {
					return ret;
				}
				if (ast) {
					ret.type = 'multi';
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator['return']) {
					_iterator['return']();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		ret.valid = true;
		ret.name = eventName;

		return ret;
	},
	matches: function matches(pattern) {
		return function (eName) {
			var patternCurrent = eName.split('.');
			if (pattern.length !== patternCurrent.length) {
				return false;
			} else {
				for (var i in pattern) {
					if (patternCurrent[i] !== '*' && patternCurrent[i] !== pattern[i]) {
						return false;
					}
				}
			}

			return true;
		};
	}
};

var MultiEvent = (function () {
	function MultiEvent() {
		_classCallCheck(this, MultiEvent);

		this._mapMono = new Map();
		this._mapMulti = new Map();
	}

	_createClass(MultiEvent, [{
		key: 'on',
		value: function on(eventName, callBack) {
			var infos = helpers.eventType(eventName);
			if (!infos.valid) {
				throw 'invalid name';
			}
			if (typeof callBack !== 'function') {
				throw 'you must give me a function';
			}

			var mapOfSet = undefined;
			if (infos['type'] !== 'multi') {
				mapOfSet = this._mapMono;
			} else {
				mapOfSet = this._mapMulti;
			}

			var setMulti = undefined;
			if (mapOfSet.has(eventName)) {
				setMulti = mapOfSet.get(eventName);
			} else {
				setMulti = new Set();
				mapOfSet.set(eventName, setMulti);
			}

			setMulti.add(callBack);

			return this;
		}
	}, {
		key: 'emit',
		value: function emit(eventName) {
			var infos = helpers.eventType(eventName);
			if (!infos.valid) {
				throw 'invalid event';
			}
			if (infos.type === 'multi') {
				throw 'you can not emit multiple events, may be in the next version';
			}

			// get mono callBacks
			var monoCallBacks = this._mapMono.has(eventName) ? [].concat(_toConsumableArray(this._mapMono.get(eventName))) : [];
			// get multi callBacks
			var allMultiNames = [].concat(_toConsumableArray(this._mapMulti.keys()));

			var multiNamesMatches = allMultiNames.filter(helpers.matches(infos.splited));

			var multiCallBacks = [];
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = multiNamesMatches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var multiNamesMatch = _step2.value;

					Array.prototype.push.apply(multiCallBacks, [].concat(_toConsumableArray(this._mapMulti.get(multiNamesMatch))));
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2['return']) {
						_iterator2['return']();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			var callBacks = monoCallBacks.concat(multiCallBacks);

			//execute callBacks
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					args[_key - 1] = arguments[_key];
				}

				for (var _iterator3 = callBacks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var callBack = _step3.value;

					callBack.apply({ eventName: eventName }, args);
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3['return']) {
						_iterator3['return']();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			return this;
		}
	}]);

	return MultiEvent;
})();

exports['default'] = MultiEvent;
module.exports = exports['default'];

},{}]},{},[1]);
