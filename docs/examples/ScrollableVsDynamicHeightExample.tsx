import { Box } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import employees from '~/data/employees.json';

const records = employees.slice(0, 20);

export default function ScrollableVsDynamicHeightExample({ restrictHeight }: { restrictHeight: boolean }) {
  return (
    <Box sx={restrictHeight ? { height: 300 } : undefined}>
      <DataTable
        striped
        withVerticalBorders
        records={records}
        columns={[{ accessor: 'firstName' }, { accessor: 'lastName' }, { accessor: 'email' }]}
      />
    </Box>
  );
}
