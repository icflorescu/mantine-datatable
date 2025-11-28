'use client';

import { DataTable } from '__PACKAGE__';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import employees from '~/data/employees.json';

const PAGE_SIZES = [10, 15, 20];

export default function PaginationExampleWithPosition() {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(employees.slice(0, pageSize));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecords(employees.slice(from, to));
  }, [page, pageSize]);

  return (
    // example-start
    <DataTable
      // example-skip other props
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
      paginationActiveBackgroundColor="grape"
      recordsPerPage={pageSize}
      page={page}
      onPageChange={(p) => setPage(p)}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      // example-resume
      paginationPosition="bottomAndTop" // 'bottom', 'top', 'bottomAndTop'
    />
    // example-end
  );
}
