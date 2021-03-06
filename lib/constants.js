'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var octaveTable = exports.octaveTable = {
  '(': -1,
  ')': 1,
  '[': 1,
  ']': -1,
  '<': -2,
  '>': 2,
  '{': 2,
  '}': -2
};

var nameTable = exports.nameTable = ['1', '#1', '2', '#2', '3', '4', '#4', '5', '#5', '6', '#6', '7'];

var _bdTable = {
  "B1'": 36,
  "D1'": 38,
  "B2'": 40,
  "D2'": 41,
  "B3'": 43,
  "D3'": 45,
  "B4'": 48,
  "D4'": 47,

  B1: 48,
  D1: 50,
  B2: 52,
  D2: 53,
  B3: 55,
  D3: 57,
  B4: 60,
  D4: 59,

  B5: 60,
  D5: 62,
  B6: 64,
  D6: 65,
  B7: 67,
  D7: 69,
  B8: 72,
  D8: 71,

  B9: 72,
  D9: 74,
  B10: 76,
  D10: 77,
  B11: 79,
  D11: 81,
  B12: 84,
  D12: 83
};

for (var key in _bdTable) {
  _bdTable['(' + key + ')'] = _bdTable[key] + 1;
}

_bdTable['(D12)'] = 86; // last hole

var bdTable = exports.bdTable = _bdTable;