import { createStyles, Global, px } from '@mantine/core';
import { ReactNode, useState } from 'react';
import {
  FOOTER_HEIGHT_ABOVE_NAVBAR_BREAKPOINT,
  FOOTER_HEIGHT_BELOW_NAVBAR_BREAKPOINT,
  HEADER_HEIGHT,
  NAVBAR_BREAKPOINT,
  NAVBAR_WIDTH,
} from '~/config';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import AppNavbar from './AppNavbar';

const useStyles = createStyles((theme) => {
  const shadowGradientAlpha = theme.colorScheme === 'dark' ? 0.2 : 0.015;
  return {
    main: {
      position: 'relative',
      background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.fn.lighten(theme.colors.gray[0], 0.9),
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
      marginTop: HEADER_HEIGHT,
      marginBottom: FOOTER_HEIGHT_BELOW_NAVBAR_BREAKPOINT,
      minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT_BELOW_NAVBAR_BREAKPOINT}px)`,
      padding: `${theme.spacing.lg} 0`,
      '&::after': {
        position: 'absolute',
        content: '""',
        left: 0,
        right: 0,
        height: theme.spacing.sm,
        bottom: -px(theme.spacing.sm) - 1,
        background: `linear-gradient(${theme.fn.rgba(theme.black, shadowGradientAlpha)}, ${theme.fn.rgba(
          theme.black,
          0
        )}), linear-gradient(${theme.fn.rgba(theme.black, shadowGradientAlpha)}, ${theme.fn.rgba(theme.black, 0)} 30%)`,
      },
      [`@media (min-width: ${theme.breakpoints[NAVBAR_BREAKPOINT]})`]: {
        marginLeft: NAVBAR_WIDTH,
        marginBottom: FOOTER_HEIGHT_ABOVE_NAVBAR_BREAKPOINT,
        minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT_ABOVE_NAVBAR_BREAKPOINT}px)`,
      },
    },
  };
});

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
          '::-webkit-scrollbar': {
            width: 12,
            height: 12,
            background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3],
          },
          '::-webkit-scrollbar-thumb': {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[5],
            borderRadius: 6,
            border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]}`,
            '&:hover': {
              background: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[6],
            },
          },
          '@-moz-document url-prefix()': {
            '*': {
              scrollbarWidth: 'thin',
              scrollbarColor:
                theme.colorScheme === 'dark'
                  ? `${theme.colors.dark[6]} ${theme.colors.dark[4]}`
                  : `${theme.colors.gray[3]} ${theme.colors.gray[5]}`,
            },
          },
        })}
      />
      {navbarVisible && (
        <Global
          styles={(theme) => ({
            body: {
              [`@media (max-width: ${px(theme.breakpoints.md) - 1}px)`]: {
                overflow: 'hidden',
              },
            },
          })}
        />
      )}
      <AppNavbar visible={navbarVisible} onHideClick={() => setNavbarVisible(false)} />
      <AppHeader navbarVisible={navbarVisible} onShowNavbarClick={() => setNavbarVisible(true)} />
      <div className={classes.main}>{children}</div>
      <AppFooter />
    </>
  );
}
