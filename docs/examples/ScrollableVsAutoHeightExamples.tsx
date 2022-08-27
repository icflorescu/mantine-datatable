import { Box } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import employees from '~/data/employees.json';

const records = employees.slice(0, 15);

export function ScrollableExample() {
  return (
    // example-start scrollable
    <Box sx={{ height: 300 }}>
      <DataTable
        striped
        withVerticalBorders
        records={records}
        columns={[{ accessor: 'firstName' }, { accessor: 'lastName' }, { accessor: 'email' }]}
      />
    </Box>
  );
  // example-end
}

export function AutoHeightExample() {
  // example-start auto-height
  return (
    <DataTable
      striped
      withVerticalBorders
      records={records}
      columns={[{ accessor: 'firstName' }, { accessor: 'lastName' }, { accessor: 'email' }]}
    />
  );
  // example-end
}
