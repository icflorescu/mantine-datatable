'use client';

import { Group, NumberInput, Text } from '@mantine/core';
import { DataTable } from '__PACKAGE__';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import employees from '~/data/employees.json';

const PAGE_SIZES = [10, 15, 20];

export default function PaginationCustomRenderExample() {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(employees.slice(0, pageSize));

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(employees.slice(from, to));
  }, [page, pageSize]);

  const max = Math.ceil(employees.length / pageSize);

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
      recordsPerPage={pageSize}
      page={page}
      onPageChange={(p) => setPage(p)}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      // example-resume
      // 👇 custom "Jump to page" control using renderPagination callback
      renderPagination={({ state, actions, Controls }) => (
        <>
          <Controls.Text />
          <Controls.PageSizeSelector />
          <Group gap="xs">
            <Text size={state.paginationSize}>Jump to page</Text>
            <NumberInput
              hideControls
              w={80}
              size={state.paginationSize}
              onChange={(p) => typeof p === 'number' && actions.setPage(p)}
              min={1}
              max={max}
              value={page}
            />
          </Group>
          <Controls.Pagination />
        </>
      )}
    />
    // example-end
  );
}
