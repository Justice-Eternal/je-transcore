const nameTable = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default class Note {

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
    return Math.floor(this.number / 12);
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