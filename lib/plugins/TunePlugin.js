'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Token = require('../model/Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TunePlugin = function () {
  function TunePlugin(_ref) {
    var _ref$offset = _ref.offset,
        offset = _ref$offset === undefined ? 0 : _ref$offset;

    _classCallCheck(this, TunePlugin);

    this.offset = offset;
  }

  _createClass(TunePlugin, [{
    key: 'decorate',
    value: function decorate(tokens) {
      var _this = this;

      return tokens.map(function (token) {
        if (token.type !== _Token2.default.NOTE) {
          return token;
        }
        return new _Token2.default(_Token2.default.NOTE, token.data.copy().up(_this.offset));
      });
    }
  }]);

  return TunePlugin;
}();

exports.default = TunePlugin;
module.exports = exports['default'];