export default function render(tokens, visitor, plugins = []) {
  if (typeof plugins === 'function') {
    plugins = [plugins];
  }
  let pluggedTokens = tokens;
  for (const i in plugins) {
    pluggedTokens = plugins[i].decorate(pluggedTokens);
  }
  const state = {};
  visitor.before && visitor.before(state);
  for (const i in pluggedTokens) {
    visitor.visit && visitor.visit(pluggedTokens[i], state);
  }
  visitor.after && visitor.after(state);
  return visitor.parse(state);
}
