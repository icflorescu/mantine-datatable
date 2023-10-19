import { Box, createStyles, Navbar, ScrollArea } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { HEADER_HEIGHT, NAVBAR_BREAKPOINT, NAVBAR_WIDTH, PAGES } from '~/config';
import AppNavbarButton from './AppNavbarButton';
import AppNavbarLink from './AppNavbarLink';
import AppNavbarLinkList from './AppNavbarLinkList';
import Logo from './Logo';

const useStyles = createStyles((theme) => {
  const breakpointMediaQuery = `@media (min-width: ${theme.breakpoints[NAVBAR_BREAKPOINT]})`;

  return {
    backdrop: {
      position: 'fixed',
      zIndex: 11,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: theme.fn.rgba(theme.black, theme.colorScheme === 'dark' ? 0.5 : 0.25),
      pointerEvents: 'none',
      opacity: 0,
      transition: 'opacity .15s ease',
    },
    backdropVisible: {
      opacity: 1,
      pointerEvents: 'all',
      [breakpointMediaQuery]: {
        opacity: 0,
        pointerEvents: 'none',
      },
    },
    root: {
      position: 'fixed',
      width: NAVBAR_WIDTH,
      maxWidth: '100%',
      top: 0,
      left: 0,
      height: '100vh',
      maxHeight: '100%',
      transform: 'translate3d(-100%, 0, 0)',
      transition: 'transform .15s ease',
      [breakpointMediaQuery]: {
        transform: 'none',
      },
    },
    rootVisible: {
      transform: 'none',
      boxShadow: theme.shadows.xs,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: HEADER_HEIGHT,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    },
    closeIcon: {
      color: theme.colors.gray[6],
      [breakpointMediaQuery]: {
        display: 'none',
      },
    },
  };
});

export default function AppNavbar({ visible, onHideClick }: { visible: boolean; onHideClick: () => void }) {
  const { classes, cx } = useStyles();

  return (
    <>
      <div className={cx(classes.backdrop, { [classes.backdropVisible]: visible })} onClick={onHideClick} />
      <Navbar className={cx(classes.root, { [classes.rootVisible]: visible })} onClick={onHideClick}>
        <Box className={classes.header} px="sm">
          <Logo />
          <IconX className={classes.closeIcon} strokeWidth={1} role="button" />
        </Box>
        <Navbar.Section grow component={ScrollArea}>
          <Box my="xs">
            {PAGES.map(({ icon, title, description, color, path, external, items }) => {
              if (external) {
                return (
                  <AppNavbarButton
                    key={path}
                    icon={icon!}
                    title={title}
                    description={description}
                    color={color}
                    href={path}
                    externalLink
                  />
                );
              }
              const to = `/${path || ''}`;
              return items ? (
                <AppNavbarLinkList
                  key={to}
                  title={title}
                  color={color}
                  items={items.map(({ title: itemTitle, description: itemDescription, path: itemPath }) => ({
                    title: itemTitle,
                    description: itemDescription,
                    to: `${to}/${itemPath}`,
                  }))}
                />
              ) : (
                <AppNavbarLink key={to} icon={icon} title={title} description={description} color={color} to={to} />
              );
            })}
          </Box>
        </Navbar.Section>
      </Navbar>
    </>
  );
}
