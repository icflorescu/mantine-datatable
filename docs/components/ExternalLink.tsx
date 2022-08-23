import { Text } from '@mantine/core';
import { ReactNode } from 'react';

export default function ExternalLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Text variant="link" component="a" href={to} target="_blank" rel="noreferrer">
      {children}
    </Text>
  );
}
