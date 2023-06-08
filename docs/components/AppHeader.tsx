import {
  ActionIcon,
  Button,
  createStyles,
  Group,
  px,
  SegmentedControl,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconBrandNpm, IconHeartFilled, IconMenu2, IconMoon, IconSun } from '@tabler/icons-react';
import { HEADER_HEIGHT, NAVBAR_BREAKPOINT, NAVBAR_WIDTH, NPM_LINK, REPO_LINK, SPONSOR_LINK } from '~/config';
import AppHeaderColorSchemeLabel from './AppHeaderColorSchemeLabel';
import GitHubIcon from './GitHubIcon';
import Logo from './Logo';
import { NpmDownloads } from './NpmDownloads';

const REPO_LINK_ARIA_LABEL = 'View Mantine DataTable source code on GitHub';
const SPONSORS_LINK_ARIA_LABEL = 'Sponsor Mantine DataTable project on GitHub Sponsors';

const useStyles = createStyles((theme) => {
  const breakpointMediaQuery = `@media (min-width: ${theme.breakpoints[NAVBAR_BREAKPOINT]})`;
  const buttonBorder = `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`;
  const actionIconColor = theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[7];
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
      color: theme.fn[theme.colorScheme === 'dark' ? 'lighten' : 'darken'](actionIconColor, 0.75),
      [breakpointMediaQuery]: {
        display: 'none',
      },
    },
    logo: {
      [breakpointMediaQuery]: {
        display: 'none',
      },
    },
    actionIcons: {
      [breakpointMediaQuery]: {
        display: 'none',
      },
    },
    actionIcon: {
      border: `1px solid ${theme.fn[theme.colorScheme === 'dark' ? 'darken' : 'lighten'](actionIconColor, 0.25)}`,
      color: actionIconColor,
    },
    actionIconRed: {
      color: theme.colors.red[theme.colorScheme === 'dark' ? 8 : 6],
    },
    buttons: {
      display: 'none',
      [breakpointMediaQuery]: {
        display: 'inherit',
      },
    },
    button: {
      border: buttonBorder,
      paddingRight: theme.spacing.xs,
      minWidth: 120,
    },
    buttonIcon: {
      '&&': { marginRight: 8 },
    },
    buttonIconRed: {
      color: theme.colors.red[theme.colorScheme === 'dark' ? 8 : 6],
    },
    buttonLabel: {
      marginBottom: -2,
    },
    colorSchemeSegmentedControlContainer: {
      display: 'none',
      [breakpointMediaQuery]: {
        display: 'inherit',
      },
    },
    colorSchemeSegmentedControl: {
      border: buttonBorder,
    },
  };
});

export default function AppHeader({ onShowNavbarClick }: { onShowNavbarClick: () => void }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const ColorSchemeIcon = colorScheme === 'dark' ? IconSun : IconMoon;
  const [{ y: windowScrollY }] = useWindowScroll();

  const { classes, cx } = useStyles();

  return (
    <Group className={cx(classes.root, { [classes.windowScrolledOnY]: windowScrollY !== 0 })} px="sm" spacing={0}>
      <Group spacing="xs">
        <IconMenu2 className={classes.menuIcon} strokeWidth={1} onClick={onShowNavbarClick} />
        <Group spacing="xs" className={classes.buttons}>
          <Button
            classNames={{
              root: classes.button,
              icon: classes.buttonIcon,
              label: classes.buttonLabel,
            }}
            size="xs"
            variant="default"
            leftIcon={<GitHubIcon size={16} />}
            component="a"
            href={REPO_LINK}
            target="_blank"
            aria-label={REPO_LINK_ARIA_LABEL}
          >
            Source code
          </Button>
          <Button
            classNames={{
              root: classes.button,
              icon: cx(classes.buttonIcon, classes.buttonIconRed),
              label: classes.buttonLabel,
            }}
            size="xs"
            variant="default"
            leftIcon={<IconHeartFilled size={16} />}
            component="a"
            href={SPONSOR_LINK}
            target="_blank"
            aria-label={SPONSORS_LINK_ARIA_LABEL}
          >
            Sponsor
          </Button>
          <Button
            classNames={{
              root: classes.button,
              icon: cx(classes.buttonIcon),
              label: classes.buttonLabel,
            }}
            size="xs"
            variant="default"
            leftIcon={<IconBrandNpm size={16} />}
            component="a"
            href={NPM_LINK}
            target="_blank"
            aria-label="View Mantine DataTable on npm"
          >
            <NpmDownloads />
          </Button>
        </Group>
        <Logo className={classes.logo} insideHeader />
      </Group>
      <Group className={classes.actionIcons} spacing="xs">
        <ActionIcon
          className={classes.actionIcon}
          variant="outline"
          component="a"
          href={REPO_LINK}
          target="_blank"
          aria-label={REPO_LINK_ARIA_LABEL}
        >
          <GitHubIcon size={16} />
        </ActionIcon>
        <ActionIcon
          className={cx(classes.actionIcon, classes.actionIconRed)}
          variant="outline"
          component="a"
          href={SPONSOR_LINK}
          target="_blank"
          aria-label={SPONSORS_LINK_ARIA_LABEL}
        >
          <IconHeartFilled size={16} />
        </ActionIcon>
        <ActionIcon
          aria-label="Toggle color scheme"
          className={classes.actionIcon}
          variant="outline"
          onClick={() => toggleColorScheme()}
        >
          <ColorSchemeIcon size={16} />
        </ActionIcon>
      </Group>
      <Group className={classes.colorSchemeSegmentedControlContainer} spacing="xs">
        <Text size="xs" weight={500}>
          Switch theme
        </Text>
        <SegmentedControl
          size="xs"
          className={classes.colorSchemeSegmentedControl}
          value={colorScheme}
          onChange={() => toggleColorScheme()}
          data={[
            { value: 'light', label: <AppHeaderColorSchemeLabel value="Light" /> },
            { value: 'dark', label: <AppHeaderColorSchemeLabel value="Dark" /> },
          ]}
        />
      </Group>
    </Group>
  );
}
