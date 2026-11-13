import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

// Component tests run in a real (headless) Chromium, since the data table relies on layout,
// scrolling, media queries and `localStorage`, which DOM emulators like jsdom don't fully implement.
// They're meant to be run locally with `pnpm test`, not in CI.
export default defineConfig({
  // Make sure the package code and vitest-browser-react share the same React instance
  resolve: { dedupe: ['react', 'react-dom'] },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', 'react/jsx-dev-runtime', 'vitest-browser-react'],
  },
  test: {
    include: ['tests/**/*.test.tsx'],
    setupFiles: ['tests/setup.ts'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      viewport: { width: 1280, height: 720 },
    },
  },
});
