'use client';

import { useMediaQuery } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { DataTable } from '__PACKAGE__';
import { useContextMenu } from 'mantine-contextmenu';
import employees from '~/data/employees.json';

export function RowContextMenuOnScrollableTableExample() {
  // example-start
  const { showContextMenu, hideContextMenu } = useContextMenu();
  const isTouch = useMediaQuery('(pointer: coarse)');

  return (
    <DataTable
      height={300}
      withTableBorder
      withColumnBorders
      textSelectionDisabled={isTouch} // 👈 disable text selection on touch devices
      columns={[{ accessor: 'firstName' }, { accessor: 'lastName' }, { accessor: 'email' }]}
      records={employees}
      onRowContextMenu={({ record, event }) =>
        showContextMenu([
          // example-skip context menu items
          {
            key: 'view-employee-details',
            icon: <IconEye size={16} />,
            onClick: () =>
              showNotification({
                message: `Clicked on view context-menu action for ${record.firstName} ${record.lastName}`,
                withBorder: true,
              }),
          },
          {
            key: 'edit-employee-information',
            icon: <IconEdit size={16} />,
            onClick: () =>
              showNotification({
                message: `Clicked on edit context-menu action for ${record.firstName} ${record.lastName}`,
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
                message: `Clicked on delete context-menu action for ${record.firstName} ${record.lastName}`,
                withBorder: true,
              }),
          },
          // example-resume
        ])(event)
      }
      // 👇 make sure the context-menu is closed when the user scrolls the table
      onScroll={hideContextMenu}
    />
  );
  // example-end
}
