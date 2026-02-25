# Repository Guidelines

## Project Structure & Module Organization
- `src/main.tsx` mounts the React 19 app and wires routes via `BrowserRouter`.
- Page-level views live in `src/pages` (`Home`, `NotFound`) and are re-exported through `src/pages/index.tsx` for clean imports.
- Reusable UI is grouped by intent under `src/components` (e.g., `Layout`, `Navigation`, `Form`, `Charts`); share cross-cutting helpers in `src/components/Utils`.
- Global styles sit in `src/styles`; static assets belong in `src/assets`; Vite serves anything in `public/` as-is.
- TypeScript/Vite configs: `tsconfig.*.json`, `vite.config.ts`; ESLint flat config is in `eslint.config.js`.

## Build, Test, and Development Commands
- Install deps with the Bun lockfile: `bun install`.
- Local dev with HMR: `bun run dev`.
- Type-check and bundle: `bun run build` (runs `tsc -b` then `vite build`).
- Preview the production build: `bun run preview`.
- Lint the codebase: `bun run lint`.

## Coding Style & Naming Conventions
- Use TypeScript + React function components with hooks; prefer React Router for navigation.
- Files and folders for components/pages use `PascalCase`; util files may use `camelCase`.
- Two-space indent, trailing semicolons, and double quotes match current code. Keep JSX lean and side-effect free.
- Keep imports ordered: external first, then aliases (if added), then relative paths.
- Rely on `eslint.config.js` (includes TypeScript, React Hooks, and Vite Refresh presets); fix findings before committing.

## Testing Guidelines
- No automated test harness is configured yet. When adding tests, align with Vite by adopting `vitest` + `@testing-library/react`.
- Co-locate tests next to sources as `*.test.tsx`/`*.test.ts` and cover component behavior (rendered states, routing expectations) and utility edge cases.
- Aim for meaningful assertions over snapshot-only coverage; keep tests deterministic and free of network calls.

## Commit & Pull Request Guidelines
- No repository history is present; use Conventional Commits (e.g., `feat: add navigation shell`, `fix: handle 404 route`) to keep history searchable.
- Before opening a PR: run `bun run lint` and `bun run build`; include a concise summary, linked issue/task ID, and UI screenshots/GIFs when visuals change.
- Favor small, focused PRs; describe any follow-ups or known gaps explicitly. Ensure routing or API surface changes are called out in the description.
