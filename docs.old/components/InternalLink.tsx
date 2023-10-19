import { Anchor } from '@mantine/core';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function InternalLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Anchor component={Link} href={to}>
      {children}
    </Anchor>
  );
}
