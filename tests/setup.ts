import '@mantine/core/styles.css';
import '../package/styles.css';
import { beforeEach } from 'vitest';

// Column state is persisted in `localStorage`, so make sure tests don't leak into each other
beforeEach(() => {
  localStorage.clear();
});
