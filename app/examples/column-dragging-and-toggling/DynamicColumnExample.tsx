'use client';

import type { DataTableColumn } from '__PACKAGE__';
import { DataTable, useDataTableColumns } from '__PACKAGE__';
import { Button, Group, Stack, Text } from '@mantine/core';
import { IconBuildingCommunity, IconBuildingSkyscraper, IconMap, IconRoadSign } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { companies } from '~/data';

export default function DynamicColumnExample() {
  const key = 'dynamic-column-example';

  const [columns, setColumns] = useState<DataTableColumn[]>([
    {
      accessor: 'name',
      title: (
        <Group gap={4} mt={-1}>
          <IconBuildingSkyscraper size={16} />
          <Text inherit mt={1}>
            Company
          </Text>
        </Group>
      ),
      width: '40%',
      toggleable: true,
      defaultToggle: false,
    },
    {
      accessor: 'streetAddress',
      title: (
        <Group gap={4} mt={-1}>
          <IconRoadSign size={16} />
          <Text inherit mt={1}>
            Street Address
          </Text>
        </Group>
      ),
      width: '60%',
      toggleable: true,
    },
    {
      accessor: 'city',
      title: (
        <Group gap={4} mt={-1}>
          <IconBuildingCommunity size={16} />
          <Text inherit mt={1}>
            City
          </Text>
        </Group>
      ),
      width: 160,
      toggleable: true,
    },
    {
      accessor: 'state',
      textAlign: 'right',
      title: (
        <Group justify="right">
          <IconMap size={16} />
        </Group>
      ),
    },
  ]);

  const initialColumns = useRef(columns);

  const { effectiveColumns, resetColumnsToggle, columnsToggle, setColumnsToggle } = useDataTableColumns({
    key,
    columns,
  });

  function resetAll() {
    setColumns(initialColumns.current);
    resetColumnsToggle();
  }

  // Show / hide the Mission Statement column. If it's currently hidden via the
  // header X (but still in `columns`), un-hide it; otherwise add or remove the
  // column definition itself.
  function toggleColumnMissionStatement() {
    const inColumns = columns.some((col) => col.accessor === 'missionStatement');
    const hiddenByToggle =
      inColumns && columnsToggle?.find((t) => t.accessor === 'missionStatement')?.toggled === false;

    if (hiddenByToggle) {
      setColumnsToggle(columnsToggle.map((t) => (t.accessor === 'missionStatement' ? { ...t, toggled: true } : t)));
      return;
    }

    const newColumns = columns.filter((col) => col.accessor !== 'missionStatement');
    if (columns.length === newColumns.length) {
      newColumns.push({
        accessor: 'missionStatement',
        title: (
          <Group gap={4} mt={-1} wrap="nowrap">
            <IconBuildingSkyscraper size={16} />
            <Text inherit mt={1}>
              Mission Statement
            </Text>
          </Group>
        ),
        width: '40%',
        toggleable: true,
        defaultToggle: true,
      });
    }
    setColumns(newColumns);
  }

  return (
    <Stack>
      <Group>
        <Button onClick={toggleColumnMissionStatement}>Toggle Mission Statement column</Button>
      </Group>
      <DataTable
        withTableBorder
        withColumnBorders
        storeColumnsKey={key}
        records={companies}
        columns={effectiveColumns}
      />
      <Group justify="right">
        <Button onClick={resetAll}>Reset toggled columns</Button>
      </Group>
    </Stack>
  );
}
