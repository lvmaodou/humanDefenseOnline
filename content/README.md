# Versioned map content

Each map revision lives in its own directory. Runtime rules and presentation assets must refer to stable IDs from the same pack; balance values must not be duplicated in client code.

Required source data before a pack can be marked complete:

- `version.json`: exact map name, version/build, source archive hash, map dimensions, path and placement regions.
- `heroes.json`: every selectable class, starting stats, growth, attack model, inventory and learnable skills.
- `units.json`: every creep, boss and summoned unit with stats, defenses, bounty, movement, abilities and model/effect references.
- `waves.json`: ordered spawn groups, timing, quantities, modifiers, bosses and completion conditions.
- `skills.json`: levels, costs, cooldowns, targeting, status effects, damage formulas and presentation events.
- `items.json`: every item, recipe, price, stat modifier, active/passive behavior and stack rule.
- `buildings.json`: all player-built defenses, costs, tiers, attacks, targeting and upgrade paths.

The current prototype is intentionally not registered as a map version. Do not fill these files with guessed classic-map values: author them from the chosen `.w3x`/`.w3m` archive or a verified reference for the exact revision, and record provenance for every imported table.
