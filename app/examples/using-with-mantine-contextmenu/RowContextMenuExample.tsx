'use client';

import { notifications } from '@mantine/notifications';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { DataTable } from '__PACKAGE__';
import { useContextMenu } from 'mantine-contextmenu';
import companies from '~/data/companies.json';

export function RowContextMenuExample() {
  const { showContextMenu } = useContextMenu();

  return (
    <DataTable
      withTableBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      onRowContextMenu={({ record, event }) =>
        showContextMenu([
          {
            key: 'view-company-details',
            icon: <IconEye size={16} />,
            onClick: () =>
              notifications.show({
                message: `Clicked on view context-menu action for ${record.name} company`,
                withBorder: true,
              }),
          },
          {
            key: 'edit-company-information',
            icon: <IconEdit size={16} />,
            onClick: () =>
              notifications.show({
                message: `Clicked on edit context-menu action for ${record.name} company`,
                withBorder: true,
              }),
          },
          { key: 'divider' },
          {
            key: 'delete-company',
            icon: <IconTrash size={16} />,
            color: 'red',
            onClick: () =>
              notifications.show({
                color: 'red',
                message: `Clicked on delete context-menu action for ${record.name} company`,
                withBorder: true,
              }),
          },
        ])(event)
      }
    />
  );
}
