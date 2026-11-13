'use client';

import { DataTable } from '__PACKAGE__';
import { showNotification } from '@mantine/notifications';
import { companies } from '~/data';

const records = companies.slice(0, 5);

export function HandlingRowContextMenuExample() {
  return (
    // example-start
    <DataTable
      textSelectionDisabled
      withTableBorder
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={records}
      onRowContextMenu={({ record, index, event }) => {
        event.preventDefault(); // 👈 prevent the browser’s own context menu from showing up
        showNotification({
          withBorder: true,
          title: 'Row right-clicked',
          message: `You right-clicked on row[${index}], referring to company ${record.name}`,
        });
      }}
    />
    // example-end
  );
}
