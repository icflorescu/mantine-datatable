import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    height: 1,
    background: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
  },
}));

export default function DataTableRowMenuDivider() {
  const { classes } = useStyles();
  return <div className={classes.root} />;
}
