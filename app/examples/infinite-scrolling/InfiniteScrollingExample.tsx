'use client';

import { Button, Group, Paper, Text } from '@mantine/core';
import { DataTable } from '__PACKAGE__';
import { useEffect, useRef, useState } from 'react';
import { employees } from '~/data';

export function InfiniteScrollingExample() {
  const batchSize = 100;
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState(employees.slice(0, batchSize));
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  let timeout: ReturnType<typeof setTimeout> | undefined;

  const loadMoreRecords = () => {
    if (records.length < employees.length) {
      setLoading(true);
      timeout = setTimeout(() => {
        setRecords(employees.slice(0, records.length + batchSize));
        setLoading(false);
      }, 1000);
    }
  };

  const reset = () => {
    setRecords(employees.slice(0, batchSize));
    // Make sure to scroll to top after resetting records
    scrollViewportRef.current?.scrollTo(0, 0);
  };

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [timeout]);

  return (
    <>
      <DataTable
        withTableBorder
        borderRadius="sm"
        height={300}
        columns={[{ accessor: 'firstName' }, { accessor: 'lastName' }, { accessor: 'email' }]}
        records={records}
        fetching={loading}
        onScrollToBottom={loadMoreRecords}
        scrollViewportRef={scrollViewportRef}
      />
      <Paper p="md" mt="sm" withBorder>
        <Group justify="space-between">
          <Text size="sm">
            Showing {records.length} records of {employees.length}
            {records.length < employees.length && ', scroll to bottom to load more'}
          </Text>
          <Button variant="light" onClick={reset}>
            Reset records
          </Button>
        </Group>
      </Paper>
    </>
  );
}
