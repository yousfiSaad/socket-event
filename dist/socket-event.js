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
