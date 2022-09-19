import { Box } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { companies } from '~/data';

export default function ExpandingRowsExample() {
  return (
    <DataTable
      records={companies}
      columns={[{ accessor: 'name' }, { accessor: 'cityAndState', render: ({ city, state }) => `${city}, ${state}` }]}
      expandedRow={{
        item: ({ name, city, state, streetAddress }) => <Box>{streetAddress}</Box>,
      }}
    />
  );
}
