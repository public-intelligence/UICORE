# @public-intelligence/ui-core

Shared Angular component library and design system used by Bot Factory, GOB-ID and PDS. It provides:
- an administration layout, with sidebar, header and layout service;
- shared components: tables, dropdowns, banners, modals, filter bar, status pill, tree view and more;
- a toast service;
- the design system styles and a Tailwind preset.

## Install

The package is published on GitHub Packages. Add the registry to your `.npmrc`, with a GitHub token that has `read:packages` in `NPM_TOKEN`:

```
@public-intelligence:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

```bash
npm install @public-intelligence/ui-core
```

The library declares Angular 18 as its peer dependency. On newer Angular versions, install it with `--legacy-peer-deps` or an npm `overrides` entry.

## Styles

- **Tailwind CSS 4:** add `node_modules/@public-intelligence/ui-core/styles.css` to the `styles` of `angular.json`. After `@import "tailwindcss";` in your stylesheet, add `@source "../node_modules/@public-intelligence/ui-core/fesm2022/public-intelligence-ui-core.mjs";`.
- **Tailwind CSS 3:** add `./node_modules/@public-intelligence/ui-core/**/*.{html,ts,mjs,js}` to `content` in `tailwind.config.js`, and `@import "@public-intelligence/ui-core/styles.css";` to your stylesheet.

## Use

```ts
import { AdminLayoutComponent, AlertBannerComponent, ToastService } from '@public-intelligence/ui-core';
```

The complete component reference is in the [UI-Core repository](https://github.com/public-intelligence/UICORE).

## License

Copyright 2026 Jean Antonio Garcia Periche, Melissa Michelle Muñoz Suro and Rainier Christopher Domingo Mallol Cotes. Licensed under the Apache License, Version 2.0. See `LICENSE` and `NOTICE` in this package.
