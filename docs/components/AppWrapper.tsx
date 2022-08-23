import { createStyles, Global } from '@mantine/core';
import { ReactNode, useState } from 'react';
import { HEADER_HEIGHT, NAVBAR_BREAKPOINT, NAVBAR_WIDTH } from '~/config';
import AppHeader from './AppHeader';
import AppNavbar from './AppNavbar';

const useStyles = createStyles((theme) => ({
  main: {
    marginTop: HEADER_HEIGHT,
    padding: `${theme.spacing.lg}px 0`,
    [`@media (min-width: ${theme.breakpoints[NAVBAR_BREAKPOINT]}px)`]: {
      marginLeft: NAVBAR_WIDTH,
    },
  },
}));

export default function AppWrapper({ children }: { children: ReactNode }) {
  const [navbarVisible, setNavbarVisible] = useState(false);

  const { classes } = useStyles();

  return (
    <>
      <Global
        styles={(theme) => ({
          body: {
            background:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.fn.lighten(theme.colors.gray[0], 0.9),
          },
        })}
      />
      {navbarVisible && (
        <Global
          styles={(theme) => ({
            body: {
              [`@media (max-width: ${theme.breakpoints.md - 1}px)`]: {
                overflow: 'hidden',
              },
            },
          })}
        />
      )}
      <AppNavbar visible={navbarVisible} onHideClick={() => setNavbarVisible(false)} />
      <AppHeader navbarVisible={navbarVisible} onShowNavbarClick={() => setNavbarVisible(true)} />
      <div className={classes.main}>{children}</div>
    </>
  );
}
