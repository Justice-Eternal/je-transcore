/* global: describe, it: true */
const lex = require('../lib/lexer/default');
const render = require('../lib/renderer');
const Visitor = require('../lib/visitor/default');
const BDVisitor = require('../lib/visitor/bd');
const expect = require('expect');

describe('parser', () => {

describe('default', () => {
  it('should render normal correctly', () => {
    const input = `1#12#2`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = render(tokens, visitor);
    expect(result).toEqual('1#12#2');
  });

  it('should render () correctly', () => {
    const input = `(7)#12#2`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = render(tokens, visitor);
    expect(result).toEqual('(7)#12#2');
  });

  it('should render continuous () correctly', () => {
    const input = `(67)#12#2`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = render(tokens, visitor);
    expect(result).toEqual('(67)#12#2');
  });

  it('should render split () correctly', () => {
    const input = `(6)(7)#12#2`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = render(tokens, visitor);
    expect(result).toEqual('(67)#12#2');
  });

  it('should render )[ correctly', () => {
    const input = `(6)[7]#12#2`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = render(tokens, visitor);
    expect(result).toEqual('(6)[7]#12#2');
  });

  it('should render nested () correctly', () => {
    const input = `((6)7)#12#2`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = render(tokens, visitor);
    expect(result).toEqual('((6)7)#12#2');
  });

  it('should render nested ([]) correctly', () => {
    const input = `([6]7)#12#2`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = render(tokens, visitor);
    expect(result).toEqual('6(7)#12#2');
  });

  it('should render text correctly', () => {
    const input = `67#12#2 // 这里是注释`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = render(tokens, visitor);
    expect(result).toEqual('67#12#2 // 这里是注释');
  });

  it('should render text in () correctly', () => {
    const input = `67#12这里是注释[#2]`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = render(tokens, visitor);
    expect(result).toEqual('67#12这里是注释[#2]');
  });

  it('should render change line correctly', () => {
    const input = `67#12[#2] // 这里是注释 \n (6)7#12[#2]`;
    const tokens = lex(input);
    const visitor = new Visitor();
    const result = render(tokens, visitor);
    expect(result).toEqual('67#12[#2] // 这里是注释 \n (6)7#12[#2]');
  });
});

describe('bd', () => {
  it('should render normal correctly', () => {
    const input = `1#12#2`;
    const tokens = lex(input);
    const visitor = new BDVisitor();
    const result = render(tokens, visitor);
    expect(result).toEqual('B5(B5)D5(D5)');
  });

  it('should render default correctly', () => {
    const input = `14`;
    const tokens = lex(input);
    const visitor = new BDVisitor();
    const result = render(tokens, visitor);
    expect(result).toEqual('B5D6');
  });

  it('should render preferSharp correctly', () => {
    const input = `14`;
    const tokens = lex(input);
    const visitor = new BDVisitor({ preferSharp: true });
    const result = render(tokens, visitor);
    expect(result).toEqual('(D4)(B6)');
  });

  it('should render preferLeft correctly', () => {
    const input = `14`;
    const tokens = lex(input);
    const visitor = new BDVisitor({ preferLeft: true });
    const result = render(tokens, visitor);
    expect(result).toEqual('B4D6');
  });

  it('should render preferSharp & preferLeft correctly', () => {
    const input = `14`;
    const tokens = lex(input);
    const visitor = new BDVisitor({ preferSharp: true, preferLeft: true });
    const result = render(tokens, visitor);
    expect(result).toEqual('(D4)(B6)');
  });
});

});
