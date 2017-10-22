import lex from '../lexer';
import parse from '../parser';
import { withOptions } from '../model/Note';
import Visitor from '../visitor';
import TunePlugin from '../plugins/TunePlugin';
import { nameTable } from '../constants';

export default class Transcore {

  static tune(source, options = {}) {
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
    const tokens = lex(source);
    let result = '';
    withOptions({ preferSharpB: options.preferSharpB })(function () {
      result = parse(tokens, new Visitor({ nameTable: names }), [
        new TunePlugin(options)
      ]);
    })();
    return result;
  }
}
