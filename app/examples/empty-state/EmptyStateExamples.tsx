'use client';

import { Box, Button, Image, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconMoodSad } from '@tabler/icons-react';
import { DataTable } from '__PACKAGE__';
import classes from './EmptyStateExamples.module.css';

export function EmptyStateExample() {
  // example-start default
  return (
    <DataTable
      minHeight={150}
      records={[]}
      // example-skip
      withTableBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'email' }]}
      // example-resume
    />
  );
  // example-end
}

export function EmptyStateExampleCustomText() {
  // example-start custom-text
  return (
    <DataTable
      minHeight={150}
      records={[]}
      noRecordsText="No records to show"
      // example-skip
      withTableBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'email' }]}
      // example-resume
    />
  );
  // example-end
}

export function EmptyStateExampleCustomIconAndText() {
  // example-start custom-icon-and-text
  return (
    <DataTable
      minHeight={150}
      records={[]}
      noRecordsIcon={
        <Box p={4} mb={4} className={classes.noRecordsBox}>
          <IconMoodSad size={36} strokeWidth={1.5} />
        </Box>
      }
      noRecordsText="No records found"
      // example-skip
      withTableBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'email' }]}
      // example-resume
    />
  );
  // example-end
}

export function EmptyStateExampleCustomContent() {
  // example-start custom-content
  return (
    <DataTable
      minHeight={280}
      records={[]}
      emptyState={
        <Stack align="center" gap="xs">
          <Text c="dimmed" size="sm">
            No data found...
          </Text>
          <Image
            width={200}
            radius="md"
            src="https://images.unsplash.com/photo-1577460551100-907ba84418ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
            alt="No data found"
            style={{ filter: 'grayscale(1)' }}
          />
        </Stack>
      }
      // example-skip
      withTableBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'email' }]}
      // example-resume
    />
  );
  // example-end
}

export function EmptyStateExampleCustomInteractiveContent() {
  // example-start custom-interactive-content
  return (
    <DataTable
      minHeight={280}
      records={[]}
      emptyState={
        <Stack align="center" gap="xs">
          <Text c="dimmed" size="sm">
            No data found...
          </Text>
          <Button
            style={{ pointerEvents: 'all' }} // 👈 enable button pointer events
            onClick={() => notifications.show({ message: 'Should add a new record' })}
          >
            Add a record
          </Button>
        </Stack>
      }
      // example-skip
      withTableBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'email' }]}
      // example-resume
    />
  );
  // example-end
}
