export function compactNetworkState(state) {
  for (const unit of state.units) {
    if (unit.owner < 4) continue;
    for (const key of ['abilities', 'items', 'target', 'merit', 'growth', 'replaces', 'mana', 'maxMana', 'armor', 'attackRange', 'attackMin', 'attackMax', 'attackCooldown', 'canMove', 'construct', 'upgrade', 'itemBuild']) delete unit[key];
  }
  return state;
}
