import { Center, createStyles, Global, Text } from '@mantine/core';
import { ReactNode, useState } from 'react';
import { FOOTER_HEIGHT, HEADER_HEIGHT, NAVBAR_BREAKPOINT, NAVBAR_WIDTH } from '~/config';
import AppHeader from './AppHeader';
import AppNavbar from './AppNavbar';
import ExternalLink from './ExternalLink';

const useStyles = createStyles((theme) => {
  const shadowGradientAlpha = theme.colorScheme === 'dark' ? 0.25 : 0.05;
  return {
    main: {
      position: 'relative',
      background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.fn.lighten(theme.colors.gray[0], 0.9),
      marginTop: HEADER_HEIGHT,
      marginBottom: FOOTER_HEIGHT,
      minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
      padding: `${theme.spacing.lg}px 0`,
      '&::after': {
        position: 'absolute',
        content: '""',
        left: 0,
        right: 0,
        height: theme.spacing.sm / 2,
        bottom: -(theme.spacing.sm / 2),
        background: `linear-gradient(${theme.fn.rgba(theme.black, shadowGradientAlpha)}, ${theme.fn.rgba(
          theme.black,
          0
        )}), linear-gradient(${theme.fn.rgba(theme.black, shadowGradientAlpha)}, ${theme.fn.rgba(theme.black, 0)} 30%)`,
      },
      [`@media (min-width: ${theme.breakpoints[NAVBAR_BREAKPOINT]}px)`]: {
        marginLeft: NAVBAR_WIDTH,
      },
    },
    footer: {
      position: 'fixed',
      zIndex: -1,
      left: 0,
      right: 0,
      bottom: 0,
      height: FOOTER_HEIGHT,
      background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
      [`@media (min-width: ${theme.breakpoints[NAVBAR_BREAKPOINT]}px)`]: {
        marginLeft: NAVBAR_WIDTH,
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
      <Center className={classes.footer}>
        <Text size="sm">
          Built by <ExternalLink to="https://github.com/icflorescu">Ionut-Cristian Florescu</ExternalLink>.
        </Text>
      </Center>
    </>
  );
}
