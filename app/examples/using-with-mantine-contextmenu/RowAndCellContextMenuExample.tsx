'use client';

import { useMediaQuery } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconEdit, IconEye, IconMessage, IconTrash } from '@tabler/icons-react';
import { DataTable } from '__PACKAGE__';
import { useContextMenu } from 'mantine-contextmenu';
import companies from '~/data/companies.json';

export function RowAndCellContextMenuExample() {
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
      onRowContextMenu={({ record, event }) =>
        showContextMenu([
          // example-skip row context menu items
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
        ])(event)
      }
      onCellContextMenu={({ record, column, event }) => {
        if (column.accessor === 'name') {
          return showContextMenu([
            // example-skip 'name' cell context menu items
            {
              key: 'edit-company-name',
              icon: <IconEdit size={16} />,
              onClick: () =>
                showNotification({
                  message: `Clicked on edit context-menu action for ${record.name} company`,
                  withBorder: true,
                }),
            },
            { key: 'divider' },
            {
              key: 'send-an-email-to-company',
              icon: <IconMessage size={16} />,
              onClick: () =>
                showNotification({
                  color: 'orange',
                  message: `Clicked on email context-menu action for ${record.name} company`,
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
