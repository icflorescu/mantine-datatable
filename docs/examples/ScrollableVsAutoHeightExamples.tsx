import { Box } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import employees from '~/data/employees.json';

const records = employees.slice(0, 15);

export function ScrollableExample() {
  // example-start scrollable
  return (
    <Box sx={{ height: 300 }}>
      <DataTable
        // example-skip
        withBorder
        withColumnBorders
        striped
        records={records}
        columns={[{ accessor: 'firstName' }, { accessor: 'lastName' }, { accessor: 'email' }]}
        // example-resume
      />
    </Box>
    // example-end
  );
}

export function AutoHeightExample() {
  // example-start auto-height
  return (
    <DataTable
      // example-skip
      withBorder
      withColumnBorders
      striped
      records={records}
      columns={[{ accessor: 'firstName' }, { accessor: 'lastName' }, { accessor: 'email' }]}
      // example-resume
    />
  );
  // example-end
}
