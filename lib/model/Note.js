'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.withOptions = withOptions;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nameTable = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

var Note = function () {
  function Note(arg0, arg1) {
    _classCallCheck(this, Note);

    this.number = 0;

    if (typeof arg1 === 'undefined') {
      this.number = arg0;
      return;
    }
    this.octave = arg0;
    this.rest = arg1;
  }

  /**
   * MIDI Note Number
   * @type {number}
   * @see http://www.electronics.dit.ie/staff/tscarff/Music_technology/midi/midi_note_numbers_for_octaves.htm
   */


  _createClass(Note, [{
    key: 'up',
    value: function up() {
      var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this.number += number;
      return this;
    }
  }, {
    key: 'down',
    value: function down() {
      var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this.number -= number;
      return this;
    }
  }, {
    key: 'copy',
    value: function copy() {
      return new Note(this.number);
    }
  }, {
    key: 'octave',
    get: function get() {
      var result = Math.floor(this.number / 12);
      if (this.rest === 0 && Note.options.preferSharpB) {
        result--;
      }
      return result;
    },
    set: function set(val) {
      this.number += 12 * (val - this.octave);
    }
  }, {
    key: 'rest',
    get: function get() {
      return this.number % 12;
    },
    set: function set(val) {
      this.number += val - this.rest;
    }
  }]);

  return Note;
}();

Note.options = {
  preferSharpB: false
};
exports.default = Note;
function withOptions(options) {
  var oldOptions = Object.assign({}, Note.options);
  return function wrapper(func) {
    return function () {
      Note.options = options;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      func.apply(null, args);
      Note.options = oldOptions;
    };
  };
}