import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import classes from './ColorSchemeActionIcon.module.css';

export function ColorSchemeActionIcon() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size={30}
      aria-label="Toggle color scheme"
    >
      <IconSun className={classes.light} size={16} />
      <IconMoon className={classes.dark} size={16} />
    </ActionIcon>
  );
}
