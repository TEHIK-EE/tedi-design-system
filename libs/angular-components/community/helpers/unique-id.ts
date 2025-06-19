let id = 0;

/// Index-ID in the context of a component, simply iterates a value each call.
export function indexId(prefix: string) {
  return `${prefix}-${id++}`;
}
/// Reset the index-ID to 0, useful for avoiding a ID forever increasing
export function resetIndexId() {
  id = 0;
}
