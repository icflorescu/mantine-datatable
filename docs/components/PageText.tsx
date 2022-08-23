import { Text } from '@mantine/core';
import { ReactNode } from 'react';

export default function PageText({ children }: { children: ReactNode }) {
  return <Text sx={{ margin: '1em 0' }}>{children}</Text>;
}
