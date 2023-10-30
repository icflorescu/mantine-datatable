'use client';

import { DataTable } from '__PACKAGE__';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import employees from '~/data/employees.json';

const PAGE_SIZE = 15;

export default function PaginationExampleWithControlProps() {
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(employees.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(employees.slice(from, to));
  }, [page]);

  return (
    // example-start
    <DataTable
      // example-skip other props
      height={300}
      withTableBorder
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
      // example-resume
      getPaginationControlProps={(control) => {
        if (control === 'previous') {
          const title = 'Go to previous page';
          return { title, 'aria-label': title };
        } else if (control === 'next') {
          const title = 'Go to next page';
          return { title, 'aria-label': title };
        }
        return {};
      }}
    />
    // example-end
  );
}
