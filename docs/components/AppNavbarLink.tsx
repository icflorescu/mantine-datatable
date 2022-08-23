import Link from 'next/link';
import { useRouter } from 'next/router';
import AppNavbarButton, { AppNavbarButtonDisplayProps } from './AppNavbarButton';

type AppNavbarLinkProps = AppNavbarButtonDisplayProps & { to: string };

export default function AppNavbarLink({ to, ...displayProps }: AppNavbarLinkProps) {
  const { asPath } = useRouter();
  return (
    <Link href={to} passHref>
      <AppNavbarButton {...displayProps} active={to === asPath} />
    </Link>
  );
}
