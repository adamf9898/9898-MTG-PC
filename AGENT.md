# AGENT.md

This file provides repository-specific guidance for AI coding agents and contributors.

> TODO: Replace the placeholders below with facts discovered from this repo (link to exact files/dirs).

## 1) Big picture (architecture + data flow)
- **What this repo is:** <!-- TODO: 1–2 sentences -->
- **Primary components:** <!-- TODO: e.g., web app, API, worker, infra -->
- **How data flows end-to-end:** <!-- TODO: request → service → DB → events, etc. -->
- **Key design constraints / “why”:** <!-- TODO: e.g., multi-tenant, offline-first -->

## 2) Key directories and what belongs where
- `src/` <!-- TODO: describe -->
- `tests/` <!-- TODO: describe -->
- `docs/` <!-- TODO: describe -->
- `scripts/` <!-- TODO: describe -->
- Other notable paths: <!-- TODO -->

## 3) Developer workflows (copy/paste commands)
> TODO: Fill in the real commands used in this repo (and the file they come from, e.g., README.md, package.json scripts, Makefile).

### Build

- Build commands are repository-specific; fill these in by citing the exact source file(s):
    - `README.md` (Build/Getting Started sections)
    - `package.json` (scripts)
    - `Makefile` / `justfile`
    - `*.sln` / `*.csproj`
    - `pom.xml` / `build.gradle`
    - `go.mod`

- To discover the real build command(s), run:
    - `ls` (or `dir`) and look for the files above
    - `rg -n "scripts|build|compile" README.md package.json Makefile justfile pom.xml build.gradle* *.sln *.csproj go.mod`

- Then document the canonical build command(s) here in copy/paste form, e.g.:
    - `<build-command-1>`  (from `<file>`, `<path>`)
    - `<build-command-2>`  (from `<file>`, `<path>`)