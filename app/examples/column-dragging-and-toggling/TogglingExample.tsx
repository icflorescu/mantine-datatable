'use client';

import { Button, Group, Stack, Text } from '@mantine/core';
import { IconBuildingCommunity, IconBuildingSkyscraper, IconMap, IconRoadSign } from '@tabler/icons-react';
import { DataTable, useDataTableColumns } from '__PACKAGE__';
import { companies } from '~/data';

export default function TogglingExample() {
  const key = 'toggleable-example';

  const { effectiveColumns, resetColumnsToggle } = useDataTableColumns({
    key,
    columns: [
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
        <Button onClick={resetColumnsToggle}>Reset toggled columns</Button>
      </Group>
    </Stack>
  );
}
