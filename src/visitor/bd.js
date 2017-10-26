import { bdTable } from '../constants';
import Token from '../model/Token';

const { TEXT, NOTE, WS } = Token;

const isSharp = i => i[0] === '(';
const getNumber = i => parseInt(i.replace(/[bd()]/ig, ''));

export default class Visitor {

  constructor(options = {}) {
    this.result = [];
    this.options = Object.assign({
      preferSharp: false,
      preferLeft: false,
    }, options);

    this.reverseTable = this.createBDReverseTable(this.options);
  }

  visit(token, state) {
    if (token.type !== NOTE) {
      this.result.push(token.data);
      return;
    }
    const note = token.data;
    if (!this.reverseTable[note.number]) {
      throw new Error(`BD note out of bound (has number ${note.number})`);
    }
    this.result.push(this.reverseTable[note.number]);
  }

  parse(state) {
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
  createBDReverseTable(options) {
    const keys = Object.keys(bdTable);
    keys.sort((i, j) => {
      let si = isSharp(i);
      let sj = isSharp(j);
      if (options.preferSharp) {
        si *= 100;
        sj *= 100;
      } else {
        si *= -100;
        sj *= -100;
      }
      let ni = getNumber(i);
      let nj = getNumber(j);
      if (options.preferLeft) {
        ni = -ni;
        nj = -nj;
      }
      return (si + ni) - (sj + nj);
    });

    const result = {};
    for (const i in keys) {
      const key = keys[i];
      const value = bdTable[key];
      result[value] = key;
    }
    return result;
  }
}
