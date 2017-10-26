export const octaveTable = {
  '(': -1,
  ')': 1,
  '[': 1,
  ']': -1,
  '<': -2,
  '>': 2,
  '{': 2,
  '}': -2,
};

export const nameTable = ['1', '#1', '2', '#2', '3', '4', '#4', '5', '#5', '6', '#6', '7'];

const _bdTable = {
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
  D12: 83,
};

for (const key in _bdTable) {
  _bdTable[`(${key})`] = _bdTable[key] + 1;
}

export const bdTable = _bdTable;
