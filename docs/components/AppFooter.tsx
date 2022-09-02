import { Center, createStyles, Text } from '@mantine/core';
import { FOOTER_HEIGHT, NAVBAR_BREAKPOINT, NAVBAR_WIDTH } from '~/config';
import ExternalLink from './ExternalLink';

const useStyles = createStyles((theme) => {
  return {
    root: {
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

export default function AppFooter() {
  const { classes } = useStyles();
  return (
    <Center className={classes.root}>
      <Text size="sm">
        Built by <ExternalLink to="https://github.com/icflorescu">Ionut-Cristian Florescu</ExternalLink>.
      </Text>
    </Center>
  );
}
