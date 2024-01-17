'use client';

import { IconColumnRemove, IconColumns3 } from '@tabler/icons-react';
import { DataTable, useDataTableColumns } from '__PACKAGE__';
import { useContextMenu } from 'mantine-contextmenu';
import { companies } from '~/data';

export default function DraggingTogglingResetExample() {
  const { showContextMenu } = useContextMenu();

  const key = 'toggleable-reset-example';

  const { effectiveColumns, resetColumnsOrder, resetColumnsToggle } = useDataTableColumns({
    key,
    columns: [
      { accessor: 'name', width: '40%', toggleable: true, draggable: true },
      { accessor: 'streetAddress', width: '60%', toggleable: true, draggable: true },
      { accessor: 'city', width: 160, toggleable: true, draggable: true },
      { accessor: 'state', textAlign: 'right' },
    ],
  });

  return (
    <DataTable
      withTableBorder
      withColumnBorders
      storeColumnsKey={key}
      records={companies}
      columns={effectiveColumns}
      onRowContextMenu={({ event }) =>
        showContextMenu([
          {
            key: 'reset-toggled-columns',
            icon: <IconColumnRemove size={16} />,
            onClick: resetColumnsToggle,
          },
          {
            key: 'reset-columns-order',
            icon: <IconColumns3 size={16} />,
            onClick: resetColumnsOrder,
          },
        ])(event)
      }
    />
  );
}
