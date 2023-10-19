import { Group, SegmentedControl, Text, createStyles, useMantineColorScheme } from '@mantine/core';
import { NAVBAR_BREAKPOINT } from '~/config';
import ColorSchemeLabel from './ColorSchemeLabel';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'none',
    [`@media (min-width: ${theme.breakpoints[NAVBAR_BREAKPOINT]})`]: {
      display: 'inherit',
    },
  },
  segmentedControl: {
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },
}));

export default function ColorSchemeControl() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles();
  return (
    <Group className={classes.root} spacing="xs">
      <Text size="xs" weight={500}>
        Theme
      </Text>
      <SegmentedControl
        size="xs"
        className={classes.segmentedControl}
        value={colorScheme}
        onChange={() => toggleColorScheme()}
        data={[
          { value: 'light', label: <ColorSchemeLabel value="Light" /> },
          { value: 'dark', label: <ColorSchemeLabel value="Dark" /> },
        ]}
      />
    </Group>
  );
}
