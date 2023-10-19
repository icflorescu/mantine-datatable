import { createStyles, Group, px } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconMenu2 } from '@tabler/icons-react';
import { HEADER_HEIGHT, NAVBAR_BREAKPOINT, NAVBAR_WIDTH } from '~/config';
import ColorSchemeActionIcon from './appHeader/ColorSchemeActionIcon';
import ColorSchemeControl from './appHeader/ColorSchemeControl';
import NpmLinkButton from './appHeader/NpmLinkButton';
import SearchButton from './appHeader/SearchButton';
import SourceLinkActionIcon from './appHeader/SourceLinkActionIcon';
import SourceLinkButton from './appHeader/SourceLinkButton';
import SponsorsLinkActionIcon from './appHeader/SponsorsLinkActionIcon';
import SponsorsLinkButton from './appHeader/SponsorsLinkButton';
import Logo from './Logo';

const useStyles = createStyles((theme) => {
  const breakpointMediaQuery = `@media (min-width: ${theme.breakpoints[NAVBAR_BREAKPOINT]})`;
  const shadowGradientAlpha = theme.colorScheme === 'dark' ? 0.3 : 0.03;

  return {
    root: {
      position: 'fixed',
      zIndex: 10,
      top: 0,
      left: 0,
      right: 0,
      height: HEADER_HEIGHT,
      background: theme.fn.gradient({
        deg: 180,
        ...(theme.colorScheme === 'dark'
          ? {
              from: theme.fn.rgba(theme.colors.dark[7], 0.95),
              to: theme.fn.rgba(theme.colors.dark[7], 0.75),
            }
          : {
              from: theme.fn.rgba(theme.white, 0.95),
              to: theme.fn.rgba(theme.white, 0.75),
            }),
      }),
      backdropFilter: 'blur(2px)',
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
      justifyContent: 'space-between',
      [breakpointMediaQuery]: {
        marginLeft: NAVBAR_WIDTH,
      },
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
        opacity: 0,
        transition: 'opacity .15s ease',
      },
    },
    windowScrolledOnY: {
      '&::after': {
        opacity: 1,
      },
    },
    menuIcon: {
      color: theme.fn[theme.colorScheme === 'dark' ? 'lighten' : 'darken'](
        theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[7],
        0.75
      ),
      [breakpointMediaQuery]: {
        display: 'none',
      },
    },
    logo: {
      [breakpointMediaQuery]: {
        display: 'none',
      },
    },
    buttons: {
      display: 'none',
      [breakpointMediaQuery]: {
        display: 'inherit',
      },
    },
    actionIcons: {
      [breakpointMediaQuery]: {
        display: 'none',
      },
    },
  };
});

export default function AppHeader({ onShowNavbarClick }: { onShowNavbarClick: () => void }) {
  const [{ y: windowScrollY }] = useWindowScroll();

  const { classes, cx } = useStyles();

  return (
    <Group className={cx(classes.root, { [classes.windowScrolledOnY]: windowScrollY !== 0 })} px="sm" spacing={0}>
      <Group spacing="xs">
        <IconMenu2 className={classes.menuIcon} strokeWidth={1} onClick={onShowNavbarClick} role="button" />
        <Group spacing="xs" className={classes.buttons}>
          <SourceLinkButton />
          <SponsorsLinkButton />
          <NpmLinkButton />
        </Group>
        <Logo className={classes.logo} insideHeader />
      </Group>
      <Group spacing="xs">
        <SearchButton />
        <Group className={classes.actionIcons} spacing="xs">
          <SourceLinkActionIcon />
          <SponsorsLinkActionIcon />
          <ColorSchemeActionIcon />
        </Group>
        <ColorSchemeControl />
      </Group>
    </Group>
  );
}
