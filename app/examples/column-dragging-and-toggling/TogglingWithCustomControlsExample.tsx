'use client';

import { DataTable, humanize, useDataTableColumns } from '__PACKAGE__';
import { Button, Checkbox, Group, Stack } from '@mantine/core';
import { type Company, companies } from '~/data';

export default function TogglingWithCustomControlsExample() {
  const key = 'toggling-with-custom-controls-example';

  const { effectiveColumns, columnsToggle, setColumnsToggle, resetColumnsToggle } = useDataTableColumns<Company>({
    key,
    columns: [
      { accessor: 'name', width: '40%' },
      { accessor: 'streetAddress', width: '60%', toggleable: true },
      { accessor: 'city', width: 160, toggleable: true },
      { accessor: 'state', textAlign: 'right', toggleable: true, defaultToggle: false },
    ],
  });

  return (
    <Stack>
      <Group justify="space-between">
        <Group>
          {columnsToggle
            // 👇 only show controls for toggleable columns
            .filter(({ toggleable }) => toggleable)
            .map(({ accessor, toggled }) => (
              <Checkbox
                key={accessor}
                label={humanize(accessor)}
                checked={toggled}
                onChange={(e) => {
                  const { checked } = e.currentTarget;
                  setColumnsToggle(
                    columnsToggle.map((column) =>
                      column.accessor === accessor ? { ...column, toggled: checked } : column
                    )
                  );
                }}
              />
            ))}
        </Group>
        <Button size="compact-sm" variant="light" onClick={resetColumnsToggle}>
          Reset
        </Button>
      </Group>
      <DataTable
        withTableBorder
        withColumnBorders
        storeColumnsKey={key}
        records={companies}
        columns={effectiveColumns}
      />
    </Stack>
  );
}
