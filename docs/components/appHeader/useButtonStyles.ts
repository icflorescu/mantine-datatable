import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  button: {
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    paddingRight: theme.spacing.xs,
  },
  buttonIcon: {
    '&&': { marginRight: 8 },
  },
  buttonLabel: {
    marginBottom: -2,
  },
}));
