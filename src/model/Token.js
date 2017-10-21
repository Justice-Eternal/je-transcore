export default class Token {

  static TEXT = 'text';
  static NOTE = 'note';
  static WS = 'ws';

  constructor(type, data) {
    this.type = type;
    this.data = data;
  }

}