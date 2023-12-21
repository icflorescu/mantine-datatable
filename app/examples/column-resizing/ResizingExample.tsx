'use client';

import { Button, Group, Stack, Switch } from '@mantine/core';
import { DataTable, useDataTableColumns } from '__PACKAGE__';
import { useState } from 'react';
import { companies, type Company } from '~/data';

export default function ResizingExample() {
  const key = 'resize-example';

  const [withTableBorder, setWithTableBorder] = useState<boolean>(true);
  const [withColumnBorders, setWithColumnBorders] = useState<boolean>(true);

  const { effectiveColumns, resetColumnsWidth } = useDataTableColumns<Company>({
    key,
    columns: [
      { accessor: 'name', width: 100, resizable: true },
      { accessor: 'streetAddress', resizable: true },
      { accessor: 'city', ellipsis: true, resizable: true },
      { accessor: 'state', textAlign: 'right' },
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
          <Button onClick={resetColumnsWidth}>Reset Column Width</Button>
        </Group>
      </Group>
    </Stack>
  );
}
