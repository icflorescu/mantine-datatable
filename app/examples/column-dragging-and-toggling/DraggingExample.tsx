'use client';

import { Button, Group, Stack } from '@mantine/core';
import { DataTable, useDataTableColumns } from '__PACKAGE__';
import { companies, type Company } from '~/data';

export default function DraggingExample() {
  const key = 'draggable-example';

  const { effectiveColumns, resetColumnsOrder } = useDataTableColumns<Company>({
    key,
    columns: [
      { accessor: 'name', width: '40%', draggable: true },
      { accessor: 'streetAddress', width: '60%', draggable: true },
      { accessor: 'city', width: 160, draggable: true },
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
        <Button onClick={resetColumnsOrder}>Reset Column Order</Button>
      </Group>
    </Stack>
  );
}
