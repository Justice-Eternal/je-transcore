'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../constants');

var _Token = require('../model/Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TEXT = _Token2.default.TEXT,
    NOTE = _Token2.default.NOTE,
    WS = _Token2.default.WS;


var initialOctave = 5;
var copy = function copy(i) {
  return i;
};

var Visitor = function () {
  function Visitor() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Visitor);

    this.nameTable = options.nameTable || _constants.nameTable;
  }

  _createClass(Visitor, [{
    key: 'before',
    value: function before(state) {
      state.octave = initialOctave;
      state.result = [];
      state.countUp = 0; // '['
      state.countDown = 0; // '('
      state.textQueue = [];
    }
  }, {
    key: 'visit',
    value: function visit(token, state) {
      if (token.type === WS) {
        this.flushOctave(state);
        this.stashText(state, token.data);
        return;
      }

      if (token.type === TEXT) {
        this.stashText(state, token.data);
        return;
      }

      var note = token.data;
      if (note.octave > state.octave) {
        while (state.octave < note.octave) {
          if (state.countDown > 0) {
            state.result.push(')');
            state.countDown--;
          } else {
            if (state.countDown === 0) {
              this.flushText(state);
            }
            state.result.push('[');
            state.countUp++;
          }
          state.octave++;
        }
      } else {
        while (state.octave > note.octave) {
          if (state.countUp > 0) {
            state.result.push(']');
            state.countUp--;
          } else {
            if (state.countUp === 0) {
              this.flushText(state);
            }
            state.result.push('(');
            state.countDown++;
          }
          state.octave--;
        }
      }
      this.flushText(state);
      state.result.push(this.nameTable[note.rest]);
    }
  }, {
    key: 'after',
    value: function after(state) {
      this.flushOctave(state);
      this.flushText(state);
    }
  }, {
    key: 'parse',
    value: function parse(state) {
      return state.result.join('');
    }
  }, {
    key: 'stashText',
    value: function stashText(state, text) {
      state.textQueue.push(text);
    }
  }, {
    key: 'flushText',
    value: function flushText(state) {
      state.result.push(state.textQueue.join(''));
      state.textQueue = [];
    }
  }, {
    key: 'flushOctave',
    value: function flushOctave(state) {
      if (state.countUp > 0) {
        state.result.push(new Array(state.countUp).fill(']').join(''));
      } else if (state.countDown > 0) {
        state.result.push(new Array(state.countDown).fill(')').join(''));
      }
      state.countUp = state.countDown = 0;
      state.octave = initialOctave;
    }
  }]);

  return Visitor;
}();

exports.default = Visitor;
module.exports = exports['default'];