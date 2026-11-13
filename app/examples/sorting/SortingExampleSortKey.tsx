'use client';

import { DataTable, type DataTableSortStatus } from '__PACKAGE__';
import dayjs from 'dayjs';
import sortBy from 'lodash/sortBy';
import { useMemo, useState } from 'react';
import { type Employee, employees } from '~/data';

const initialRecords = employees.slice(0, 50);

export default function SortingExampleSortKey() {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Employee>>({
    columnAccessor: 'name',
    sortKey: 'lastName',
    direction: 'asc',
  });

  const records = useMemo(() => {
    // 👇 use the sort key if present, otherwise fall back to the column accessor
    const data = sortBy(initialRecords, sortStatus.sortKey ?? sortStatus.columnAccessor);
    return sortStatus.direction === 'desc' ? data.reverse() : data;
  }, [sortStatus]);

  return (
    <DataTable
      // example-skip other props
      height={300}
      withTableBorder
      withColumnBorders
      // example-resume
      records={records}
      columns={[
        {
          accessor: 'name',
          render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
          sortable: true,
          sortKey: 'lastName', // 👈 sort by last name
        },
        // 👇 dot-notation accessors work too
        { accessor: 'department.name', title: 'Department', sortable: true },
        {
          accessor: 'birthDate',
          textAlign: 'right',
          render: ({ birthDate }) => dayjs(birthDate).format('MMM D YYYY'),
          sortable: true,
        },
      ]}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
    />
  );
}
