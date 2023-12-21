'use client';

import { Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconAppWindow, IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { DataTable } from '__PACKAGE__';
import { useContextMenu } from 'mantine-contextmenu';
import companies from '~/data/companies.json';

export function RowContextMenuInsideModalExample() {
  // example-start
  const { showContextMenu } = useContextMenu();
  const isTouch = useMediaQuery('(pointer: coarse)');

  return (
    <Button
      leftSection={<IconAppWindow size={16} />}
      onClick={() =>
        modals.open({
          centered: true,
          title: 'Right-click on a row',
          children: (
            <DataTable
              borderRadius="sm"
              height={260}
              withTableBorder
              withColumnBorders
              textSelectionDisabled={isTouch} // 👈 disable text selection on touch devices
              columns={[{ accessor: 'name' }, { accessor: 'city' }, { accessor: 'state', textAlign: 'right' }]}
              records={companies}
              onRowContextMenu={({ record, event }) =>
                showContextMenu([
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
                ])(event)
              }
            />
          ),
        })
      }
    >
      Open modal
    </Button>
  );
  // example-end
}
