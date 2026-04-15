
# 9898-MTG-Chaos-RPG-2026

Browser-first Magic: The Gathering RPG prototype with a modular agent/hook/skill architecture, shared world state, scene-shell pages, generator tooling, and automation scripts for analysis and reporting.

---

## Quick Start

1. `npm install`
2. `npm start` (serves `src/`)
	 - Entry: `src/index.html` (redirects to `src/scenes/index.html`)
3. `npm run phaser` (serves repo root for Phaser/Godot/bridge pages)

## Architecture Overview

- **Gameplay Authority:** `src/scripts/game.js` (owns `window.gameState`, world/quest/combat flow, Scryfall, mtgBot, rendering)
- **Scene System:**
	- Main hub: `src/scenes/index.html`
	- Thin shells: `src/scenes/scene-*.html` with `<main id="scene-container" data-scene="...">`
	- Bootstrapping: `src/scripts/scenes.js` (runs hooks, marks nav, renders shell)
	- Example hook-backed design tool: `src/scenes/scene-format-architect.html` + `src/scenes/scene-format-architect.hook.js`
- **Scene Registry:** `src/lib/scene-registry.js` (keep in sync with `scenes.json`, `gameflow.json`)
- **Runtime Bridge:** `src/modules/runtime-bridge.js` (connects game state to Phaser, React, Perchance, Godot, etc.)
- **Agents/Hooks/Skills:** Modular logic for deck builder, Scryfall, scenario flow, and more. See `.github/` for agent/hook/skill files and integration docs.

## Custom Format Architect

- Scene: `src/scenes/scene-format-architect.html`
- Hook/UI logic: `src/scenes/scene-format-architect.hook.js`
- Styles: `src/styles/scene-format-architect.css`
- Purpose: capture a custom MTG format idea and generate a rules definition JSON, format bible, onboarding guide, playtest matrix, Scryfall research queries, and helper-methods script from one structured draft
- Behavior: lives inside the shared scene shell, stores drafts in local storage, and renders its own buttons inside the hook outlet instead of relying on `game.js` action bindings

## Agent Roles & Modular Workflow

- **Agents:** Implement core logic (deck builder, Scryfall, scenario, etc.) as `.agent.md` files in `.github/agents/`.
- **Hooks:** UI/event-driven logic as `.hook.json` in `.github/hooks/`.
- **Skills:** Reusable logic blocks as `.skill.md` in `.github/skills/`.
- **Integration:** Register new agents/hooks/skills in the runtime bridge and scene registry. See `docs/modular-logic.md` and onboarding guide.

## Automation & Testing

- Automation scripts: `scripts/` (see `docs/automation-workflows.md`)
- Test suite: `npm test` (Jest)
- Focused checks: `npm run validate-configs`, `npm run test:runtime`, `npm run game-tests`, `npm run boardgame-tests`
- Build: `npm run build` (copies `src/` to `dist/`, not a bundler)

## Onboarding & Contribution

1. See `docs/guides/onboarding.md` for a contributor checklist and agent/hook/skill integration overview.
2. See `docs/README.md` for the documentation map and links to all guides, tutorials, and wiki pages.
3. Update or add docs as you contribute features or agents (see "How to Update Docs" in `docs/README.md`).
4. Use the modular agent/hook/skill pattern for all new features.

## Project Map

- `src/scenes/` — HTML entrypoints, scene shells, docs fragments
- `src/scripts/` — Browser runtime, demos, tests
- `src/modules/` — Runtime bridge, cross-surface modules
- `src/features/` — Isolated feature slices with local READMEs and tests
- `docs/` — Guides, onboarding, wiki, generated reports
- `.github/` — Agent, hook, skill, workflow, and repo-automation metadata

---

See `docs/README.md` for the full documentation map and `.github/copilot-instructions.md` for the agent-oriented architecture guide.
