import Lexer from 'lex';
import Token from '../model/Token';
import Note from '../model/Note';
import { octaveTable, nameTable } from '../constants';

const { TEXT, NOTE, WS } = Token;

export default function lex(source) {
  let octave = 5;
  const tokens = [];

  const lexer = new Lexer();
  lexer.addRule(/#?\d/, text => {
    const sharp = text[0] === '#';
    const name = sharp ? text.slice(1) : text;
    const rest = nameTable.indexOf(name);
    if (rest === -1) {
      throw new Error(`Unrecognized note ${text}`);
    }
    const note = new Note(octave, rest);
    sharp && note.up();
    tokens.push(new Token(NOTE, note));
  });
  lexer.addRule(/[()[\]{}<>]/, key => {
    octave += octaveTable[key];
  });
  lexer.addRule(/(\s|\n)/, text => {
    tokens.push(new Token(WS, text));
  });
  lexer.addRule(/(.)/, text => {
    tokens.push(new Token(TEXT, text));
  });
  lexer.setInput(source).lex();

  return tokens;
}