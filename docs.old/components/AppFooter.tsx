import { createStyles, Group, Text } from '@mantine/core';
import {
  AUTHOR_LINK,
  FOOTER_BREAKPOINT,
  FOOTER_HEIGHT_ABOVE_BREAKPOINT,
  FOOTER_HEIGHT_BELOW_BREAKPOINT,
  LICENSE_LINK,
  NAVBAR_BREAKPOINT,
  NAVBAR_WIDTH,
  NPM_LINK,
  REPO_LINK,
  SPONSOR_LINK,
} from '~/config';
import ExternalLink from './ExternalLink';

const useStyles = createStyles((theme) => {
  const shadowGradientAlpha = theme.colorScheme === 'dark' ? 0.2 : 0.015;
  return {
    root: {
      position: 'fixed',
      zIndex: -1,
      left: 0,
      right: 0,
      bottom: 0,
      height: FOOTER_HEIGHT_BELOW_BREAKPOINT,
      background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
      padding: theme.spacing.sm,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing.xs,
      [`@media (min-width: ${theme.breakpoints[NAVBAR_BREAKPOINT]})`]: {
        marginLeft: NAVBAR_WIDTH,
        '&::before': {
          position: 'absolute',
          content: '""',
          top: 0,
          bottom: 0,
          left: 0,
          width: theme.spacing.sm,
          background: `linear-gradient(to right, ${theme.fn.rgba(theme.black, shadowGradientAlpha)}, ${theme.fn.rgba(
            theme.black,
            0
          )}), linear-gradient(to right, ${theme.fn.rgba(theme.black, shadowGradientAlpha)}, ${theme.fn.rgba(
            theme.black,
            0
          )} 30%)`,
        },
      },
      [`@media (min-width: ${FOOTER_BREAKPOINT}px)`]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: FOOTER_HEIGHT_ABOVE_BREAKPOINT,
      },
    },
  };
});

export default function AppFooter() {
  const {
    classes,
    theme: { colors },
  } = useStyles();
  const color = colors.blue[7].substring(1);
  const badgeParams = `?style=flat&color=${color}`;
  return (
    <div className={classes.root}>
      <Group spacing="xs">
        <ExternalLink to={LICENSE_LINK} rel="license">
          <img
            src={`https://img.shields.io/npm/l/mantine-datatable.svg${badgeParams}`}
            alt="MIT License"
            aria-label="MantineDataTable is released under MIT license"
          />
        </ExternalLink>
        <ExternalLink to={SPONSOR_LINK}>
          <img
            src={`https://img.shields.io/static/v1?label=github&message=sponsor&color=${color}`}
            alt="Sponsor the author"
          />
        </ExternalLink>{' '}
      </Group>
      <Text size="sm" align="center">
        Built by <ExternalLink to={AUTHOR_LINK}>Ionut-Cristian Florescu</ExternalLink> and{' '}
        <ExternalLink to={`${REPO_LINK}/graphs/contributors`}>these awesome people</ExternalLink>
        .
        <br />
        Please <ExternalLink to={SPONSOR_LINK}>sponsor the project</ExternalLink> if you find it useful.
      </Text>
      <Group spacing="xs">
        <ExternalLink to={REPO_LINK}>
          <img
            src={`https://img.shields.io/github/stars/icflorescu/mantine-datatable${badgeParams}`}
            alt="GitHub Stars"
            aria-label="Star Mantine DataTable on GitHub"
          />
        </ExternalLink>
        <ExternalLink to={NPM_LINK}>
          <img src={`https://img.shields.io/npm/dm/mantine-datatable.svg${badgeParams}`} alt="NPM Downloads" />
        </ExternalLink>
      </Group>
    </div>
  );
}
