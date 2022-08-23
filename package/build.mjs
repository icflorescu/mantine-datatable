import { build } from 'esbuild';
import { cp, rm } from 'node:fs/promises';
import pkg from './package.json' assert { type: 'json' };

const formats = [
  { name: 'esm', extension: 'mjs' },
  { name: 'cjs', extension: 'cjs' },
];

/** @type {import('esbuild').BuildOptions} */
const config = {
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['esnext'],
  logLevel: 'info',
  entryPoints: ['index.ts'],
  inject: ['react-shim.mjs'],
  external: Object.keys(pkg.peerDependencies),
};

await rm('./dist', { recursive: true, force: true });
await cp('../README.md', 'dist/README.md');
await cp('../LICENSE', 'dist/LICENSE');

for (const { name, extension } of formats) {
  await build({ ...config, format: name, outfile: `./dist/index.${extension}` });
}
