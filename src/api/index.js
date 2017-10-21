import lex from '../lexer';
import parse from '../parser';
import Visitor from '../visitor';
import TunePlugin from '../plugins/TunePlugin';

export default class Transcore {

  static tune(source, options = {}) {
    const tokens = lex(source);
    return parse(tokens, new Visitor(), [
      new TunePlugin(options)
    ]);
  }
}
