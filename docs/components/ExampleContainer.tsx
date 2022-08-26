import { Box, Paper } from '@mantine/core';
import { ReactNode } from 'react';

export default function ExampleContainer({ height, children }: { height?: number; children: ReactNode }) {
  return (
    <Paper my="xl" withBorder sx={{ overflow: 'hidden' }}>
      <Box sx={height ? { height } : undefined}>{children}</Box>
    </Paper>
  );
}
