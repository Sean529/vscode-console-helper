# Repository Guidelines

## Project Structure & Module Organization
- `src/extension.ts`: VS Code entry point; registers commands and wires them to helpers in `src/common`.
- `src/common/*`: core logic for inserting/deleting logs, reading settings, styling, and update checks.
- `src/utils`: shared utilities.
- `out/*`: compiled JavaScript; never edit by hand—always change TypeScript in `src` and recompile.
- `static/*` and `snippets.json`: icons, GIFs, and snippet definitions used by the marketplace listing.

## Build, Test, and Development Commands
- Install deps: `npm install`.
- Type-check / build on change: `npm run watch` (used while debugging the extension in VS Code with F5).
- Lint: `npm run lint` (ESLint + @typescript-eslint; fix issues before committing).
- Tests: `npm test` (Mocha + vscode-test via `test/runTest.js` when a `test/` folder is added).
- Package extension: `npm run build` (runs `vsce package` and emits a `.vsix` file).

## Coding Style & Naming Conventions
- Language: TypeScript, 2-space indentation, double quotes for strings, no unnecessary semicolons.
- Prefer explicit types; avoid `any` (enforced by ESLint config in `.eslintrc.js`).
- Use `camelCase` for variables/functions, `PascalCase` for types, and `UPPER_SNAKE_CASE` for shared constants.
- Keep modules small and focused; new logic usually belongs in `src/common/*` rather than `extension.ts`.

## Testing Guidelines
- Frameworks: Mocha + `vscode-test`. Place future tests under `test/` (for example `test/insertLog.test.ts`).
- Cover string/AST utilities in `src/common/*` and configuration edge cases.
- Run `npm test` before opening a PR; add regression tests for every bug fix.

## Commit & Pull Request Guidelines
- Follow existing history: `feat: …`, `fix: …`, `chore: …`, version bumps like `2.14.3`.
- Keep commits focused and messages concise (English or Chinese are both fine).
- For PRs, describe behavior changes, affected commands/settings, and attach screenshots/GIFs when UX changes.
- Do not commit built artifacts (`out/*`, `*.vsix`) unless explicitly required for a release.

## Agent-Specific Instructions
- Modify only source files under `src/*` and configuration/metadata files at the repository root.
- Prefer `npm` over `yarn` to keep lockfiles consistent.
