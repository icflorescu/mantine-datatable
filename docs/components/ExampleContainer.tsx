import { Paper } from '@mantine/core';
import { ReactNode } from 'react';

export default function ExampleContainer({ children }: { children: ReactNode }) {
  return (
    <Paper my="xl" withBorder sx={{ overflow: 'hidden' }}>
      {children}
    </Paper>
  );
}
