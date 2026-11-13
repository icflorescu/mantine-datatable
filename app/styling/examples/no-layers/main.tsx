// 👇 Import the Mantine core styles first...
import '@mantine/core/styles.css';
// 👇 ...then the mantine-datatable styles
import '__PACKAGE__/styles.css';

import { MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>
);
