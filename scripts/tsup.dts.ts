import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['package/index.ts'],
  dts: {
    only: true,
    compilerOptions: {
      incremental: false,
      // tsup forces `baseUrl: "."` internally when invoking rollup-plugin-dts,
      // which trips TS 6's deprecation warning. Until tsup drops that, silence it here.
      ignoreDeprecations: '6.0',
    }
  },
  clean: false,
});
