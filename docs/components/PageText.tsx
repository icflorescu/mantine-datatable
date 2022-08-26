import { Text } from '@mantine/core';
import { ReactNode } from 'react';

export default function PageText({ children }: { children: ReactNode }) {
  return <Text my="xl">{children}</Text>;
}
