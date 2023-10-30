'use client';

import { DataTable, type DataTableSortStatus } from '__PACKAGE__';
import sortBy from 'lodash/sortBy';
import { useEffect, useState } from 'react';
import { companies, type Company } from '~/data';

export default function SortingExample() {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Company>>({
    columnAccessor: 'name',
    direction: 'asc',
  });
  const [records, setRecords] = useState(sortBy(companies, 'name'));

  useEffect(() => {
    const data = sortBy(companies, sortStatus.columnAccessor) as Company[];
    setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [sortStatus]);

  return (
    <DataTable
      withTableBorder
      withColumnBorders
      records={records}
      columns={[
        { accessor: 'name', width: '40%', sortable: true },
        { accessor: 'streetAddress', width: '60%' },
        { accessor: 'city', width: 160, sortable: true },
        { accessor: 'state', textAlign: 'right', sortable: true },
      ]}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
    />
  );
}
