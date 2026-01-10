# AGENTS.md

Instructions for AI coding agents working in this repository.

## Primary task
Maintain and improve the repo’s AI guidance file:

- **Target file:** `.github/copilot-instructions.md`
- **Goal:** Make an AI agent productive quickly by documenting *discoverable* project-specific architecture, workflows, and conventions.

## How to update `.github/copilot-instructions.md`
1. **Scan the repo once** for existing AI guidance and key entrypoints using this glob:
    - `**/{.github/copilot-instructions.md,AGENT.md,AGENTS.md,CLAUDE.md,.cursorrules,.windsurfrules,.clinerules,.cursor/rules/**,.windsurf/rules/**,.clinerules/**,README.md}`
2. **Extract only what is evidenced in the codebase**, focusing on:
    - Big-picture architecture and data flows that require reading multiple files
    - Critical developer workflows (build/test/debug) and the exact commands
    - Project-specific conventions and patterns that differ from defaults
    - Integrations/external dependencies and cross-component communication
3. If `.github/copilot-instructions.md` already exists, **merge intelligently**:
    - Preserve valuable content
    - Update or remove outdated sections
    - Avoid duplicating information found elsewhere unless it’s essential
4. Write **concise, actionable** markdown (~20–50 lines), structured with headings/bullets.
5. Include **concrete references** (directories/files) when describing patterns.

## Content rules
- Avoid generic advice (e.g., “write tests”, “handle errors”) unless it’s tied to this repo’s specific approach.
- Do not document aspirational practices—only patterns you can verify from the repository.
- Prefer examples grounded in real code locations.

## Agent output expectations
- After updating `.github/copilot-instructions.md`, **ask for feedback** on any unclear or incomplete sections to iterate.