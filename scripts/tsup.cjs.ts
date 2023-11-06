import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['package/index.ts'],
  format: 'cjs',
  tsconfig: 'scripts/tsconfig.tsup.json',
  target: 'esnext',
  minify: true,
  sourcemap: true,
  clean: false,
});
