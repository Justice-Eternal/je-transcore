'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;
function render(tokens, visitor) {
  var plugins = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (typeof plugins === 'function') {
    plugins = [plugins];
  }
  var pluggedTokens = tokens;
  for (var i in plugins) {
    pluggedTokens = plugins[i].decorate(pluggedTokens);
  }
  var state = {};
  visitor.before && visitor.before(state);
  for (var _i in pluggedTokens) {
    visitor.visit && visitor.visit(pluggedTokens[_i], state);
  }
  visitor.after && visitor.after(state);
  return visitor.parse(state);
}
module.exports = exports['default'];