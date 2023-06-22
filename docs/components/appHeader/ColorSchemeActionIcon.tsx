import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import useActionIconStyles from './useActionIconStyles';

export default function ColorSchemeActionIcon() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const ColorSchemeIcon = colorScheme === 'dark' ? IconSun : IconMoon;
  const { classes } = useActionIconStyles();
  return (
    <ActionIcon
      aria-label="Toggle color scheme"
      className={classes.root}
      variant="outline"
      onClick={() => toggleColorScheme()}
    >
      <ColorSchemeIcon size={16} />
    </ActionIcon>
  );
}
