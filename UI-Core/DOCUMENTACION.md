# Documentación UI-Core

Todo en un solo documento, por categorías.

---

# 1. Desarrollo (este repositorio)

Para quien trabaja en el código del monorepo (librería + demo).

## Requisitos

- **Node.js** 18.x o 20.x (recomendado LTS)
- **npm** 9+

## Instalar y ejecutar

```bash
npm install
ng serve
```

O `npm start`. Si no tienes Angular CLI global, usa `npx ng serve` (o `npx ng build`, etc.).  
La app se sirve en **http://localhost:4200/** (por defecto).  
En desarrollo no hace falta `.npmrc`; solo créalo (desde `.npmrc.example`) si vas a publicar o a instalar desde Azure Artifacts.

¿Hay que compilar la librería? **No** para desarrollar: la demo usa el código fuente y se recarga al guardar. Para publicar se usa `npm run build:lib` (ver sección 3).

**Comandos:** `ng build` (demo) | `npm run build:lib` (librería para publicar) | `ng serve --port 4201` | `ng test @public-intelligence/ui-core`

## Al cambiar de rama

Guarda tu trabajo (commit o `git stash push -u -m "..."`), luego `git checkout nombre-de-la-rama`. Después de cambiar: `npm install` si cambió `package.json`, y `ng serve`. Si usaste stash, al volver: `git stash pop`.

## Solución de problemas (desarrollo)

- **EPERM / "cleanup Failed to remove" en `npm install`** — Cierra `ng serve` y vuelve a intentar. Si dice "audited X packages", la instalación fue correcta.
- **"Cannot find module '@tailwindcss/postcss'"** — `npm install -D @tailwindcss/postcss`
- **Puerto 4200 en uso** — `ng serve --port 4201`
- **Cambios en la librería no se ven** — Reinicia `ng serve`.

## Carpetas/archivos que puedes borrar (liberar espacio)

- **`dist/`** — Salida de compilación. Se regenera con `ng build` o `ng serve`. No se versiona.
- **`.angular/cache/`** — Caché del CLI. Se regenera solo. No se versiona.
- **`out-tsc/`** — Compilación TypeScript temporal. No se versiona.

Para limpiar: borra esas carpetas a mano o en PowerShell `Remove-Item -Recurse -Force dist, .angular, out-tsc -ErrorAction SilentlyContinue`.

---

# 2. Consumir la librería

Para proyectos que instalan `@public-intelligence/ui-core` desde GitHub Packages de la organización public-intelligence y usan Tailwind.

## Configuración de acceso (GitHub Packages)

En la raíz del proyecto consumidor, crear `.npmrc`:

```
@public-intelligence:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

Autenticación: un token de GitHub con permiso `read:packages` en la variable `NPM_TOKEN`.

## Instalación

```bash
npm install @public-intelligence/ui-core
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

## Tailwind (obligatorio)

En `tailwind.config.js`, incluir en `content`:

```js
"./node_modules/@public-intelligence/ui-core/**/*.{html,ts,mjs,js}"
```

En `src/styles.css` (o `styles.scss`): directivas `@tailwind base/components/utilities` y `@import "@public-intelligence/ui-core/styles.css";`

## Verificación

Importar componentes en tu app, p. ej. `import { HeaderComponent, SidebarComponent, AlertBannerComponent } from '@public-intelligence/ui-core';`

Notas: Angular 18; si los estilos no se aplican, revisa el `content` de Tailwind. Para Tailwind v4 puede hacer falta `@tailwindcss/postcss` y `@import "tailwindcss"`.

---

# 3. Publicar

Para publicar el paquete en GitHub Packages de la organización public-intelligence.

## En GitHub (una vez)

Quien publica debe poder publicar paquetes en la organización `public-intelligence` (por ejemplo, ser owner).

## En tu máquina

`.npmrc` en la raíz (copiar desde `.npmrc.example`) y un token de GitHub con `write:packages` en la variable `NPM_TOKEN`.

## Publicar el paquete (forma actual)

Se usa **`npm run build:lib`** para compilar y dejar la versión de `dist` alineada con la del código. Luego se publica desde la carpeta `dist`.

### Paso 1: Subir la versión

Editar **`projects/public-intelligence/ui-core/package.json`** y poner la versión que quieras publicar (semver, ej. `0.0.6`). No usar formatos inválidos como `0.0.5.1`.

**Importante:** guardar el archivo antes de ejecutar el build; el script de sincronización lee el `package.json` desde disco.

### Paso 2: Compilar y sincronizar versión en dist

Desde la **raíz del repositorio**:

```bash
npm run build:lib
```

Este comando hace dos cosas:

1. **`ng build @public-intelligence/ui-core`** — compila la librería y escribe la salida en `dist/public-intelligence/ui-core`.
2. **`node scripts/sync-lib-version.cjs`** — copia del `package.json` de la librería al de `dist` los campos `name`, `version`, `publishConfig`, `peerDependencies`, `dependencies` y `sideEffects`, sin tocar lo que genera ng-packagr (`module`, `typings`, `exports`).

Así se evita que en `dist` quede una versión antigua por caché de Angular. En la consola deberías ver algo como:

```
Origen (versión): ...\projects\public-intelligence\ui-core\package.json -> 0.0.6
Dist actualizado -> version: 0.0.6
```

### Paso 3: Publicar

```bash
cd dist/public-intelligence/ui-core
npm publish
```

El `package.json` de la librería tiene `publishConfig.registry` apuntando a GitHub Packages, así que `npm publish` publica ahí. Si falla la autenticación, revisa que `NPM_TOKEN` tenga `write:packages`.

### Resumen

| Paso | Acción |
|------|--------|
| 1 | Subir versión en `projects/public-intelligence/ui-core/package.json` y **guardar**. |
| 2 | En la raíz: `npm run build:lib`. |
| 3 | `cd dist/public-intelligence/ui-core` y `npm publish`. |

## Pipeline (opcional)

Pasos sugeridos en GitHub Actions: `actions/setup-node`, `npm ci`, **`npm run build:lib`** en la raíz del repo y `npm publish` en `dist/public-intelligence/ui-core`, con `NPM_TOKEN` = `secrets.GITHUB_TOKEN` y el permiso `packages: write`.

---

# 4. Referencia del paquete

Comandos para el proyecto de la librería dentro del monorepo.

- **Generar componente:** `ng generate component nombre --project @public-intelligence/ui-core` (también directive, pipe, service, etc.; usar siempre `--project @public-intelligence/ui-core`).
- **Build (para publicar):** `npm run build:lib` → compila y deja la versión correcta en `dist/public-intelligence/ui-core`.
- **Tests:** `ng test @public-intelligence/ui-core`.

---

# 5. Componentes de la librería

**Listado completo de componentes, servicios y modelos** que exporta `@public-intelligence/ui-core`:

→ **[COMPONENTES-UI-CORE.md](./COMPONENTES-UI-CORE.md)**

Ahí se detallan selectores, inputs, outputs y una breve descripción de cada export del artifact. Para verlos en funcionamiento, ejecuta la demo y entra en **Catálogo de componentes** (ruta `/catalogos`).

---

*Plantilla .npmrc: ver `.npmrc.example` en la raíz del repo.*
