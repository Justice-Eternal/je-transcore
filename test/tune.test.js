/* global: describe, it: true */
const expect = require('expect');
const Transcore = require('../lib/api');

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
});
