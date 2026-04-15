## Windows PC Game Build (Electron)

To package the web app as a Windows desktop game using Electron:

1. Install dependencies (one-time):
	```sh
	npm install --save-dev electron electron-packager
	```
2. Run the app in Electron for development:
	```sh
	npm run electron
	```
3. Build a distributable Windows `.exe`:
	```sh
	npm run electron:package
	```
	The packaged app will be in `dist-electron/`.

See [Electron docs](https://www.electronjs.org/docs/latest/tutorial/quick-start) for more info.
# Build And Verification

This project does not have a bundler-based production build. The main `build` script copies `src/` into `dist/` and skips test files.

## Local Run
- `npm install`
- `npm start` to serve `src/`
- `npm run phaser` when a page needs repo-root asset paths or the Phaser/Godot bridge

## Verification
- `npm test` runs the full Jest suite from `jest.config.js`
- `npm run validate-configs` checks configuration files
- `npm run test:runtime` runs the focused runtime-bridge and generator suites
- `npm run boardgame-tests`
- `npm run game-tests`

## Build
- `npm run build`
- Output goes to `dist/`
- `scripts/build.js` recursively copies `src/` and excludes `*.test.*` files and `__tests__/` directories

## Automation
- `npm run analyze`
- `npm run deep-research`
- `npm run iterate`
- `npm run report`
- `npm run report:maintenance`

## Agent Collaboration & Automation

This project supports multi-agent workflows for build, test, and deployment automation:

- Agents are defined in `.github/agents/` (see README for roles).
- Common agent-driven scripts:
	- `npm run analyze` (project analysis)
	- `npm run deep-research` (deep research iteration)
	- `npm run iterate` (master iteration loop)
	- `npm run integrate` (integration automation)
	- `npm run report` (project task reporting)
	- `npm run deploy` (build, test, deploy pipeline)
- Agents can be invoked for asset generation, scene integration, Scryfall API, Perchance generators, and more.

See `.github/agents/README.md` and `docs/automation-workflows.md` for details.

## Godot Prototype
- `godot/` contains the Godot 4 prototype
- Open `godot/project.godot` in Godot 4.3+ or run `godot --path godot/ --headless`
- The bridge path is `src/scripts/phaser-godot-bridge.js` plus `godot/scripts/WebBridge.gd`

## Windows PC Game Build (Godot)

To build a native Windows executable:

1. Open `godot/project.godot` in Godot 4.3 or later.
2. Go to **Project > Export**.
3. Add a Windows Desktop preset if not present.
4. Click **Export Project** to generate a `.exe` in `godot/export/`.
5. Distribute the `.exe` and the `godot/export/` folder as your Windows PC game build.

For command-line export:
```sh
godot --headless --path godot/ --export-release "Windows Desktop" godot/export/YourGame.exe
```

See [Godot docs](https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_windows.html) for details.
