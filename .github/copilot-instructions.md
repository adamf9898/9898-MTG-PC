
# 9898-MTG-PC Copilot Instructions

This repository contains multiple projects for the Magic: The Gathering (MTG) League **9898-MTG**.

The **9898-MTG** League specializes in custom MTG relations such as training AI models, AI Agents, generating and creating MTG-related content, and hosting web-based MTG tools. 

## Architecture & Structure
- **Monorepo**: Contains several projects under `projects/`, each with its own `README.md` and `docs/`.
- **Docs**: Project documentation is in `projects/9898-MTG-Generators/docs/` (see `ARCHITECTURE.md`, `CONTRIBUTING.md`, `DEPLOYMENT.md`, etc.).
- **Generators**: Main code for generators is in `projects/9898-MTG-Generators/generators/`.
- **Source**: Core libraries and utilities. Each tool or generator may have its own structure in `src/**`; check each subfolder.

## Key Workflows
- **Build (Node.js projects):**
	- Install: `npm install` (see `DEPLOYMENT.md`)
	- Build: `npm run build`
	- Test: `npm test` (see `TESTING.md`)
- **Python scripts**: Run directly with Python 3.x; see script comments for usage.
- **Web Generators**: Some tools (e.g., League Presents) are hosted on Perchance and do not require local build.
- **Documentation**: Update `docs/` files as needed; see `CONTRIBUTING.md`.
- **Deployment**: Follow instructions in `DEPLOYMENT.md` for deploying web tools.
- **Scripts**: Utility scripts are in `scripts/`; see comments for usage.
- **Docs Generation**: Some documentation is auto-generated; see `docs/GENERATING_DOCS.md`.
- **Workflows**: GitHub Actions workflows are in `.github/workflows/`.
- **Workspaces**: Managed with npm workspaces; see `package.json` at the root.
- **Dependencies**: Managed with `package.json` files in each project folder.
- **CI/CD**: Automated via GitHub Actions; see `.github/workflows/`.
- **Web Apps**: Hosted on Perchance or other platforms; see `DEPLOYMENT.md`.
- **Tools**: Various utilities and tools are in `tools/`; see individual tool documentation.
- **Configuration**: Config files are in `config/` or project root; see `CONFIGURATION.md`.
-  **Wikis**: Some projects maintain wikis for additional documentation; see project `README.md`.
- **Readme**: Each project and major folder contains a `README.md` for overview and instructions.
- **Language Support**: Primarily JavaScript/Node.js/Python/LUA; see individual project documentation for details.
- **Agents**: AI Agents are in `C:\9898-MTG-PC\projects\9898-MTG-Generators\.github\agents\*`; see `README.md` there. 

## Conventions & Patterns
- **Docs-first**: All major workflows and standards are documented in `docs/`.
- **Modern JS**: Use ES6+ JavaScript, semantic HTML5, and accessible CSS (see `CONTRIBUTING.md`).
- **Pull Requests**: Use the template in `docs/PULL_REQUEST_TEMPLATE.md`.
- **Community Standards**: See `CODE_OF_CONDUCT.md` and `GOVERNANCE.md` for behavior and decision-making.
- **Testing**: Add tests to `tests/core.test.js` (see `TESTING.md`).

## Integration & Extensibility
- **API Integration**: Scryfall API integration is described in `ARCHITECTURE.md`.
- **Adding Generators**: Place new generators in `generators/` and document in `README.md`.
- **Environment Variables**: Configure as needed for deployment (see `DEPLOYMENT.md`).

## Examples
- To add a new instruction: see `docs/CONTRIBUTING.md` ("Adding Instructions" section).
- To run a generator: see the relevant `README.md` in each generator's folder.
- To contribute: fork, update, and submit a pull request (see `CONTRIBUTING.md`).

## References
- `docs/CHECKLIST.md` and `docs/GitHub Repository Markdown Files Checklist.md` enumerate all required documentation files.
- For support, see `docs/SUPPORT.md` and `docs/FAQ.md`.

---
If any section is unclear or incomplete, please provide feedback for further improvement.