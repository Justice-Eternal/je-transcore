import { nameTable } from '../constants';
import Token from '../model/Token';

const { TEXT, NOTE, WS } = Token;

const initialOctave = 5;
const copy = i => i;

export default class Visitor {
  before(state) {
    state.octave = initialOctave;
    state.result = [];
    state.countUp = 0; // '['
    state.countDown = 0; // '('
    state.textQueue = [];
  }

  visit(token, state) {
    if (token.type === WS) {
      this.flushOctave(state);
      this.stashText(state, token.data);
      return;
    }

    if (token.type === TEXT) {
      this.stashText(state, token.data);
      return;
    }

    const note = token.data;
    if (note.octave > state.octave) {
      while (state.octave < note.octave) {
        if (state.countDown > 0) {
          state.result.push(')');
          state.countDown--;
        } else {
          if (state.countDown === 0) {
            this.flushText(state);
          }
          state.result.push('[');
          state.countUp++;
        }
        state.octave++;
      }
    } else {
      while (state.octave > note.octave) {
        if (state.countUp > 0) {
          state.result.push(']');
          state.countUp--;
        } else {
          if (state.countUp === 0) {
            this.flushText(state);
          }
          state.result.push('(');
          state.countDown++;
        }
        state.octave--;
      }
    }
    this.flushText(state);
    state.result.push(nameTable[note.rest]);
  }

  after(state) {
    this.flushOctave(state);
    this.flushText(state);
  }

  parse(state) {
    return state.result.join('');
  }

  stashText(state, text) {
    state.textQueue.push(text);
  }

  flushText(state) {
    state.result.push(state.textQueue.join(''));
    state.textQueue = [];
  }

  flushOctave(state) {
    if (state.countUp > 0) {
      state.result.push(new Array(state.countUp).fill(']').join(''));
    } else if (state.countDown > 0) {
      state.result.push(new Array(state.countDown).fill(')').join(''));
    }
    state.countUp = state.countDown = 0;
    state.octave = initialOctave;
  }
}
