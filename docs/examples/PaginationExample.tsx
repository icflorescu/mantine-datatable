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
    <DataTable
      records={records}
      columns={[
        { accessor: 'firstName', width: 100 },
        { accessor: 'lastName', width: 100 },
        { accessor: 'email', width: '100%' },
        {
          accessor: 'birthDate',
          textAlign: 'right',
          width: 120,
          render: ({ birthDate }) => dayjs(birthDate).format('MMM D YYYY'),
        },
      ]}
      totalRecords={employees.length}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={(p) => setPage(p)}
    />
  );
}
