import { Text } from '@mantine/core';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function InternalLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link href={to} passHref>
      <Text variant="link" component="a">
        {children}
      </Text>
    </Link>
  );
}
