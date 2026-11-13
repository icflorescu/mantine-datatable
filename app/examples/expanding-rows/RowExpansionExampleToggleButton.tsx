'use client';

import { DataTable } from '__PACKAGE__';
import { ActionIcon, Box, Group, Stack } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';
import { useState } from 'react';
import { companies } from '~/data';
import classes from './RowExpansionExampleToggleButton.module.css';

const records = companies.slice(0, 5);

export function RowExpansionExampleToggleButton() {
  // example-start
  const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);

  return (
    <DataTable
      withTableBorder
      withColumnBorders
      columns={[
        {
          accessor: 'expand',
          title: '',
          width: '0%',
          render: ({ id }) => {
            const expanded = expandedRecordIds.includes(id);
            return (
              <ActionIcon
                size="sm"
                variant="subtle"
                aria-label={expanded ? 'Collapse row' : 'Expand row'}
                onClick={() => setExpandedRecordIds((ids) => (expanded ? ids.filter((i) => i !== id) : [...ids, id]))}
              >
                <IconChevronRight size={16} className={clsx(classes.chevron, { [classes.expanded]: expanded })} />
              </ActionIcon>
            );
          },
        },
        { accessor: 'name' },
        { accessor: 'city' },
        { accessor: 'state' },
      ]}
      records={records}
      rowExpansion={{
        trigger: 'never', // 👈 clicking on a row does nothing
        allowMultiple: true,
        expanded: {
          recordIds: expandedRecordIds,
          onRecordIdsChange: setExpandedRecordIds,
        },
        content: ({ record }) => (
          // example-skip expansion content
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
          // example-resume
        ),
      }}
    />
  );
  // example-end
}
