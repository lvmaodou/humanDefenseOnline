# 人族无敌 III 3.0 终极版 Online

This project imports the map archive supplied for this task and runs its Warcraft III JASS trigger script through a server-authoritative JavaScript runtime. The original `.w3x` archive, extracted map script, object tables, terrain, and content manifest are under `content/original-3.0/`.

## Run

```powershell
npm install
npm start
```

Open http://localhost:8080. The first player creates a room; up to three others can join its room code before wave 1 starts. The server hosts the game for LAN or internet clients when TCP port 8080 is reachable. Three.js is served locally.

## Test

```powershell
npm test
```

The tests verify imported class, wave, boss, item, and ability data and execute the original startup choices and first wave in the converted trigger runtime.

## Original map reference

`npm run reference` rebuilds `content/original-3.0/gameplay.json`, `presentation.json`, `docs/original-map-reference.md`, and `docs/original-parity-audit.md` from the extracted source tables, map info, global gameplay constants, and JASS. The references include all six class build lists, class trigger indexes, all 56 wave units, boss units, weapon and economy values, camera presets, visual model paths and scales, and source archive provenance. `content/original-3.0/data.json` holds the imported unit, item, ability, upgrade, object-modification, and map-array dataset; `script.j` and `functions.json` retain the original trigger logic.

Source extraction does not establish full Warcraft runtime parity. The runtime applies the map's pickup, movement, food-cap, pierce/spell damage rules and the R005/R007 range and regeneration upgrades. The audit records remaining gaps in upgrade/item effects, unit pathing, projectile timing, and Warcraft client rendering and effects. The project's display title uses III; the source W3I and JASS both identify the map as II.

## Original visuals

`npm run assets:original` builds a hash-checked local asset set from the pinned classic Warcraft III resource archive commit. The browser uses Three.js for the scene and camera and draws original animated MDX models and effects in Three's WebGL context. Class builders, all class buildings, wave enemies and bosses are covered; map doodad placements and original summer terrain textures are also loaded. `npm run visuals:original` rebuilds `public/map/visuals.json` and `docs/original-visual-restoration.md`.

Open `/visual-lab.html` to inspect original models and their animation sequences. Full pixel parity is not claimed: the client version, texture blending, cliffs, fog, lighting and original UI still require comparison against a Warcraft III screenshot.

## Current conversion

The archive contributes six classes, the 56-wave enemy order, five recurring boss types, Warcraft unit/ability/item/upgrade tables, four original approach lanes, and 1,270 converted JASS functions. Room state, timers, unit creation, combat orders, deaths, gold, items, dialogs, construction, and most spell triggers run on the server.

The content is imported from this exact archive SHA-256: `e7740efca962ff58a192c5cf51eb02f8c73308375e32c991f1c8fdf955d27b8d`.
