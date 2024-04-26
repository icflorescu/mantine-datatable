'use client';

import { Box, Group, Stack } from '@mantine/core';
import { DataTable } from '__PACKAGE__';
import { companies } from '~/data';
import classes from './RowExpansionExampleExpandableRows.module.css';

const records = companies.slice(0, 5);

export function RowExpansionExampleExpandableRows() {
  // example-start
  return (
    <DataTable
      withTableBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={records}
      rowExpansion={{
        allowMultiple: true,
        expandable: ({ record: { state } }) => state === 'WY', // 👈 enable expansion only on rows where state is WY
        // example-skip
        content: ({ record }) => (
          <Stack className={classes.details} p="xs" gap={6}>
            <Group gap={6}>
              <div className={classes.label}>Postal address:</div>
              <div>
                {record.streetAddress}, {record.city}, {record.state}
              </div>
            </Group>
            <Group gap={6}>
              <div className={classes.label}>Mission statement:</div>
              <Box fs="italic">“{record.missionStatement}”</Box>
            </Group>
          </Stack>
        ),
        // example-resume
      }}
    />
  );
  // example-end
}
