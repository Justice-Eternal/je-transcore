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
  var octave = 5;
  var tokens = [];

  var lexer = new _lex2.default();
  lexer.addRule(/#?\d/, function (text) {
    var sharp = text[0] === '#';
    var name = sharp ? text.slice(1) : text;
    var rest = _constants.nameTable.indexOf(name);
    if (rest === -1) {
      throw new Error('Unrecognized note ' + text);
    }
    var note = new _Note2.default(octave, rest);
    sharp && note.up();
    tokens.push(new _Token2.default(NOTE, note));
  });
  lexer.addRule(/[()[\]{}<>]/, function (key) {
    octave += _constants.octaveTable[key];
  });
  lexer.addRule(/(\s|\n)/, function (text) {
    tokens.push(new _Token2.default(WS, text));
  });
  lexer.addRule(/(.)/, function (text) {
    tokens.push(new _Token2.default(TEXT, text));
  });
  lexer.setInput(source).lex();

  return tokens;
}
module.exports = exports['default'];