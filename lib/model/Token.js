'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = function Token(type, data) {
  _classCallCheck(this, Token);

  this.type = type;
  this.data = data;
};

Token.TEXT = 'text';
Token.NOTE = 'note';
exports.default = Token;
module.exports = exports['default'];