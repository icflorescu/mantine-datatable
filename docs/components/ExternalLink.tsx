import { Text } from '@mantine/core';
import { ReactNode } from 'react';

export default function ExternalLink({ to, rel, children }: { to: string; rel?: string; children: ReactNode }) {
  return (
    <Text variant="link" component="a" href={to} target="_blank" rel={rel ?? 'noreferrer'}>
      {children}
    </Text>
  );
}
