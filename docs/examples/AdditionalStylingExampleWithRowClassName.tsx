import { createStyles } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import companies from '~/data/companies.json';

const records = companies.slice(0, 5);

// example-start
const useStyles = createStyles({
  boldRow: { fontWeight: 'bold' },
});

export default function AdditionalStylingExampleWithRowClassName() {
  const { classes } = useStyles();
  return (
    <DataTable
      withBorder
      rowClassName={({ name }) => (name === 'Hettinger, Willms and Connelly' ? classes.boldRow : undefined)}
      rowStyle={({ name }) => (name === 'Champlin - Spencer' ? { color: 'red' } : undefined)}
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
