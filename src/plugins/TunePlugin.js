import Token from '../model/Token';

export default class TunePlugin {
  constructor({ offset = 0 }) {
    this.offset = offset;
  }

  decorate(tokens) {
    return tokens.map(token => {
      if (token.type !== Token.NOTE) {
        return token;
      }
      return new Token(Token.NOTE, token.data.copy().up(this.offset));
    });
  }
}
