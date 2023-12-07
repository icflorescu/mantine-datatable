'use client';

import { Button, Group, Stack } from '@mantine/core';
import { DataTable } from '__PACKAGE__';
import { companies } from '~/data';
import { useDragToggleColumns } from '~/package/hooks/useDragToggleColumns';

export default function TogglingExample() {
  const key = 'toggleable-example';

  const { effectiveColumns, resetColumnsToggle } = useDragToggleColumns({
    key,
    columns: [
      { accessor: 'name', width: '40%', toggleable: true },
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
