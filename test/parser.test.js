/* global: describe, it, expect: true */
const lex = require('../lib/lexer/default');
const parse = require('../lib/parser');
const Visitor = require('../lib/visitor/default');
const expect = require('expect');

describe('parser', () => {
  it('should parse normal correctly', () => {
    const input = `1#12#2`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = parse(tokens, visitor);
    expect(result).toEqual('1#12#2');
  });

  it('should parse () correctly', () => {
    const input = `(7)#12#2`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = parse(tokens, visitor);
    expect(result).toEqual('(7)#12#2');
  });

  it('should parse continuous () correctly', () => {
    const input = `(67)#12#2`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = parse(tokens, visitor);
    expect(result).toEqual('(67)#12#2');
  });

  it('should parse split () correctly', () => {
    const input = `(6)(7)#12#2`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = parse(tokens, visitor);
    expect(result).toEqual('(67)#12#2');
  });

  it('should parse )[ correctly', () => {
    const input = `(6)[7]#12#2`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = parse(tokens, visitor);
    expect(result).toEqual('(6)[7]#12#2');
  });

  it('should parse nested () correctly', () => {
    const input = `((6)7)#12#2`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = parse(tokens, visitor);
    expect(result).toEqual('((6)7)#12#2');
  });

  it('should parse nested ([]) correctly', () => {
    const input = `([6]7)#12#2`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = parse(tokens, visitor);
    expect(result).toEqual('6(7)#12#2');
  });

  it('should parse text correctly', () => {
    const input = `67#12#2 // 这里是注释`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = parse(tokens, visitor);
    expect(result).toEqual('67#12#2 // 这里是注释');
  });

  it('should parse text in () correctly', () => {
    const input = `67#12这里是注释[#2]`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = parse(tokens, visitor);
    expect(result).toEqual('67#12这里是注释[#2]');
  });

  it('should parse change line correctly', () => {
    const input = `67#12[#2] // 这里是注释 \n (6)7#12[#2]`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = parse(tokens, visitor);
    expect(result).toEqual('67#12[#2] // 这里是注释 \n (6)7#12[#2]');
  });
});
