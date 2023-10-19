import { createStyles } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import companies from '~/data/companies.json';

const records = companies.slice(0, 5);

// example-start
const useStyles = createStyles((theme) => ({
  table: {
    border: `1px dashed ${theme.colors.red[6]}`,
    borderRadius: theme.radius.md,
  },
}));

export default function AdditionalStylingExampleWithClassName() {
  const { classes } = useStyles();
  return (
    <DataTable
      className={classes.table}
      // example-skip
      columns={[
        { accessor: 'name' },
        { accessor: 'missionStatement', width: 150 },
        { accessor: 'streetAddress' },
        { accessor: 'city' },
        { accessor: 'state' },
      ]}
      records={records}
      // example-resume
    />
  );
}
// example-end
