import { createStyles } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppNavbarButton, { AppNavbarButtonDisplayProps } from './AppNavbarButton';

const useStyles = createStyles({
  root: {
    textDecoration: 'none',
  },
});

type AppNavbarLinkProps = AppNavbarButtonDisplayProps & { to: string };

export default function AppNavbarLink({ to, ...displayProps }: AppNavbarLinkProps) {
  const { asPath } = useRouter();
  const { classes } = useStyles();
  return (
    <Link className={classes.root} href={to}>
      <AppNavbarButton {...displayProps} active={to === asPath} />
    </Link>
  );
}
