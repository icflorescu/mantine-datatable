'use client';

import { IconColumnRemove, IconColumns3 } from '@tabler/icons-react';
import { DataTable, useDataTableColumns, type DataTableSortStatus } from '__PACKAGE__';
import sortBy from 'lodash/sortBy';
import { useContextMenu } from 'mantine-contextmenu';
import { useEffect, useState } from 'react';
import { companies, type Company } from '~/data';

export default function DraggingTogglingComplexExample() {
  const { showContextMenu } = useContextMenu();

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Company>>({
    columnAccessor: 'name',
    direction: 'asc',
  });

  const [records, setRecords] = useState(sortBy(companies, 'name'));

  useEffect(() => {
    const data = sortBy(companies, sortStatus.columnAccessor) as Company[];
    setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [sortStatus]);

  const key = 'toggleable-reset-example';

  const { effectiveColumns, resetColumnsOrder, resetColumnsToggle } = useDataTableColumns({
    key,
    columns: [
      { accessor: 'name', width: '40%', toggleable: true, draggable: true, sortable: true },
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
      records={records}
      columns={effectiveColumns}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
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
