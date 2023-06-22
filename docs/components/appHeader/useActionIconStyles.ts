import { createStyles } from '@mantine/core';

export default createStyles((theme) => {
  const actionIconColor = theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[7];
  return {
    root: {
      border: `1px solid ${theme.fn[theme.colorScheme === 'dark' ? 'darken' : 'lighten'](actionIconColor, 0.25)}`,
      color: actionIconColor,
    },
    red: {
      color: theme.colors.red[theme.colorScheme === 'dark' ? 8 : 6],
    },
  };
});
