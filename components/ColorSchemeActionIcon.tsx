import { ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core';
import { useHotkeys, useOs } from '@mantine/hooks';
import { IconMoon, IconSun } from '@tabler/icons-react';
import classes from './ColorSchemeActionIcon.module.css';

export function ColorSchemeActionIcon() {
  const { toggleColorScheme } = useMantineColorScheme();
  useHotkeys([['mod+j', toggleColorScheme]]);

  const os = useOs();
  let label = 'Toggle color scheme';
  if (os === 'macos') {
    label += ' (⌘J)';
  } else if (os === 'windows' || os === 'linux') {
    label += ' (Ctrl+J)';
  }

  return (
    <Tooltip label={label} position="bottom-end" withArrow>
      <ActionIcon onClick={() => toggleColorScheme()} variant="default" size={30} aria-label={label}>
        <IconSun className={classes.light} size={16} />
        <IconMoon className={classes.dark} size={16} />
      </ActionIcon>
    </Tooltip>
  );
}
