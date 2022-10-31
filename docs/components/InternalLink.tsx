import { Text } from '@mantine/core';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function InternalLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Text variant="link" component={Link} href={to}>
      {children}
    </Text>
  );
}
