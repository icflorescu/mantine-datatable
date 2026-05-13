'use client';

import { DataTable, type DataTableSortStatus, useDataTableColumns } from '__PACKAGE__';
import { Button, Group, Stack, Switch } from '@mantine/core';
import { sortBy } from 'lodash';
import { useEffect, useState } from 'react';
import { type Company, companies } from '~/data';

export default function ResizingComplexExample() {
  const key = 'resize-complex-example';

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Company>>({
    columnAccessor: 'name',
    direction: 'asc',
  });
  const [records, setRecords] = useState(sortBy(companies, 'name'));
  const [selectedRecords, setSelectedRecords] = useState<Company[]>([]);

  useEffect(() => {
    const data = sortBy(companies, sortStatus.columnAccessor);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [sortStatus]);

  const [withTableBorder, setWithTableBorder] = useState(true);
  const [withColumnBorders, setWithColumnBorders] = useState(true);

  const props = {
    resizable: true,
    sortable: true,
    toggleable: true,
    draggable: true,
  };

  const { effectiveColumns, resetColumnsWidth, resetColumnsOrder, resetColumnsToggle } = useDataTableColumns<Company>({
    key,
    columns: [
      { accessor: 'name', ellipsis: true, ...props },
      { accessor: 'streetAddress', ellipsis: true, ...props },
      { accessor: 'city', ellipsis: true, ...props },
      { accessor: 'state', textAlign: 'right', ...props },
    ],
  });

  return (
    <Stack>
      <DataTable
        withTableBorder={withTableBorder}
        withColumnBorders={withColumnBorders}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        storeColumnsKey={key}
        records={records}
        columns={effectiveColumns}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
      />
      <Group grow justify="space-between">
        <Group justify="flex-start">
          <Switch
            checked={withTableBorder}
            onChange={(event) => setWithTableBorder(event.currentTarget.checked)}
            labelPosition="left"
            label="Table Border"
          />
          <Switch
            checked={withColumnBorders}
            onChange={(event) => setWithColumnBorders(event.currentTarget.checked)}
            labelPosition="left"
            label="Column Borders"
          />
        </Group>
        <Group justify="right">
          <Button size="compact-xs" onClick={resetColumnsWidth}>
            Reset Column Width
          </Button>
          <Button size="compact-xs" onClick={resetColumnsOrder}>
            Reset Column Order
          </Button>
          <Button size="compact-xs" onClick={resetColumnsToggle}>
            Reset Column Toggle
          </Button>
        </Group>
      </Group>
    </Stack>
  );
}
