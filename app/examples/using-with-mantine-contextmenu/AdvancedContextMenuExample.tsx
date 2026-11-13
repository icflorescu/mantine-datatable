'use client';

import { DataTable } from '__PACKAGE__';
import { useMediaQuery } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconDownload, IconEye, IconFileTypeCsv, IconFileTypePdf, IconJson, IconTrash } from '@tabler/icons-react';
import { useContextMenu } from 'mantine-contextmenu';
import { useState } from 'react';
import type { Company } from '~/data';
import { companies } from '~/data';

const records = companies.slice(0, 8);

export function AdvancedContextMenuExample() {
  // example-start
  const { showContextMenu } = useContextMenu();
  const isTouch = useMediaQuery('(pointer: coarse)');
  const [selectedRecords, setSelectedRecords] = useState<Company[]>([]);

  return (
    <DataTable
      withTableBorder
      withColumnBorders
      textSelectionDisabled={isTouch} // 👈 disable text selection on touch devices
      columns={[{ accessor: 'name' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={records}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      onRowContextMenu={({ record, event }) =>
        showContextMenu([
          {
            key: 'view',
            icon: <IconEye size={16} />,
            title: `View ${record.name} details`, // 👈 custom title instead of the humanized key
            onClick: () =>
              showNotification({
                message: `Clicked on view context-menu action for ${record.name} company`,
                withBorder: true,
              }),
          },
          {
            key: 'export',
            icon: <IconDownload size={16} />,
            // 👇 providing `items` instead of `onClick` renders a submenu
            items: [
              { key: 'csv', title: 'CSV', icon: <IconFileTypeCsv size={16} /> },
              { key: 'json', title: 'JSON', icon: <IconJson size={16} /> },
              { key: 'pdf', title: 'PDF', icon: <IconFileTypePdf size={16} /> },
            ].map(({ key, title, icon }) => ({
              key,
              title,
              icon,
              onClick: () =>
                showNotification({
                  message: `Clicked on export as ${title} context-menu action for ${record.name} company`,
                  withBorder: true,
                }),
            })),
          },
          { key: 'divider' },
          {
            key: 'delete-selected',
            icon: <IconTrash size={16} />,
            color: 'red',
            title: selectedRecords.length
              ? `Delete ${selectedRecords.length} selected ${selectedRecords.length === 1 ? 'company' : 'companies'}`
              : 'Delete selected companies',
            disabled: selectedRecords.length === 0, // 👈 disable the item when no records are selected
            onClick: () =>
              showNotification({
                color: 'red',
                message: `Clicked on delete context-menu action for ${selectedRecords.length} selected ${selectedRecords.length === 1 ? 'company' : 'companies'}`,
                withBorder: true,
              }),
          },
        ])(event)
      }
    />
  );
  // example-end
}
