'use client';

import { Button, Group, Stack, Text } from '@mantine/core';
import { IconBuildingCommunity, IconBuildingSkyscraper, IconMap, IconRoadSign } from '@tabler/icons-react';
import { DataTable, DataTableColumn, useDataTableColumns } from '__PACKAGE__';
import { useState } from 'react';
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

  const { effectiveColumns, resetColumnsToggle } = useDataTableColumns({
    key,
    columns,
  });

  // add or remove the whole record with missionStatement accessor
  function toggleColumnMissionStatement() {
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
        <Button onClick={resetColumnsToggle}>Reset toggled columns</Button>
      </Group>
    </Stack>
  );
}
