import Lexer from 'lex';
import Token from '../model/Token';
import Note from '../model/Note';

const { TEXT, NOTE } = Token;

const octaveTable = {
  '(': -1,
  ')': 1,
  '[': 1,
  ']': -1,
  '<': -2,
  '>': 2,
  '{': 2,
  '}': -2,
};

const nameTable = ['1', '#1', '2', '#2', '3', '4', '#4', '5', '#5', '6', '#6', '7'];

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
  lexer.addRule(/(.|\s|\n)/, text => {
    tokens.push(new Token(TEXT, text));
  });
  lexer.setInput(source).lex();

  return tokens;
}