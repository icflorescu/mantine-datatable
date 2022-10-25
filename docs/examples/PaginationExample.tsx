import { Box } from '@mantine/core';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import employees from '~/data/employees.json';

const PAGE_SIZE = 15;

export default function PaginationExample() {
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(employees.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(employees.slice(from, to));
  }, [page]);

  return (
    <Box sx={{ height: 300 }}>
      <DataTable
        withBorder
        records={records}
        columns={[
          { accessor: 'firstName', width: 100 },
          { accessor: 'lastName', width: 100 },
          { accessor: 'email', width: '100%' },
          {
            accessor: 'birthDate',
            textAlignment: 'right',
            width: 120,
            render: ({ birthDate }) => dayjs(birthDate).format('MMM D YYYY'),
          },
        ]}
        totalRecords={employees.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
        // uncomment the next line to use a custom loading text
        // loadingText="Loading..."
        // uncomment the next line to display a custom text when no records were found
        // noRecordsText="No records found"
        // uncomment the next line to use a custom pagination text
        // paginationText={({ from, to, totalRecords }) => `Records ${from} - ${to} of ${totalRecords}`}
        // uncomment the next line to use a custom pagination color (see https://mantine.dev/theming/colors/)
        // paginationColor="grape"
        // uncomment the next line to use a custom pagination size
        // paginationSize="md"
      />
    </Box>
  );
}
