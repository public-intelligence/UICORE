# UI-Core workspace

Angular workspace with the **`@public-intelligence/ui-core`** library and a **demo** app that shows every component.

See the [repository README](../README.md) for what the library includes, how to use it and how to publish it. The full guide, in Spanish, is [`DOCUMENTACION.md`](DOCUMENTACION.md), and the component reference is [`COMPONENTES-UI-CORE.md`](COMPONENTES-UI-CORE.md).

## Structure

```
projects/public-intelligence/ui-core/   The library (published to GitHub Packages)
projects/demo/                          Demo app with the component catalog
scripts/sync-lib-version.cjs            Prepares dist/ for publishing: version, publishing fields, LICENSE and NOTICE
```

## Commands

```bash
npm install
npm start                                  # demo at http://localhost:4200 (catalog at /catalogos)
npm run build:lib                          # library into dist/public-intelligence/ui-core
ng generate component <name> --project @public-intelligence/ui-core
```

## License

Apache License 2.0. See [`LICENSE`](LICENSE) and [`NOTICE`](NOTICE).
