import { Box } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import employees from '~/data/employees.json';

const records = employees.slice(0, 20);

export default function ScrollableExample() {
  return (
    <Box sx={{ height: 300 }}>
      <DataTable
        striped
        withVerticalBorders
        records={records}
        columns={[{ accessor: 'firstName' }, { accessor: 'lastName' }, { accessor: 'email' }]}
      />
    </Box>
  );
}
