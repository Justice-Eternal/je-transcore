const nameTable = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default class Note {

  static options = {
    preferSharpB: false,
  };

  /**
   * MIDI Note Number
   * @type {number}
   * @see http://www.electronics.dit.ie/staff/tscarff/Music_technology/midi/midi_note_numbers_for_octaves.htm
   */
  number = 0;

  constructor(arg0, arg1) {
    if (typeof arg1 === 'undefined') {
      this.number = arg0;
      return;
    }
    this.octave = arg0;
    this.rest = arg1;
  }

  get octave() {
    let result = Math.floor(this.number / 12);
    if (this.rest === 0 && Note.options.preferSharpB) {
      result--;
    }
    return result;
  }

  set octave(val) {
    this.number += 12 * (val - this.octave);
  }

  get rest() {
    return this.number % 12;
  }

  set rest(val) {
    this.number += (val - this.rest);
  }

  up(number = 1) {
    this.number += number;
    return this;
  }

  down(number = 1) {
    this.number -= number;
    return this;
  }

  copy() {
    return new Note(this.number);
  }
}

export function withOptions(options) {
  const oldOptions = Object.assign({}, Note.options);
  return function wrapper(func) {
    return function (...args) {
      Note.options = options;
      func.apply(null, args);
      Note.options = oldOptions;
    }
  }
}
