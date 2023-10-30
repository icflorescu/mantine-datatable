import type { Route } from 'next';
import Link from 'next/link';
import { WEBSITE_LINK } from '~/app/config';

type SearhcHitProps = React.PropsWithChildren<{
  hit: { url: string };
}>;

const PREFIX_LENGTH = WEBSITE_LINK.length;

export function DocSearchHit({ hit: { url }, children }: SearhcHitProps) {
  return <Link href={url.slice(PREFIX_LENGTH) as Route}>{children}</Link>;
}
