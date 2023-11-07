'use client';
// 👆 Since 'useContextMenu' is a hook, don't forget to add the 'use client' directive
//    at the top of your file if you're using it in a RSC context

import { useMediaQuery } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { DataTable } from '__PACKAGE__';
import { useContextMenu } from 'mantine-contextmenu';
import companies from '~/data/companies.json';

export function RowContextMenuExample() {
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
        ])(event)
      }
    />
  );
}
