'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lex;

var _lex = require('lex');

var _lex2 = _interopRequireDefault(_lex);

var _Token = require('../model/Token');

var _Token2 = _interopRequireDefault(_Token);

var _Note = require('../model/Note');

var _Note2 = _interopRequireDefault(_Note);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TEXT = _Token2.default.TEXT,
    NOTE = _Token2.default.NOTE,
    WS = _Token2.default.WS;
function lex(source) {
  var tokens = [];

  var lexer = new _lex2.default();
  lexer.addRule(/[bdBD]\d+|\([bdBD]\d+\)/, function (text) {
    var sharp = text[0] === '(';
    if (sharp) {
      text = text.slice(1, -1).toUpperCase();
    }
    if (!_constants.bdTable[text]) {
      throw new Error('Unrecognized note "' + text + '"');
    }
    var note = new _Note2.default(_constants.bdTable[text]);
    sharp && note.up();
    tokens.push(new _Token2.default(NOTE, note));
  });
  lexer.addRule(/\s|\n/, function (text) {
    tokens.push(new _Token2.default(WS, text));
  });
  lexer.addRule(/./, function (text) {
    tokens.push(new _Token2.default(TEXT, text));
  });
  lexer.setInput(source).lex();

  return tokens;
}
module.exports = exports['default'];