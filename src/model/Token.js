export default class Token {

  static TEXT = 'text';
  static NOTE = 'note';

  constructor(type, data) {
    this.type = type;
    this.data = data;
  }

}