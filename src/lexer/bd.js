import Lexer from 'lex';
import Token from '../model/Token';
import Note from '../model/Note';
import { bdTable } from '../constants';

const { TEXT, NOTE, WS } = Token;

export default function bdLex(source) {
  const tokens = [];

  const lexer = new Lexer();
  lexer.addRule(/[bdBD]\d+'?|\([bdBD]\d+'?\)/, text => {
    if (!bdTable[text]) {
      throw new Error(`Unrecognized note "${text}"`);
    }
    const note = new Note(bdTable[text]);
    tokens.push(new Token(NOTE, note));
  });
  lexer.addRule(/\s|\n/, text => {
    tokens.push(new Token(WS, text));
  });
  lexer.addRule(/./, text => {
    tokens.push(new Token(TEXT, text));
  });
  lexer.setInput(source).lex();

  return tokens;
}
