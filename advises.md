Keep "strict": true (good). Consider adding "noImplicitAny": true, "noImplicitReturns".
Rationale: provides deterministic type checking and includes .vue files.
Convert main.js → main.ts

Use typed imports and remove top-level await in entry if you rely on module graph; in Vite you can keep top-level await, but prefer to perform fetch inside a component or composable.
Example: rename file, update index.html script to /src/main.ts (Vite handles TS).
This avoids mixing .js runtime and .ts source which complicates Node ESM resolution.
api.ts

Add precise types for OMDB responses instead of any.
Create interfaces like OmdbSearchItem, OmdbSearchResponse.
Consider returning a Result type:
type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string; status?: number }
Move API key to .env and read via import.meta.env.VITE_OMDB_KEY.
Decide error strategy: either return ApiResult or throw enriched errors (with status and body) and let UI handle them.
Example: validate data.Response === 'True' and map items with full typing.
ui.ts

Best practice: do not manipulate DOM directly in a Vue app. Convert to:
A Vue component ResultsList.vue that receives movies: Movie[] prop, or
A composable useMovies() that returns movies, loading, error.
This keeps reactivity, makes testing easier, and uses templates for accessibility/markup.
If you keep a small helper function, export it but keep it pure and typed (no document queries).
App.vue

Keep script setup (good). Add:
Loading and error reactive state.
Debounce on input (e.g., via lodash.debounce or a small custom debounce).
Use composable to call fetchMovies and handle ApiResult or try/catch properly.
Do not call fetchMovies at module scope if it depends on runtime DOM. Prefer inside onMounted or watch.
Imports and extensions

Because tsconfig uses ESM nodenext/module: nodenext, keep explicit runtime extensions in imports inside .ts files when needed: e.g. import { Movie } from './interfaces/types.js' for runtime; TypeScript knows .ts for type-checking but runtime needs .js. Keep consistency: for Vue and Vite often moduleResolution: bundler reduces friction.
Linting and formatting

Add ESLint with TypeScript and Vue plugins:
eslint, @typescript-eslint/parser, @typescript-eslint/eslint-plugin, eslint-plugin-vue
Add Prettier integration and an ESLint config for auto-fix.
Add pnpm scripts: typecheck, lint, format.
Testing and CI

Add Vitest for unit tests and basic DOM tests for components.
Add GitHub Actions that run pnpm install, pnpm run lint, pnpm run typecheck, pnpm test.
Types for Vue SFCs

Ensure shims-vue.d.ts exists:
declare module '*.vue' { import type { DefineComponent } from 'vue'; const component: DefineComponent<{}, {}, any>; export default component; }
Already often provided by vue-tsc, but include if missing.
Package & scripts

Add scripts to package.json:
"typecheck": "tsc --noEmit"
"lint": "eslint 'src/**/*.{ts,vue,js}' --fix"
"test": "vitest"
"dev", "build", "preview" already present
Security: environment variables

Use .env / .env.local with VITE_OMDB_KEY=.... Update fetchMovies to read import.meta.env.VITE_OMDB_KEY.
Add .env.local to .gitignore.
Small ergonomic fixes already done / to verify

Ensure all import type statements use .js runtime extension when necessary.
Ensure fetchMovies returns typed Movie[] or a typed Result.
Convert ui.ts rendering into Vue templates.
Concrete next steps I can implement for you (pick any):

A — Fix tsconfig.json to the recommended settings and add shims-vue.d.ts.
B — Move API key to .env and update api.ts to use import.meta.env.VITE_OMDB_KEY and create a typed OMDB response interface.
C — Convert ui.ts into a Vue component src/components/ResultsList.vue and update App.vue to use it (includes loading/error states).
D — Add ESLint + Prettier configs and npm scripts.
E — Add typecheck script and run pnpm run typecheck to show current errors.
Which of the concrete tasks above do you want me to start with? I can implement one end-to-end now (suggest starting with A or B).

GPT-5 mini • 1x