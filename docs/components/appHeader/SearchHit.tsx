import Link from 'next/link';
import { ReactNode } from 'react';

type SearhcHitProps = {
  hit: { url: string };
  children: ReactNode;
};

const PREFIX_LENGTH = 'https://icflorescu.github.io/mantine-datatable'.length;

export default function SearchHit({ hit: { url }, children }: SearhcHitProps) {
  return <Link href={url.slice(PREFIX_LENGTH)}>{children}</Link>;
}
