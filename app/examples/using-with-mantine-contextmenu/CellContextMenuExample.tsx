'use client';

import { useMediaQuery } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { DataTable } from '__PACKAGE__';
import { useContextMenu } from 'mantine-contextmenu';
import companies from '~/data/companies.json';

export function CellContextMenuExample() {
  // example-start
  const { showContextMenu } = useContextMenu();
  const isTouch = useMediaQuery('(pointer: coarse)');

  return (
    <DataTable
      withTableBorder
      withColumnBorders
      textSelectionDisabled={isTouch} // 👈 disable text selection on touch devices
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      onCellContextMenu={({ record, column, event }) => {
        if (column.accessor === 'name') {
          return showContextMenu([
            // example-skip context menu items
            {
              key: 'view-company-details',
              icon: <IconEye size={16} />,
              onClick: () =>
                showNotification({
                  message: `Clicked on view context-menu action for ${record.name} company`,
                  withBorder: true,
                }),
            },
            {
              key: 'edit-company-information',
              icon: <IconEdit size={16} />,
              onClick: () =>
                showNotification({
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
                showNotification({
                  color: 'red',
                  message: `Clicked on delete context-menu action for ${record.name} company`,
                  withBorder: true,
                }),
            },
            // example-resume
          ])(event);
        }
      }}
    />
  );
  // example-end
}
