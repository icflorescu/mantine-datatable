'use client';

import { Button, Group, Stack } from '@mantine/core';
import { DataTable, useDataTableColumns } from '__PACKAGE__';
import { companies } from '~/data';

export default function TogglingExample() {
  const key = 'toggleable-example';

  const { effectiveColumns, resetColumnsToggle } = useDataTableColumns({
    key,
    columns: [
      { accessor: 'name', width: '40%', toggleable: true, defaultToggle: false },
      { accessor: 'streetAddress', width: '60%', toggleable: true },
      { accessor: 'city', width: 160, toggleable: true },
      { accessor: 'state', textAlign: 'right' },
    ],
  });

  return (
    <Stack>
      <DataTable
        withTableBorder
        withColumnBorders
        storeColumnsKey={key}
        records={companies}
        columns={effectiveColumns}
      />
      <Group justify="right">
        <Button onClick={resetColumnsToggle}>Reset Column Toggled</Button>
      </Group>
    </Stack>
  );
}
