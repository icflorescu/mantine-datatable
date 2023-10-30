import { Anchor } from '@mantine/core';

export type ExternalLinkProps = React.PropsWithChildren<{
  className?: string;
  to: string;
  rel?: string;
}>;

export function ExternalLink({ className, to, rel, children }: ExternalLinkProps) {
  return (
    <Anchor className={className} inherit href={to} target="_blank" rel={rel || 'noreferrer'}>
      {children}
    </Anchor>
  );
}
