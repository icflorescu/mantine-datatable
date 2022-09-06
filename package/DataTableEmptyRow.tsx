import { createStyles } from '@mantine/core';

const useStyles = createStyles({
  root: {
    '&&': {
      background: 'transparent',
    },
  },
});

export default function DataTableEmptyRow() {
  const { classes } = useStyles();
  return (
    <tr className={classes.root}>
      <td></td>
    </tr>
  );
}
