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


var isSharp = function isSharp(i) {
  return i[0] === '(';
};
var getNumber = function getNumber(i) {
  var t = i.replace(/[bd()]/ig, '');
  var result = parseInt(t);
  if (t.slice(-1) === '\'') {
    result -= 4;
  }
  return result;
};

var Visitor = function () {
  function Visitor() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Visitor);

    this.result = [];
    this.options = Object.assign({
      preferSharp: false,
      preferLeft: false
    }, options);

    this.reverseTable = this.createBDReverseTable(this.options);
  }

  _createClass(Visitor, [{
    key: 'visit',
    value: function visit(token, state) {
      if (token.type !== NOTE) {
        this.result.push(token.data);
        return;
      }
      var note = token.data;
      if (!this.reverseTable[note.number]) {
        throw new Error('BD note out of bound (has number ' + note.number + ')');
      }
      this.result.push(this.reverseTable[note.number]);
    }
  }, {
    key: 'parse',
    value: function parse(state) {
      return this.result.join('');
    }

    /**
     * @param options
     *   default (D4)x B4x B5√ (B6)x D6√
     *   preferSharp (D4)√ B4x B5x (B6)√ D6x
     *   preferLeft (D4)x B4√ B5x (B6)x D6√
     *   (both) (D4)√ B4x B5x (B6)√ D6x
     *
     * @return Object
     */

  }, {
    key: 'createBDReverseTable',
    value: function createBDReverseTable(options) {
      var keys = Object.keys(_constants.bdTable);
      keys.sort(function (i, j) {
        var si = isSharp(i);
        var sj = isSharp(j);
        if (options.preferSharp) {
          si *= 100;
          sj *= 100;
        } else {
          si *= -100;
          sj *= -100;
        }
        var ni = getNumber(i);
        var nj = getNumber(j);
        if (options.preferLeft) {
          ni = -ni;
          nj = -nj;
        }
        return si + ni - (sj + nj);
      });

      var result = {};
      for (var i in keys) {
        var key = keys[i];
        var value = _constants.bdTable[key];
        result[value] = key;
      }
      return result;
    }
  }]);

  return Visitor;
}();

exports.default = Visitor;
module.exports = exports['default'];