export function advanceCombat(game, seconds, step = .05) {
  const end = game.time + seconds;
  while (game.time < end - .000001) {
    const dt = Math.min(step, end - game.time);
    game.time += dt;
    game.updateCombat(dt);
  }
}

export function releaseTestAttack(game, attacker, target, { maxSeconds = 4 } = {}) {
  const initialSerial = attacker.attackReleaseSerial || 0;
  attacker.target = target;
  attacker.cooldown = 0;
  const end = game.time + maxSeconds;
  while (game.time < end - .000001) {
    advanceCombat(game, Math.min(.05, end - game.time));
    if ((attacker.attackReleaseSerial || 0) > initialSerial && !attacker.attackWindup) return;
  }
  throw new Error(`${attacker.raw} did not release an attack on ${target.raw}`);
}

export function resolveTestProjectiles(game, attacker, { maxSeconds = 8 } = {}) {
  const end = game.time + maxSeconds;
  while (game.time < end - .000001) {
    const pending = game.projectiles.filter(projectile => !attacker || projectile.attacker === attacker);
    if (!pending.length) return;
    advanceCombat(game, Math.min(.05, end - game.time));
  }
  throw new Error(`${attacker?.raw || 'unit'} projectiles did not resolve`);
}
