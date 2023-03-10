import { Anchor } from '@mantine/core';
import { ReactNode } from 'react';

export default function ExternalLink({ to, rel, children }: { to: string; rel?: string; children: ReactNode }) {
  return (
    <Anchor href={to} target="_blank" rel={rel ?? 'noreferrer'}>
      {children}
    </Anchor>
  );
}
