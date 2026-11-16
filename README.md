# UI-Core

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

Shared Angular component library and design system, published as **`@public-intelligence/ui-core`**. Bot Factory, GOB-ID and PDS build their interfaces on it, so administration screens look and behave the same across the platforms.

- [What it includes](#what-it-includes)
- [Repository structure](#repository-structure)
- [Tech stack](#tech-stack)
- [Using the library](#using-the-library)
- [Developing](#developing)
- [Publishing](#publishing)
- [Contributing](#contributing)
- [License](#license)
- [Vision and acknowledgments](#vision-and-acknowledgments)

## What it includes

- **Layout:**
  - `AdminLayoutComponent`: the main shell, with sidebar, header and content;
  - `HeaderComponent` and `SidebarComponent`;
  - `LayoutService`, for the page title, breadcrumbs, user profile and menus.
- **Shared components:**
  - action menu;
  - single and multi-select dropdowns with search;
  - alert, notification and immutable-content banners;
  - confirmation modal and dialog;
  - full-screen loader for sign-in waits;
  - data table and paginated table;
  - page and detail-page shells;
  - filter bar;
  - status pill;
  - tree view;
  - error summary and validation results panel.
- **Services and models:** `ToastService`, the pagination models and adapter, and the dropdown and menu models.
- **Styles:**
  - `styles.css`, the design system stylesheet;
  - `tailwind.preset.js`, a Tailwind preset with the design tokens.

The complete list, with selectors, inputs and outputs, is in [`UI-Core/COMPONENTES-UI-CORE.md`](UI-Core/COMPONENTES-UI-CORE.md) (in Spanish). The demo app shows every component working (see [Developing](#developing)).

## Repository structure

```
UI-Core/                                  Angular workspace
  projects/public-intelligence/ui-core/   The library that is published
  projects/demo/                          Demo app with the component catalog
  scripts/sync-lib-version.cjs            Build step that prepares dist/ for publishing
  DOCUMENTACION.md                        Full guide: develop, consume, publish (Spanish)
  COMPONENTES-UI-CORE.md                  Component and API reference (Spanish)
```

## Tech stack

Angular 18 (standalone components), Tailwind CSS, ng-packagr, and GitHub Packages as the npm registry.

## Using the library

1. **Registry.** Add GitHub Packages to the `.npmrc` of your project, with a GitHub token that has `read:packages` in `NPM_TOKEN`:

   ```
   @public-intelligence:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${NPM_TOKEN}
   ```

2. **Install.**

   ```bash
   npm install @public-intelligence/ui-core
   ```

   The library declares Angular 18 as its peer dependency. Projects on newer Angular versions install it with `--legacy-peer-deps` or an npm `overrides` entry.

3. **Styles.**
   - **Tailwind CSS 4:** add `node_modules/@public-intelligence/ui-core/styles.css` to the `styles` of `angular.json`. In your stylesheet, after `@import "tailwindcss";`, add `@source "../node_modules/@public-intelligence/ui-core/fesm2022/public-intelligence-ui-core.mjs";` so Tailwind sees the classes the components use.
   - **Tailwind CSS 3:** add `./node_modules/@public-intelligence/ui-core/**/*.{html,ts,mjs,js}` to `content` in `tailwind.config.js`, and `@import "@public-intelligence/ui-core/styles.css";` to your stylesheet.

4. **Use.**

   ```ts
   import { AdminLayoutComponent, AlertBannerComponent, ToastService } from '@public-intelligence/ui-core';
   ```

## Developing

From `UI-Core/`:

```bash
npm install
npm start               # demo at http://localhost:4200 (component catalog at /catalogos)
npm run build:lib       # builds the library into dist/public-intelligence/ui-core
```

The demo uses the library source directly, so changes reload without building the library. Node.js 18.19 or later (LTS) is required.

There are no unit tests in the library yet.

## Publishing

1. Set the new version in `UI-Core/projects/public-intelligence/ui-core/package.json` and save it.
2. Run `npm run build:lib` from `UI-Core/`. It builds the library and then runs `scripts/sync-lib-version.cjs`, which:
   - aligns the version and the publishing fields of `dist`;
   - copies `LICENSE` and `NOTICE` into the package.
3. Run `npm publish` from `UI-Core/dist/public-intelligence/ui-core`. It needs a token with `write:packages` in `NPM_TOKEN`; see `UI-Core/.npmrc.example`.

## Contributing

- Work in a branch from `development` and open a pull request against it. `master` receives approved versions.
- Export every new component from `projects/public-intelligence/ui-core/src/public-api.ts`.
- Add new components to the demo catalog and to `COMPONENTES-UI-CORE.md`.

## License

Copyright 2026 Jean Antonio Garcia Periche, Melissa Michelle Muñoz Suro and Rainier Christopher Domingo Mallol Cotes.

Licensed under the [Apache License, Version 2.0](LICENSE). See [`NOTICE`](NOTICE). The published package includes both files.

## Vision and acknowledgments

### Vision

UI-Core follows the software architecture and best practices of the vision paper [*The Operative Republic: Building an Operating System for Dominican Government Services*](https://publicintelligence.ai/govos), by Rainier Mallol.

The paper argues that the next phase of public-sector modernization will be defined less by portals and more by **Digital Public Infrastructure**: shared, interoperable capabilities that many institutions can reuse instead of rebuilding. Its architecture, **Federated Bounded-Context Microservices with Centralized Orchestration (FeBMO)**, lets each institution retain ownership of its systems and data, while shared identity, workflow governance, audit trails and service standards bring them together as one coherent service environment.

UI-Core is the shared interface layer of the platforms built on that architecture. One set of components, styles and design tokens lets Bot Factory, GOB-ID, PDS and the systems that follow look and behave as one coherent environment, instead of every team rebuilding the same screens.

**[Read the vision paper →](https://publicintelligence.ai/govos)**

### Acknowledgments

UI-Core was designed and built with the participation of:

| Name | Role |
|---|---|
| Rainier Mallol | Software Architecture Design |
| José Ant. Cid Troncoso | Lead Engineer |
| Cesar Pichardo | UI/UX Design Lead |

These acknowledgments only recognize participation in the design and development of UI-Core. They do not grant any copyright, ownership, license or other legal right in the software or its name. All rights belong exclusively to the copyright holders listed under [License](#license).

*Built to help move government services from fragmented coordination to structured execution.*
