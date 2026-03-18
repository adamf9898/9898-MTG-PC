# 9898-MTG-Chaos-RPG-2026

A web game inspired by Magic: The Gathering, built with HTML, CSS, and JavaScript.

## Project Structure

The project is organized as follows:

- `README.md`: Project overview and instructions
- `src/`: Main source code
	- `scenes/`: Game HTML files (entry: `index.html`)
	- `styles/`: Game CSS (`style.css`)
	- `scripts/`: Game JavaScript (`game.js`)
	- `lib/`: Game data and JSON (`data.json`)
	- `docs/`: In-source documentation
- `docs/`: Project documentation and reports (e.g., `report.html`)
- `.github/`: GitHub workflows, agents, skills, prompts, instructions, todos, and hooks

## Features

- Modular structure for easy expansion
- Inspired by Magic: The Gathering and RPG elements
- Designed for browser play
- Automated workflows and documentation
- Integrated with [Phaser](https://phaser.io/) for advanced game scenes
- Integrated with [boardgame.io](https://boardgame.io/) for multiplayer and board game logic
- Modular Node.js utilities for deck/card logic

## How to Play


Open `src/scenes/index.html` in your browser. Game logic and features are under active development.

### Scenes and Sections

- **Phaser Demo:** `src/scenes/scene-phaser-demo.html` — Example Phaser-powered scene.
- **boardgame.io Demo:** `src/scenes/scene-boardgameio-demo.html` — Example boardgame.io-powered scene.
- All game logic is organized into scenes and sections for modularity and clarity.

### Node.js & Multiplayer

- To run the boardgame.io server for multiplayer logic:
	```sh
	node src/lib/boardgame.js
	```
	The server will run at http://localhost:8000

- To connect a real client, use boardgame.io's React or custom client and point to the server above.
- All game state logic is modular and can be extended for advanced multiplayer features.

### Utilities

- Shared logic for shuffling and deck creation is in `src/lib/utils.js`.

### Adding New Scenes

- To add new game logic, create a new scene HTML file in `src/scenes/` and link it in `index.html`.

## Contributing

See `.github/instructions/contributing.md` for guidelines. Contributions, issues, and suggestions are welcome!

## License

MIT License. See `LICENSE` file for details.
