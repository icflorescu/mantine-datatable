import { Anchor } from '@mantine/core';
import Link from 'next/link';

export type InternalLinkProps = React.PropsWithChildren<{
  className?: string;
  to: string;
}>;

export function InternalLink({ className, to, children }: InternalLinkProps) {
  return (
    <Anchor className={className} inherit component={Link} href={to}>
      {children}
    </Anchor>
  );
}
