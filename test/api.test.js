/* global: describe, it: true */
const expect = require('expect');
const Transcore = require('../lib/api');

describe('api', () => {

describe('tune', () => {
  it('should return original note', () => {
    const input = '(7)1#12#2345#56#67[1]';
    const result = Transcore.tune(input);
    expect(result).toEqual(input);
  });

  it('should render #3 and #7', () => {
    const input = '(7)1#12#23#35#56#67#7';
    const result = Transcore.tune(input);
    expect(result).toEqual('(7)1#12#2345#56#67[1]');
  });

  it('should render 4 and 1', () => {
    const input = '(7)1#12#2345#56#67[1]';
    const result = Transcore.tune(input, { preferSharpB: true, preferSharpE: true });
    expect(result).toEqual('(7#7)#12#23#35#56#67#7');
  });

  it('should support mode BD', () => {
    const input = 'B5D5B6(B6)';
    const result = Transcore.tune(input, { mode: 'BD' });
    expect(result).toEqual('B5D5B6D6');
  });

  it('should support mode BD add offset', () => {
    const input = 'B5D5B6(B6)';
    const result = Transcore.tune(input, { offset: 1, mode: 'BD' });
    expect(result).toEqual('(B5)(D5)D6(D6)');
  });
});

describe('transform', () => {
  it('should to BD', () => {
    let input = '(7)1#12#2345#56#67[1]';
    let result = Transcore.toBD(input);
    expect(result).toEqual('D4B5(B5)D5(D5)B6D6B7(B7)D7(D7)D8B9');

    input = '(7)1#12#2345#56#67[1]';
    result = Transcore.toBD(input, { preferSharp: true });
    expect(result).toEqual('D4(D4)(B5)D5(D5)B6(B6)B7(B7)D7(D7)D8(D8)');
  });

  it('should to JE', () => {
    let input = 'D4B5(B5)D5(D5)B6D6B7(B7)D7(D7)D8B9';
    let result = Transcore.toJE(input);
    expect(result).toEqual('(7)1#12#2345#56#67[1]');

    input = 'D4(D4)(B5)D5(D5)B6D6B7(B7)D7(D7)D8B9';
    result = Transcore.toJE(input, { preferSharpB: true });
    expect(result).toEqual('(7#7)#12#2345#56#67#7');
  });
});

});
