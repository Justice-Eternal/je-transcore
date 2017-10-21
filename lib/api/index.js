'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lexer = require('../lexer');

var _lexer2 = _interopRequireDefault(_lexer);

var _parser = require('../parser');

var _parser2 = _interopRequireDefault(_parser);

var _visitor = require('../visitor');

var _visitor2 = _interopRequireDefault(_visitor);

var _TunePlugin = require('../plugins/TunePlugin');

var _TunePlugin2 = _interopRequireDefault(_TunePlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transcore = function () {
  function Transcore() {
    _classCallCheck(this, Transcore);
  }

  _createClass(Transcore, null, [{
    key: 'tune',
    value: function tune(source) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var tokens = (0, _lexer2.default)(source);
      return (0, _parser2.default)(tokens, new _visitor2.default(), [new _TunePlugin2.default(options)]);
    }
  }]);

  return Transcore;
}();

exports.default = Transcore;
module.exports = exports['default'];