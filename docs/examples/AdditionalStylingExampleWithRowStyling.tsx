import { createStyles } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import companies from '~/data/companies.json';

const records = companies.slice(0, 5);

// example-start
const useStyles = createStyles((theme) => ({
  blueishRow: { color: theme.colors.blue[6] },
}));

export default function AdditionalStylingExampleWithRowStyling() {
  const { classes } = useStyles();
  return (
    <DataTable
      withBorder
      rowClassName={({ name }) => (name === 'Runolfsdottir - Cummerata' ? classes.blueishRow : undefined)}
      rowStyle={({ name }) => (name === 'Johnston LLC' ? { color: '#FA5639' } : undefined)}
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
