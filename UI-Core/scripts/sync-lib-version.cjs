/**
 * Copia name, version y campos de publicación del package.json de la librería
 * al package.json de dist, sin tocar los campos que genera ng-packagr (module, typings, exports).
 * También copia LICENSE y NOTICE (Apache 2.0) a dist, porque deben acompañar al paquete publicado.
 * Uso: node scripts/sync-lib-version.cjs
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const srcPkgPath = path.join(root, 'projects', 'public-intelligence', 'ui-core', 'package.json');
const distPkgPath = path.join(root, 'dist', 'public-intelligence', 'ui-core', 'package.json');

if (!fs.existsSync(srcPkgPath)) {
  console.error('No encontrado:', srcPkgPath);
  process.exit(1);
}
if (!fs.existsSync(distPkgPath)) {
  console.error('No encontrado:', distPkgPath, '- ejecuta antes: ng build @public-intelligence/ui-core');
  process.exit(1);
}

const src = JSON.parse(fs.readFileSync(srcPkgPath, 'utf8'));
const dist = JSON.parse(fs.readFileSync(distPkgPath, 'utf8'));

console.log('Origen (versión):', srcPkgPath, '->', src.version);
console.log('');

dist.name = src.name;
dist.version = src.version;
dist.publishConfig = src.publishConfig;
dist.peerDependencies = src.peerDependencies;
dist.dependencies = src.dependencies;
dist.sideEffects = src.sideEffects;

fs.writeFileSync(distPkgPath, JSON.stringify(dist, null, 2) + '\n');
console.log('Dist actualizado -> version:', dist.version);

// LICENSE y NOTICE viven en la raíz del workspace; ng-packagr no copia assets de fuera de la librería.
for (const archivo of ['LICENSE', 'NOTICE']) {
  fs.copyFileSync(path.join(root, archivo), path.join(path.dirname(distPkgPath), archivo));
}
console.log('LICENSE y NOTICE copiados a dist');
console.log('');
