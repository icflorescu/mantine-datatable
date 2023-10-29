import { Anchor } from '@mantine/core';
import type { Route } from 'next';
import Link from 'next/link';

export type InternalLinkProps = React.PropsWithChildren<{
  className?: string;
  to: Route;
}>;

export function InternalLink({ className, to, children }: InternalLinkProps) {
  return (
    <Anchor className={className} inherit component={Link} href={to}>
      {children}
    </Anchor>
  );
}
