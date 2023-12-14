'use client';

import { Button, Group, Stack, Switch } from '@mantine/core';
import { DataTable, useDragToggleColumns } from '__PACKAGE__';
import { useState } from 'react';
import { companies, type Company } from '~/data';

export default function ResizingComplexExample() {
  const key = 'resize-complex-example';

  const [withTableBorder, setWithTableBorder] = useState<boolean>(true);

  const [withColumnBorders, setWithColumnBorders] = useState<boolean>(true);

  const props = {
    resizable: true,
    sortable: true,
    toggleable: true,
    draggable: true,
  };

  const { effectiveColumns, resetColumnsWidth, resetColumnsOrder, resetColumnsToggle } = useDragToggleColumns<Company>({
    key,
    columns: [
      { accessor: 'name', ...props },
      { accessor: 'streetAddress', ...props },
      { accessor: 'city', ...props },
      { accessor: 'state', textAlign: 'right', ...props },
    ],
  });

  return (
    <Stack>
      <DataTable
        withTableBorder={withTableBorder}
        withColumnBorders={withColumnBorders}
        storeColumnsKey={key}
        records={companies}
        columns={effectiveColumns}
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
