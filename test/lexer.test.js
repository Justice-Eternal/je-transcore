/* global: describe, it: true */
const lex = require('../lib/lexer/default');
const bd = require('../lib/lexer/bd');
const expect = require('expect');

describe('lexer', () => {

describe('default', () => {
  it('should return a correct token', () => {
    const tokens = lex('#3');
    expect(tokens.length).toEqual(1);
    const token = tokens[0];
    expect(token.type).toEqual('note');
    expect(token.data.number).toEqual(65);
  });

  it('should return 3 correct tokens', () => {
    const tokens = lex('#3 4');
    expect(tokens.length).toEqual(3);
    let token = tokens[0];
    expect(token.type).toEqual('note');
    expect(token.data.number).toEqual(65);

    token = tokens[1];
    expect(token.type).toEqual('ws');
    expect(token.data).toEqual(' ');

    token = tokens[2];
    expect(token.type).toEqual('note');
    expect(token.data.number).toEqual(65);
  });

  it('should return text tokens', () => {
    const tokens = lex('#3a4');
    expect(tokens.length).toEqual(3);
    let token = tokens[0];
    expect(token.type).toEqual('note');
    expect(token.data.number).toEqual(65);

    token = tokens[1];
    expect(token.type).toEqual('text');
    expect(token.data).toEqual('a');

    token = tokens[2];
    expect(token.type).toEqual('note');
    expect(token.data.number).toEqual(65);
  });

  it('should return change line token', () => {
    const tokens = lex('#3\n4');
    expect(tokens.length).toEqual(3);
    let token = tokens[0];
    expect(token.type).toEqual('note');
    expect(token.data.number).toEqual(65);

    token = tokens[1];
    expect(token.type).toEqual('ws');
    expect(token.data).toEqual('\n');

    token = tokens[2];
    expect(token.type).toEqual('note');
    expect(token.data.number).toEqual(65);
  });

});

describe('bd', () => {
  it('should return a correct token', () => {
    const tokens = bd('(B6)');
    expect(tokens.length).toEqual(1);
    const token = tokens[0];
    expect(token.type).toEqual('note');
    expect(token.data.number).toEqual(65);
  });

  it('should return a correct token (D12)', () => {
    const tokens = bd('(D12)');
    expect(tokens.length).toEqual(1);
    const token = tokens[0];
    expect(token.type).toEqual('note');
    expect(token.data.number).toEqual(86);
  });

  it('should return a correct token B1\'', () => {
    const tokens = bd("B1'(D2')");
    expect(tokens.length).toEqual(2);
    let token = tokens[0];
    expect(token.type).toEqual('note');
    expect(token.data.number).toEqual(36);
    token = tokens[1];
    expect(token.type).toEqual('note');
    expect(token.data.number).toEqual(42);
  });

  it('should return 3 correct tokens', () => {
    const tokens = bd('(B6) D6');
    expect(tokens.length).toEqual(3);
    let token = tokens[0];
    expect(token.type).toEqual('note');
    expect(token.data.number).toEqual(65);

    token = tokens[1];
    expect(token.type).toEqual('ws');
    expect(token.data).toEqual(' ');

    token = tokens[2];
    expect(token.type).toEqual('note');
    expect(token.data.number).toEqual(65);
  });
});

});
