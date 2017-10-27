import lex, { bdLex } from '../lexer';
import parse from '../renderer';
import { withOptions } from '../model/Note';
import Visitor, { BDVisitor } from '../visitor';
import TunePlugin from '../plugins/TunePlugin';
import { nameTable } from '../constants';

export default class Transcore {

  static tune(source, options = {}) {
    options = Object.assign({
      mode: 'JE',
      offset: 0,
      preferSharpE: false,
      preferSharpB: false,
      preferSharp: false,
      preferLeft: false,
    }, options);

    if (options.mode === 'JE') {
      const names = nameTable.slice();
      if (options.preferSharpE) {
        names[5] = '#3';
      }
      if (options.preferSharpB) {
        names[0] = '#7';
      }
      const tokens = lex(source);
      let result = '';
      withOptions({ preferSharpB: options.preferSharpB })(function () {
        result = parse(tokens, new Visitor({ nameTable: names }), [
          new TunePlugin(options)
        ]);
      })();
      return result;
    }

    const tokens = bdLex(source);
    return parse(tokens, new BDVisitor(options), [
      new TunePlugin(options)
    ]);
  }

  static toBD(jeSource, options = {}) {
    options = Object.assign({
      preferSharp: false,
      preferLeft: false,
    }, options);
    const tokens = lex(jeSource);
    return parse(tokens, new BDVisitor(options));
  }

  static toJE(bdSource, options) {
    options = Object.assign({
      offset: 0,
      preferSharpE: false,
      preferSharpB: false,
    }, options);
    const names = nameTable.slice();
    if (options.preferSharpE) {
      names[5] = '#3';
    }
    if (options.preferSharpB) {
      names[0] = '#7';
    }
    const tokens = bdLex(bdSource);
    let result = '';
    withOptions({ preferSharpB: options.preferSharpB })(function () {
      result = parse(tokens, new Visitor({ nameTable: names }), [
        new TunePlugin(options)
      ]);
    })();
    return result;
  }
}
