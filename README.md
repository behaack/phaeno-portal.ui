# Phaeno Portal UI

React 19 + Vite 6 single-page application for the Phaeno portal. The UI is organized by feature, uses file-based routing with TanStack Router, and centralizes data access through React Query hooks. Styling and UI primitives are built on Mantine with project-specific components layered on top.

## Architecture overview

### Rendering and routing
- **React 19** application bootstrapped via `src/main.tsx` and rendered with `react-dom`.
- **TanStack Router** with file-based routes in `src/routes` and a generated route tree in `src/routeTree.gen.ts`.
- **Route layouts** in `src/shared/ui/layouts` compose shell structure (auth, app, empty).

### Data access and server state
- **React Query** for API data fetching and caching.
- API hooks live under `src/api/hooks`, built on services in `src/api/services`.
- Shared API types are in `src/api/types`.

### Client state
- **Zustand** for lightweight client state (e.g., impersonation) under `src/stores`.
- React component state used for view-local concerns.

### UI system
- **Mantine** as the base UI system.
- Project primitives and reusable components live under `src/shared/ui`.
- Feature-level UI lives under `src/features` and composes shared primitives.

### Build and tooling
- **Vite 6** for dev/build.
- **TypeScript** with path aliases and `vite-tsconfig-paths`.
- **React Compiler** enabled for production builds (via Babel plugin in Vite).
- **ESLint/Prettier/Stylelint** for linting and formatting.

## Project layout

```
src/
  api/
    hooks/          # React Query hooks
    services/       # API client services
    types/          # API data contracts
  auth/             # auth/session utilities
  features/         # feature modules (pages, modals, components)
  routes/           # TanStack Router file-based routes
  shared/
    hooks/          # shared hooks
    types/          # shared types
    ui/             # design system primitives and components
  stores/           # Zustand stores
  main.tsx          # app entry
  routeTree.gen.ts  # generated route tree
```

## Scripts

- `dev` - start the Vite dev server
- `build` - `tsc` + Vite production build
- `preview` - preview a production build
- `typecheck` - TypeScript type checks
- `lint` - ESLint + Stylelint
- `prettier` / `prettier:write` - format checks and writes

## Configuration notes

- HTTPS dev server uses local certs from `certs/`.
- Route tree generation is handled by the TanStack Router Vite plugin.

## Conventions

- **Feature-first structure**: feature folders own their UI, wiring, and feature-specific helpers.
- **Shared-first reuse**: shared UI and hooks live under `src/shared` to avoid duplication.
- **Data access via hooks**: components call `src/api/hooks` rather than services directly.
