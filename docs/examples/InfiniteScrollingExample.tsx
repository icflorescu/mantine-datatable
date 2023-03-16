import { Text } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import employees from '~/data/employees.json';

export default function InfiniteScrollingExample() {
  const batchSize = 50;
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState(employees.slice(0, batchSize));

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

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [timeout]);

  return (
    <>
      <DataTable
        withBorder
        borderRadius="sm"
        height={300}
        columns={[{ accessor: 'firstName' }, { accessor: 'lastName' }, { accessor: 'email' }]}
        records={records}
        fetching={loading}
        onScrollToBottom={loadMoreRecords}
      />
      <Text mt="sm" align="center" size="sm">
        Showing {records.length} records of {employees.length}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {loading
          ? `loading ${batchSize} more...`
          : records.length < employees.length
          ? 'scroll to the bottom load more'
          : 'all records loaded'}
      </Text>
    </>
  );
}
